import { useEffect, useState } from 'react'
import { useGameStore } from '../lib/gameStore'

export function CatastropheBar() {
  const { happiness } = useGameStore()
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(5) // %/min
  const [color, setColor] = useState('rgb(67,160,71)') // verde inicial

  // Calcular velocidad según felicidad
  useEffect(() => {
    const baseSpeed = 5 + (100 - happiness) * 0.15
    setSpeed(baseSpeed)
  }, [happiness])

  // Actualizar color según velocidad
  useEffect(() => {
    const minSpeed = 5
    const maxSpeed = 25
    const ratio = Math.min(Math.max((speed - minSpeed) / (maxSpeed - minSpeed), 0), 1)
    const r = Math.round(255 * ratio)
    const g = Math.round(255 * (1 - ratio))
    setColor(`rgb(${r},${g},0)`)
  }, [speed])

  // Progreso de la barra
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + speed / 60 // %/s
        if (next >= 100) {
            useGameStore.getState().triggerCatastrophe()
            useGameStore.getState().saveGame()
          return 0
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [speed])

  return (
    <div className="top-0 left-0 w-full h-6 bg-slate-800 border-b border-slate-700 z-50">
      <div
        className="h-full transition-all duration-500"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      ></div>
      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold">
        Catastrophe Approaching... ({speed.toFixed(1)} %/min)
      </span>
    </div>
  )
}