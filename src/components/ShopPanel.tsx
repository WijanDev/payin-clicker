import { useGameStore } from '@/lib/gameStore'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export function ShopPanel() {
    const { payins, upgrades, buyUpgrade } = useGameStore()
  
    return (
      <aside className="w-64 h-full overflow-y-auto border-l border-slate-700 bg-slate-800/90 p-4 text-white">
        <h2 className="text-lg font-bold mb-4 text-center">Shop</h2>
  
        {upgrades.map((u, index) => {
          if (u.phase === 1) return null
          if (u.phase === 2)
            return (
                <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <div
                            key={u.id}
                            className="mb-3 p-3 rounded border border-slate-700 bg-slate-900/60 text-gray-500 italic text-center"
                        >
                            ??? (Unknown Upgrade)
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        ??? (Unknown Upgrade)
                    </TooltipContent>
                </Tooltip>
            )
          if (u.phase === 3)
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
              <div
                key={u.id}
                className="mb-3 p-3 rounded border border-slate-600 bg-slate-900/70 opacity-70 transition-all duration-500 animate-fadeIn"
              >
                <div className="font-semibold text-gray-300">
                  {u.name} ({u.owned})
                </div>
                <div className="text-xs text-gray-500 mb-2">{u.desc}</div>
                <div className="text-xs text-yellow-400 text-center">
                  Locked — Requires ℞ {u.cost.toLocaleString()}
                </div>
              </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                {u.desc}
              </TooltipContent>
            </Tooltip>
            )
  
          if (u.phase === 4) {
            const canAfford = payins >= u.cost
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
              <div
                key={u.id}
                className={`mb-3 p-3 rounded border transition-all duration-500 animate-fadeIn ${
                  canAfford
                    ? 'border-cyan-400 bg-slate-900/60 hover:bg-slate-800'
                    : 'border-slate-700 bg-slate-900/40 opacity-70'
                }`}
              >
                <div className="font-semibold text-white">
                  {u.name} ({u.owned})
                </div>
                <button
                  onClick={() => buyUpgrade(u.id)}
                  disabled={!canAfford}
                  className={`w-full py-1 rounded text-xs font-bold transition-colors ${
                    canAfford
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Buy (℞ {u.cost.toLocaleString()})
                </button>
              </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                {u.desc}
              </TooltipContent>
            </Tooltip>
            )
          }
  
          return null
        })}
      </aside>
    )
  }