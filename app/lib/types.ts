export type GameMode = 'count-up' | 'count-down'
export type GamePhase = 'setup' | 'playing'

export interface Player {
  id: string
  name: string
  score: number
}

export interface GameConfig {
  phase: GamePhase
  mode: GameMode
  startScore: number
  goalScore: number
  players: Player[]
}

export const defaultConfig: GameConfig = {
  phase: 'setup',
  mode: 'count-up',
  startScore: 100,
  goalScore: 100,
  players: [
    { id: '1', name: 'Player 1', score: 0 },
    { id: '2', name: 'Player 2', score: 0 },
  ],
}
