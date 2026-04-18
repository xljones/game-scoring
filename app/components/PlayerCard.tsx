'use client'

import { useState } from 'react'
import { GameMode, Player } from '../lib/types'

interface Props {
  player: Player
  mode: GameMode
  goalScore: number
  onScoreChange: (score: number) => void
}

const QUICK_VALUES = [1, 5, 10]

export default function PlayerCard({ player, mode, goalScore, onScoreChange }: Props) {
  const [customAmount, setCustomAmount] = useState('1')

  const adjust = (delta: number) => onScoreChange(player.score + delta)

  const applyCustom = (sign: 1 | -1) => {
    const amount = parseInt(customAmount) || 0
    onScoreChange(player.score + sign * amount)
  }

  const isAtGoal = mode === 'count-up' && goalScore > 0 && player.score >= goalScore
  const isAtZero = mode === 'count-down' && player.score <= 0
  const isComplete = isAtGoal || isAtZero

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border-2 p-5 space-y-4 transition-colors ${
        isComplete ? 'border-green-400' : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-gray-800 truncate">{player.name}</h2>
        {isComplete && (
          <span className="shrink-0 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {isAtGoal ? 'Goal!' : 'Done!'}
          </span>
        )}
      </div>

      <div className="text-center py-2">
        <span className="text-6xl font-bold tabular-nums text-gray-900">{player.score}</span>
      </div>

      <div className="grid grid-cols-6 gap-1">
        {[...QUICK_VALUES].reverse().map((v) => (
          <button
            key={`-${v}`}
            onClick={() => adjust(-v)}
            className="col-span-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors"
          >
            -{v}
          </button>
        ))}
        {QUICK_VALUES.map((v) => (
          <button
            key={`+${v}`}
            onClick={() => adjust(v)}
            className="col-span-1 py-2 bg-green-50 hover:bg-green-100 text-green-600 text-sm font-medium rounded-lg transition-colors"
          >
            +{v}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => applyCustom(-1)}
          className="w-10 h-10 shrink-0 bg-red-50 hover:bg-red-100 text-red-600 text-xl font-bold rounded-lg transition-colors"
        >
          −
        </button>
        <input
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          min="0"
          className="flex-1 text-center border border-gray-200 rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => applyCustom(1)}
          className="w-10 h-10 shrink-0 bg-green-50 hover:bg-green-100 text-green-600 text-xl font-bold rounded-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}
