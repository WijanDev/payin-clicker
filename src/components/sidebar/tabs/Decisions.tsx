import { useGameStore } from "@/lib/gameStore"
import { DecisionButton } from "@/components/sidebar/DecisionButton"

export function Decisions() {
    const { decisions } = useGameStore()
    return (
        <div>
            <h2 className="text-lg font-bold mb-4 text-center border-b border-slate-600 pb-2">
                Strategic Decisions
            </h2>
            {decisions.map((decision) => (
                <DecisionButton key={decision.id} decision={decision} />
            ))}
        </div>
    )
}