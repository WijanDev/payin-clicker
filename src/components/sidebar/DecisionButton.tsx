import { Button } from "@/components/ui/button"
import { Decision } from "@/domain/models/decision"
import { useGameStore } from "@/lib/gameStore"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

export function DecisionButton({ decision }: { decision: Decision }) {
  const disabled = decision.cooldownLeft > 0

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Button
                variant="outline"
                className="w-full flex justify-between items-center mb-2"
                disabled={disabled}
                onClick={() => useGameStore.getState().buyDecision(decision.id)}
            >
                <span>
                    {decision.icon} {decision.name}
                </span>
                {disabled && (
                    <span className="text-xs text-gray-500">
                        {decision.cooldownLeft}s
                    </span>
                )}
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            {decision.desc}<br />
            Cost: ℞{decision.cost.toLocaleString()}<br />
            Cooldown: {decision.cooldown}s
        </TooltipContent>
    </Tooltip>
  )
}