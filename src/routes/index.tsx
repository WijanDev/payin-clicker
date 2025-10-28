import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useGameStore } from '@/lib/gameStore'
import { ShopPanel } from '@/components/ShopPanel'
import { CatastropheBar } from '@/components/CatastropheBar'
import { CatastropheEvents } from '@/components/CatastropheEvents'
import { SaveIndicator } from '@/components/SaveIndicator'
import { LoadingScreen } from '@/components/LoadingScreen'
import { formatNumber } from '@/lib/formatNumber'
import { SidebarTrigger } from '@/components/ui/sidebar'
import payinIcon from '@/static/img/trace.svg'

export const Route = createFileRoute('/')({
  component: Game,
})

function Game() {
  const {
    payins,
    payinsPerClick,
    payinsPerSecond,
    happiness,
    addPayins,
    tick,
    loadGame,
    isLoading,
  } = useGameStore()

  useEffect(() => {
    loadGame()
  }, [loadGame])

  useEffect(() => {
    const saveInterval = setInterval(() => {
      useGameStore.getState().saveGame()
    }, 120000)
    return () => clearInterval(saveInterval)
  }, [])

  useEffect(() => {
    const handleBeforeUnload = () => {
      useGameStore.getState().saveGame()
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000)
    return () => clearInterval(interval)
  }, [tick])

  if (isLoading) return <LoadingScreen />

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-start overflow-y-auto">
        <CatastropheBar />
        <CatastropheEvents />
        <div className="w-full"	>
          <SidebarTrigger className="text-cyan-400 text-2xl hover:text-cyan-300 transition-colors" />
        </div>

        <h1 className="text-4xl font-bold mb-6 mt-4">Payin Clicker</h1>

        <div className="text-center mb-2 text-2xl">℞ {formatNumber(payins)}</div>

        <div className="text-sm text-cyan-400">
          Production: {formatNumber(payinsPerSecond)} ℞/s
        </div>

        <div className="text-sm text-amber-400 mb-6">
          Click: {formatNumber(payinsPerClick)} ℞/click
        </div>

        <button
          onClick={() => {
            addPayins(payinsPerClick)
            useGameStore.getState().resolveClick()
          }}
          className="w-40 h-40 rounded-full bg-slate-400 text-black text-3xl font-bold shadow-lg hover:scale-105 transition-transform"
        >
          <img src={payinIcon} alt="Payin" className="w-full h-full object-contain" />
        </button>

        <div className="mt-6 w-64 text-center mb-10">
          <div className="text-xs mb-1 text-gray-300">Merchant Happiness</div>
          <div className="relative w-full h-3 bg-gray-700 rounded">
            <div
              className="absolute top-0 left-0 h-3 bg-green-500 rounded transition-all"
              style={{ width: `${happiness}%` }}
            ></div>
            <span className="absolute inset-0 text-[10px] flex items-center justify-center text-black font-bold">
              {formatNumber(happiness)}%
            </span>
          </div>
        </div>

        <SaveIndicator />
      </main>

      {/* Panel lateral */}
      <ShopPanel />
    </div>
  )
}