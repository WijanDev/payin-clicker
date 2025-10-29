import { Catastrophe } from "@/domain/models/catastrophe"
import { Upgrade } from "@/domain/models/upgrade"
import { Decision } from "@/domain/models/decision"

export interface GameState {
    autosaveCounter: number
    payins: number
    payinsPerClick: number
    payinsPerSecond: number
    happiness: number
    upgrades: Upgrade[]
    decisions: Decision[]
    catastrophes: Catastrophe[]
    catastrophesResolved: number
    isLoading: boolean
    loadingPhase: 'servers' | 'data' | 'ready'
    theme: 'light' | 'dark'
    totalClicks: number
    setTheme: (theme: 'light' | 'dark') => void
    addPayins: (amount: number) => void
    tick: () => void
    triggerCatastrophe: () => void
    resolveClick: () => void
    buyUpgrade: (id: string) => void
    buyDecision: (id: string) => void
    saveGame: () => void
    loadGame: () => Promise<void>
    updateUpgradePhases: () => void
    resetGame: () => void
}   