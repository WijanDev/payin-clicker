import { formatNumber } from "@/lib/formatNumber"
import { useGameStore } from "@/lib/gameStore"
import payinIcon from '@/static/img/trace.svg'

export function Coin() {
    const { addPayins, payinsPerClick, payinsPerSecond, payins } = useGameStore()
    return (
        <>
            <h1 className="text-4xl font-bold mb-6 mt-4">Payin Clicker</h1>

            <div className="text-center mb-2 text-2xl">℞ {formatNumber(payins)}</div>

            <div className="text-sm text-cyan-400">
            Production: {formatNumber(payinsPerSecond)} ℞/s
            </div>

            <div className="text-sm text-amber-400 mb-6">
            Click: {formatNumber(payinsPerClick)} ℞/click
            </div>
            {/* Gold border simulation for coin */}
            <style>
            {`
                .euro2-border {
                    position: relative;
                    display: inline-block;
                }
                .euro2-border-inner {
                    position: relative;
                    z-index: 1;
                }
                .euro2-border-ring {
                    pointer-events: none;
                    position: absolute;
                    top: -6px; left: -6px; right: -6px; bottom: -6px;
                    border-radius: 50%;
                    box-shadow:
                        0 0 0 6px #d4af37, /* Main gold border */
                        0 0 0 9px #a88f5588; /* Subtle outer metallic shade */
                    border: 2px solid #c3b15b;
                    /* Subtle textured effect */
                }
                @media (max-width: 500px) {
                    .euro2-border-ring {
                        top: -3px; left: -3px; right: -3px; bottom: -3px;
                        box-shadow: 0 0 0 3px #d4af37, 0 0 0 6px #a88f5588;
                    }
                }
            `}
            </style>
            <div className="euro2-border relative w-40 h-40 mx-auto mb-6">
                <span className="euro2-border-ring" />
                <span className="euro2-border-inner block w-full h-full">
                    {/* Move the actual coin button inside this span to get gold border */}
                    <button
                        onClick={() => {
                            addPayins(payinsPerClick)
                            useGameStore.getState().resolveClick()
                        }}
                        className="relative w-40 h-40 rounded-full bg-linear-to-br from-gray-200 via-gray-300 to-gray-400 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 text-black text-3xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-4 border-gray-400 hover:border-gray-500 flex items-center justify-center overflow-hidden"
                        style={{
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.5), inset 0 -2px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        {/* Metallic shine overlay */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/40 via-transparent to-black/20 pointer-events-none"></div>
                        
                        {/* Icon centered */}
                        <div className="relative z-10 flex items-center justify-center w-24 h-24">
                            <img src={payinIcon} alt="Payin" className="w-full h-full object-contain drop-shadow-lg" />
                        </div>
                        
                        {/* Bottom edge shadow for depth */}
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-br from-black/30 to-transparent rounded-full pointer-events-none"></div>
                    </button>
                </span>
            </div>
            
        </>
    )
}