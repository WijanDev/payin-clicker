import { useGameStore } from "@/lib/gameStore"
import { formatNumber } from "@/lib/formatNumber"

export function Info() {
    const { payins, payinsPerClick, payinsPerSecond, happiness, upgrades, catastrophes, catastrophesResolved, totalClicks } = useGameStore()
    return (
        <div>
            <h2 className="text-lg font-bold mb-4 text-center border-b border-slate-600 pb-2">
                Game Stats
            </h2>
            <p className="text-sm text-gray-400 mb-3">
                Payins: { formatNumber(payins) }
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Payins per click: { formatNumber(payinsPerClick) }
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Payins per second: { formatNumber(payinsPerSecond) }
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Happiness: { formatNumber(happiness) }
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Upgrades: {upgrades.reduce((acc, u) => acc + (u.owned ?? 0), 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Catastrophes: {catastrophes.length.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Catastrophes resolved: {catastrophesResolved.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Total clicks: {totalClicks.toLocaleString()}
            </p>
        </div>
    )
}