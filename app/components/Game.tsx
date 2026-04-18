'use client'

import { GameConfig } from '../lib/types'
import PlayerCard from './PlayerCard'

interface Props {
  config: GameConfig
  onChange: (config: GameConfig) => void
}

export default function Game({ config, onChange }: Props) {
  const updateScore = (id: string, score: number) => {
    onChange({
      ...config,
      players: config.players.map((p) => (p.id === id ? { ...p, score } : p)),
    })
  }

  const newGame = () => {
    onChange({ ...config, phase: 'setup' })
  }

  const modeLabel =
    config.mode === 'count-up'
      ? config.goalScore
        ? `Goal: ${config.goalScore}`
        : 'Count Up'
      : `From ${config.startScore} down`

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Game Scoring</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{modeLabel}</span>
          <button
            onClick={newGame}
            className="text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            New Game
          </button>
        </div>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {config.players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              mode={config.mode}
              goalScore={config.goalScore}
              onScoreChange={(score) => updateScore(player.id, score)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
