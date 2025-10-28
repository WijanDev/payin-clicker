import { useEffect, useState } from 'react'

export function SaveIndicator() {
  const [visible, setVisible] = useState(false)

  // función global para activar el indicador
  useEffect(() => {
    const handleSave = () => {
      setVisible(true)
      setTimeout(() => setVisible(false), 1500)
    }

    window.addEventListener('game-saved', handleSave)
    return () => window.removeEventListener('game-saved', handleSave)
  }, [])

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 text-xs font-bold transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="w-5 h-5 flex items-center justify-center bg-cyan-500 text-black rounded-full shadow-lg animate-pulse">
        💾
      </div>
      <span className="text-cyan-400">Progress saved</span>
    </div>
  )
}