'use client'

import { useState } from 'react'
import { GameConfig, GameMode, Player } from '../lib/types'

interface Props {
  config: GameConfig
  onStart: (config: GameConfig) => void
}

export default function Setup({ config, onStart }: Props) {
  const [players, setPlayers] = useState<Player[]>(config.players)
  const [mode, setMode] = useState<GameMode>(config.mode)
  const [startScore, setStartScore] = useState(config.startScore)
  const [goalScore, setGoalScore] = useState(config.goalScore)

  const addPlayer = () => {
    const id = Date.now().toString()
    setPlayers([...players, { id, name: `Player ${players.length + 1}`, score: 0 }])
  }

  const removePlayer = (id: string) => {
    if (players.length <= 1) return
    setPlayers(players.filter((p) => p.id !== id))
  }

  const updateName = (id: string, name: string) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  const handleStart = () => {
    const initialScore = mode === 'count-down' ? startScore : 0
    onStart({
      phase: 'playing',
      mode,
      startScore,
      goalScore,
      players: players.map((p) => ({ ...p, score: initialScore })),
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Game Setup</h1>

        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Players</h2>
          {players.map((player) => (
            <div key={player.id} className="flex items-center gap-2">
              <input
                type="text"
                value={player.name}
                onChange={(e) => updateName(player.id, e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removePlayer(player.id)}
                disabled={players.length <= 1}
                className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addPlayer}
            className="w-full border-2 border-dashed border-gray-200 rounded-lg py-2 text-sm text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            + Add Player
          </button>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Scoring Mode</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['count-up', 'count-down'] as GameMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === m
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'count-up' ? 'Count Up' : 'Count Down'}
              </button>
            ))}
          </div>

          {mode === 'count-up' && (
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Goal score</label>
              <input
                type="number"
                value={goalScore || ''}
                onChange={(e) => setGoalScore(Number(e.target.value))}
                placeholder="No goal"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {mode === 'count-down' && (
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Starting score</label>
              <input
                type="number"
                value={startScore}
                onChange={(e) => setStartScore(Number(e.target.value))}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  )
}
