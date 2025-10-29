import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useGameStore } from '@/lib/gameStore'
import { ShopPanel } from '@/components/ShopPanel'
import { CatastropheBar } from '@/components/CatastropheBar'
import { CatastropheEvents } from '@/components/CatastropheEvents'
import { SaveIndicator } from '@/components/SaveIndicator'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { MerchantHappiness } from '@/components/MerchantHappiness'
import { Coin } from '@/components/Coin'
import payinIcon from '@/static/img/trace.svg'
import { useTitle } from '@/hooks/use-title'
import { formatNumber } from '@/lib/formatNumber'
import { useFeatureFlagStore } from '@/lib/featureFlagStore'

export const Route = createFileRoute('/')({
  component: Game,
  head: () => ({
    links: [
      {
        rel: 'icon',
        href: payinIcon,
      },
    ],  
  }),
})

function Game() {
  const {
    tick,
    loadGame,
    isLoading,
    payins,
  } = useGameStore()

  const { merchantHappiness, catastrophes } = useFeatureFlagStore.getState()

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

  useTitle(`${formatNumber(payins)} - Payin Clicker`)

  if (isLoading) return <LoadingScreen />

  

  return (
    <div className="flex w-full h-screen overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto">
        {catastrophes && (
          <CatastropheBar />
        )}
        {catastrophes && (
          <CatastropheEvents />
        )}
        <div className="w-full"	>
          <SidebarTrigger className="text-cyan-400 text-2xl hover:text-cyan-300 transition-colors" />
        </div>

        
        <Coin />
        
        
        <SaveIndicator />

        {/* Moved MerchantHappiness to bottom of column */}
        {merchantHappiness && (
          <div className="flex-1 flex flex-col justify-end w-full mb-4">
            <MerchantHappiness />
          </div>
        )}
      </div>

      {/* Panel lateral */}
      <ShopPanel />
    </div>
  )
}
