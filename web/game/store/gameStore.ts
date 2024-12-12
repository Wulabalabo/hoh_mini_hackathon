import { create } from 'zustand';

interface GameState {
  score: number;
  gameInstance: Phaser.Game | null;
  setScore: (score: number) => void;
  setGameInstance: (game: Phaser.Game) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  gameInstance: null,
  setScore: (score) => set({ score }),
  setGameInstance: (game) => set({ gameInstance: game }),
})); 