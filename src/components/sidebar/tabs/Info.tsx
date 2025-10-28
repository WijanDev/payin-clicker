import { useGameStore } from "@/lib/gameStore"

export function Info() {
    const { payins, payinsPerClick, payinsPerSecond, happiness, upgrades, catastrophes, catastrophesResolved } = useGameStore()
    return (
        <div>
            <h2 className="text-lg font-bold mb-4 text-center border-b border-slate-600 pb-2">
                Game Stats
            </h2>
            <p className="text-sm text-gray-400 mb-3">
                Payins: {payins.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Payins per click: {payinsPerClick.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Payins per second: {payinsPerSecond.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Happiness: {happiness.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Upgrades: {upgrades.length.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Catastrophes: {catastrophes.length.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mb-3">
                Catastrophes resolved: {catastrophesResolved.toLocaleString()}
            </p>
        </div>
    )
}