import { useGameStore } from '@/lib/gameStore'

export function CatastropheEvents() {
  const { catastrophes } = useGameStore()

  if (catastrophes.length === 0) return null

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 w-80">
      {catastrophes.map((c) => {
        const progress = (c.clicksDone / c.clicksNeeded) * 100
        return (
          <div
            key={c.id}
            className="mb-3 p-3 rounded bg-red-900/80 border border-red-500 text-white text-xs shadow-lg"
          >
            <div className="font-bold mb-1">
              ⚠️ {c.type} — {c.magnitude.toFixed(0)} % impact
            </div>
            <div className="relative w-full h-2 bg-red-700 rounded">
              <div
                className="absolute top-0 left-0 h-2 bg-white rounded transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center mt-1">
              Resolve: {c.clicksDone}/{c.clicksNeeded}
            </div>
          </div>
        )
      })}
    </div>
  )
}