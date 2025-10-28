// src/components/LoadingScreen.tsx
import { useGameStore } from '@/lib/gameStore'

export function LoadingScreen() {
  const { isLoading, loadingPhase } = useGameStore()

  if (!isLoading) return null

  const message =
    loadingPhase === 'servers'
      ? 'Loading PayRetailers servers...'
      : 'Initializing data...'

  return (
    <div className="fixed inset-0 bg-slate-950 text-cyan-400 flex flex-col items-center justify-center font-mono z-50">
      <div className="text-6xl animate-flip">℞</div>
      <p className="mt-4 text-lg">{message}</p>

      <style>
        {`
          @keyframes flip {
            0% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg); }
            100% { transform: rotateY(360deg); }
          }

          @keyframes glow {
            0%, 100% { text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
            50% { text-shadow: 0 0 15px #00ffff, 0 0 30px #00ffff; }
        }
          .animate-flip {
            display: inline-block;
            animation: flip 2s linear infinite;
            transform-style: preserve-3d;
          }

          
        `}
      </style>
    </div>
  )
}