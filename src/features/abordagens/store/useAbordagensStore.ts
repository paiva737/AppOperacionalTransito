import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Abordagem } from '../types';

type AbordagensState = {
  abordagens: Abordagem[];
  addAbordagem: (abordagem: Abordagem) => void;
  clearAbordagens: () => void;
};

export const useAbordagensStore = create<AbordagensState>()(
  persist(
    (set) => ({
      abordagens: [],
      addAbordagem: (abordagem) =>
        set((state) => ({
          abordagens: [abordagem, ...state.abordagens],
        })),
      clearAbordagens: () => set({ abordagens: [] }),
    }),
    {
      name: 'abordagens-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
