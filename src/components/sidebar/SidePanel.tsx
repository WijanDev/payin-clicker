
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from './tabs/Info'
import { Decisions } from './tabs/Decisions'
import { Leaderboard } from './tabs/Leaderboard'
import { Settings } from './tabs/Settings'

export function SidePanel() { 

  return (
    <Tabs defaultValue="info" className="w-full px-2">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="info">ℹ️</TabsTrigger>
        <TabsTrigger value="decisions">💡</TabsTrigger>
        <TabsTrigger value="leaderboard">🏆</TabsTrigger>
        <TabsTrigger value="settings">⚙️</TabsTrigger>
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