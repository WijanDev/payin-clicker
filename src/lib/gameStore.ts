import { create } from 'zustand'
import upgrades from '@/data/upgrades.json'
import decisions from '@/data/decisions.json'
import { Upgrade } from '@/domain/models/upgrade'
import { Decision } from '@/domain/models/decision'
import { GameState } from '@/domain/models/game-state'

const defaultUpgrades: Upgrade[] = upgrades.map((u) => ({
  id: u.id,
  name: u.name,
  desc: u.desc,
  baseCost: u.baseCost,
  cost: u.cost,
  clickBonus: u.clickBonus,
  clickBonusMult: u.clickBonusMult,
  auto: u.auto,
  owned: u.owned,
  unlockAt: u.unlockAt,
  phase: u.phase,
  autoBonus: u.autoBonus,
})) as Upgrade[]

const defaultDecisions: Decision[] = decisions.map((d) => ({
  id: d.id,
  name: d.name,
  desc: d.desc,
  cooldown: d.cooldown,
  cooldownLeft: d.cooldownLeft,
  cost: d.cost,
  benefit: d.benefit,
  icon: d.icon,
})) as Decision[]

export const useGameStore = create<GameState>((set, get) => {
  const recalcStats = (upgrades: Upgrade[]) => {
    let clickPower = 1
    let autoPower = 0
    let happiness = get().happiness

    upgrades.forEach((u) => {
      if (u.owned > 0) {
        // 💥 Clicks lineales
        if (u.clickBonus) clickPower += u.clickBonus * u.owned

        // ⚙️ Producción automática lineal + bonus global
        if (u.auto) {
          const autoBonus = u.owned > 1 ? Math.pow(u.owned - 1, 1 + u.autoBonus) : 0
          autoPower += (u.auto * u.owned) + autoBonus
          console.log('autoPower:', autoPower)
          console.log('autoBonus:', autoBonus)
          console.log('u.autoBonus:', u.autoBonus)
          console.log('u.owned:', u.owned)
        }

        // 🔁 Multiplicadores específicos
        if (u.clickBonusMult) clickPower *= u.clickBonusMult ** u.owned

        // ❤️ Efectos especiales
        if (u.id === 'merchants') happiness -= u.owned * 2
        if (u.id === 'shieldUp') happiness += u.owned * 1
        if (u.id === 'aks') {
          clickPower *= 1 + 0.02 * u.owned
          autoPower *= 1 + 0.02 * u.owned
        }
        if (u.id === 'corporateBuyout') {
          clickPower *= 1 + 0.05 * u.owned
          autoPower *= 1 + 0.05 * u.owned
        }
      }
    })

    happiness = Math.min(100, Math.max(0, happiness))
    return { clickPower, autoPower, happiness }
  }

  const updateUpgradePhases = () => {
    const { payins, upgrades } = get()

    const updated = upgrades.map((u) => {
      let newPhase = u.phase

      // Fase 1 → 2 (incógnita)
      if (payins >= u.unlockAt / 3 && newPhase < 2) newPhase = 2

      // Fase 2 → 3 (visible pero bloqueado)
      if (payins >= u.unlockAt / 2 && newPhase < 3) newPhase = 3

      // Fase 3 → 4 (accesible)
      if (payins >= u.cost) newPhase = 4

      // Si el jugador baja de dinero, no retroceder más allá de 3
      else if (newPhase === 4 && payins < u.cost) newPhase = 3

      return { ...u, phase: newPhase }
    })

    set({ upgrades: updated })
  }

  return {
    autosaveCounter: 0,
    payins: 0,
    payinsPerClick: 1,
    payinsPerSecond: 0,
    happiness: 100,
    upgrades: defaultUpgrades,
    catastrophes: [],
    decisions: defaultDecisions,
    isLoading: true,
    loadingPhase: 'servers',
    catastrophesResolved: 0,
    theme: (safeLocalStorage()?.getItem('theme') as 'light' | 'dark') || 'light',
    totalClicks: 0,
    setTheme: (theme) => set({ theme }),
    resetGame: () => {
      // Limpia el almacenamiento
      safeLocalStorage()?.removeItem('payinClickerSave')

      console.log('defaultUpgrades:', defaultUpgrades)
      debugger

      // Reinicia upgrades con owned = 0 y auto = 0
      const resetUpgrades = defaultUpgrades.map((u) => ({
        ...u,
        owned: 0,
        cost: u.baseCost,
        clickBonus: u.clickBonus ?? 0,
        phase: 1,
      }))

      // Reinicia decisiones
      const resetDecisions = defaultDecisions.map((d) => ({
        ...d,
        cooldownLeft: 0,
      }))

      // Recalcula estadísticas con upgrades vacíos
      const { clickPower, autoPower, happiness } = recalcStats(resetUpgrades)

      set({
        payins: 0,
        payinsPerClick: clickPower, // normalmente 1
        payinsPerSecond: autoPower, // normalmente 0
        happiness,
        upgrades: resetUpgrades,
        decisions: resetDecisions,
        catastrophes: [],
        catastrophesResolved: 0,
      })
      window.location.reload()
    },
    addPayins: (amount) => {
      set({ payins: get().payins + amount })
      get().updateUpgradePhases()
    },
    toggleTheme: () => {
      const newTheme = get().theme === 'light' ? 'dark' : 'light'
      set({ theme: newTheme })
      safeLocalStorage()?.setItem('theme', newTheme)
    },
    tick: () => {
      const { payins, payinsPerSecond, happiness } = get()
      const newPayins = payins + payinsPerSecond * (happiness / 100)
      set({ payins: newPayins })
      get().updateUpgradePhases()

      // autosave cada 60 ticks (~1 min)
      const autosaveCounter = (get() as any).autosaveCounter ?? 0
      if (autosaveCounter >= 60) {
        get().saveGame()
        set({ autosaveCounter: 0 })
      } else {
        set({ autosaveCounter: autosaveCounter + 1 })
      }
      const { decisions } = get()
      const updated = decisions.map((d) => {
        if (d.cooldownLeft > 0) {
          return { ...d, cooldownLeft: d.cooldownLeft - 1 }
        }
        return d
      })
      set({ decisions: updated })
    },

    triggerCatastrophe: () => {
      const magnitude = Math.random() * 20 + 10
      const clicksNeeded = Math.floor(Math.random() * 50 + 30)
      const newCatastrophe = {
        id: Date.now(),
        type: 'Server Overload',
        magnitude,
        clicksNeeded,
        clicksDone: 0,
      }
      set({
        catastrophes: [...get().catastrophes, newCatastrophe],
      })
    },

    resolveClick: () => {
      const { catastrophes, totalClicks } = get()
      const updated = catastrophes.map((c) =>
        c.clicksDone < c.clicksNeeded
          ? { ...c, clicksDone: c.clicksDone + 1 }
          : c
      )

      const remaining = updated.filter((c) => c.clicksDone < c.clicksNeeded)
      const resolved = updated.filter((c) => c.clicksDone >= c.clicksNeeded)

      if (resolved.length > 0) {
        const newHappiness = Math.max(0, get().happiness - 5)
        set({
          happiness: newHappiness,
          catastrophes: remaining,
          catastrophesResolved: get().catastrophesResolved + resolved.length,
        })
        get().saveGame()
      } else {
        set({ catastrophes: remaining })
      }
      set({ totalClicks: totalClicks + 1 })
    },

    buyUpgrade: (id) => {
      const { payins, upgrades } = get()
      const upgrade = upgrades.find((u) => u.id === id)
      if (!upgrade || payins < upgrade.cost) return

      const newOwned = upgrade.owned + 1

      // 💰 Coste exponencial suave (Cookie Clicker style)
      const costGrowthRate = 1.15
      const newCost = Math.floor(upgrade.baseCost * costGrowthRate ** newOwned)

      const newUpgrades = upgrades.map((u) =>
        u.id === id
          ? {
            ...u,
            owned: newOwned,
            cost: newCost
          }
          : u
      )

      const { clickPower, autoPower, happiness } = recalcStats(newUpgrades)

      set({
        payins: payins - upgrade.cost,
        upgrades: newUpgrades,
        payinsPerClick: clickPower,
        payinsPerSecond: autoPower,
        happiness,
      })

      get().updateUpgradePhases()
      get().saveGame()
    },

    buyDecision: (id) => {
      const { payins, decisions } = get()
      const decision = decisions.find((d) => d.id === id)
      if (!decision || payins < decision.cost || decision.cooldownLeft > 0) return

      // Aplica el beneficio (si lo tienes definido)
      set({ payins: payins - decision.cost })

      const newDecisions = decisions.map((d) =>
        d.id === id ? { ...d, cooldownLeft: d.cooldown } : d
      )

      set({ decisions: newDecisions })
      get().saveGame()
    },

    saveGame: () => {
      const data = {
        payins: get().payins,
        payinsPerClick: get().payinsPerClick,
        payinsPerSecond: get().payinsPerSecond,
        happiness: get().happiness,
        upgrades: get().upgrades,
        catastrophes: get().catastrophes,
        catastrophesResolved: get().catastrophesResolved,
      }
      safeLocalStorage()?.setItem('payinClickerSave', JSON.stringify(data))
      window.dispatchEvent(new Event('game-saved'))
    },

    loadGame: async () => {
      set({ isLoading: true, loadingPhase: 'servers' })
      await new Promise((r) => setTimeout(r, 1200))
      set({ loadingPhase: 'data' })
      await new Promise((r) => setTimeout(r, 1000))

      const saved = safeLocalStorage()?.getItem('payinClickerSave')
      let upgrades = defaultUpgrades

      if (saved) {
        const data = JSON.parse(saved)
        upgrades = (data.upgrades ?? defaultUpgrades).map((u: any) => {
          const base = defaultUpgrades.find((d) => d.id === u.id)
          return {
            ...base,
            ...u,
            baseCost: Number(u.baseCost ?? base?.baseCost ?? 0),
            cost: Number(u.cost ?? base?.cost ?? 0),
            owned: Number(u.owned ?? 0),
            unlockAt: Number(u.unlockAt ?? base?.unlockAt ?? 0),
            phase: Number(u.phase ?? base?.phase ?? 1),
          }
        })

        set({
          catastrophes: data.catastrophes ?? [],
          catastrophesResolved: data.catastrophesResolved ?? 0,
        })
      }

      const { clickPower, autoPower, happiness } = recalcStats(upgrades)
      set({
        payins: saved ? JSON.parse(saved).payins ?? 0 : 0,
        payinsPerClick: clickPower,
        payinsPerSecond: autoPower,
        happiness,
        upgrades,
      })

      get().updateUpgradePhases()
      set({ isLoading: false, loadingPhase: 'ready' })

    },

    updateUpgradePhases,
  }
})

function safeLocalStorage() {
  if (typeof window === 'undefined') return null
  return window.localStorage
}