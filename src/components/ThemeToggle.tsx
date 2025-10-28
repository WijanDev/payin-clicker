import { useGameStore } from '@/lib/gameStore'
import { Switch } from '@/components/ui/switch'

export function ThemeToggle() {
  const { theme, setTheme } = useGameStore()

  return (
    <label className="flex items-center gap-2 text-sm">
        Dark mode
        <Switch
            checked={theme === 'dark'}
            onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <span className="text-gray-400">Light mode</span>    <br />
        
    </label>
  )
}