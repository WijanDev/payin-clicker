
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from './tabs/Info'
import { Decisions } from './tabs/Decisions'
import { Leaderboard } from './tabs/Leaderboard'
import { Settings } from './tabs/Settings'

export function SidePanel() { 

  return (
    <Tabs defaultValue="info" className="w-full px-2">
      <TabsList className="grid w-full grid-cols-4 hover:cursor-pointer">
        <TabsTrigger value="decisions" className="hover:cursor-pointer">💡</TabsTrigger>
        <TabsTrigger value="leaderboard" className="hover:cursor-pointer">🏆</TabsTrigger>
        <TabsTrigger value="info" className="hover:cursor-pointer">ℹ️</TabsTrigger>
        <TabsTrigger value="settings" className="hover:cursor-pointer">⚙️</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <Info />
      </TabsContent>
      <TabsContent value="decisions">
        <Decisions />
      </TabsContent>
      <TabsContent value="leaderboard">
        <Leaderboard />
      </TabsContent>
      <TabsContent value="settings">
        <Settings />
      </TabsContent>
    </Tabs>
  )
}