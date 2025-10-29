import { useGameStore } from '@/lib/gameStore'

export function MerchantHappiness() {
    const { happiness } = useGameStore()
    return (

        <div className="w-full text-center flex flex-col items-center justify-center">
            <div className="text-xs mb-1 text-gray-300">Merchant Happiness</div>
            <div className="relative w-1/2 h-3 bg-gray-700 rounded items-center justify-center">
                <div className="h-4 bg-green-500 rounded transition-all flex items-center justify-center text-center mx-auto" style={{ width: `${happiness}%` }}>
                    <span className="text-xs text-white font-bold">{happiness}%</span>
                </div>
            </div>
        </div>
    )
}