import { useState, useEffect } from 'react'
import { GameConfig, defaultConfig } from './lib/types'
import Setup from './components/Setup'
import Game from './components/Game'

const STORAGE_KEY = 'game-scoring-state'

export default function App() {
  const [config, setConfig] = useState<GameConfig>(defaultConfig)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setConfig({ finishOrder: [], ...parsed })
      } catch {}
    }
    setLoaded(true)
  }, [])

  const updateConfig = (next: GameConfig) => {
    setConfig(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  if (!loaded) return null

  if (config.phase === 'setup') {
    return <Setup config={config} onStart={updateConfig} />
  }

  return <Game config={config} onChange={updateConfig} />
}
