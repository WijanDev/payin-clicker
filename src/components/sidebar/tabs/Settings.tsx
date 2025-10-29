import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useGameStore } from "@/lib/gameStore";

export function Settings() {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4 text-center border-b border-slate-600 pb-2">
                Settings
            </h2>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="hover:cursor-pointer">
                        Reset Game
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Reset Game</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to reset the game? This will clear all your progress and start a new game.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            useGameStore.getState().resetGame()
                        }}>Reset</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}