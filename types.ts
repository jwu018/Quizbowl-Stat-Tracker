
export interface Player {
  id: string;
  name: string;
}

export interface BuzzEvent {
  id: string;
  timestamp: number;
  playerId: string;
  playerName: string;
  isCorrect: boolean;
  bonusCorrect: boolean;
}

export interface GameState {
  activePlayers: Player[];
  allPlayers: Set<string>;
  history: BuzzEvent[];
  isGameOver: boolean;
  ourScore: number;
  opponentScore: number;
}

export interface SavedGame {
  id: string;
  date: string;
  allPlayers: string[]; // List of unique names from that game
  history: BuzzEvent[];
  ourScore: number;
  opponentScore: number;
}
