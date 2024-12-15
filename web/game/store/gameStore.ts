import { create } from 'zustand';
import { PageInfo } from '../scenes/PreloadScene';

interface GameState {
  score: number;
  gameInstance: Phaser.Game | null;
  setScore: (score: number) => void;
  setGameInstance: (game: Phaser.Game) => void;
  pageInfo: PageInfo;
  setPageInfo: (pageInfo: PageInfo) => void;
  state: 'preload' | 'main' | 'gameover';
  setState: (state: 'preload' | 'main' | 'gameover') => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  gameInstance: null,
  pageInfo: {
    page: 0,
    total: 3
  },
  setScore: (score) => set({ score }),
  setGameInstance: (game) => set({ gameInstance: game }),
  setPageInfo: (pageInfo) => set({ pageInfo }),
  state: 'preload',
  setState: (state) => set({ state }),
})); 