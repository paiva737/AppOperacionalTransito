import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Abordagem } from '../types';

type AbordagensState = {
  abordagens: Abordagem[];
  addAbordagem: (abordagem: Abordagem) => void;
  updateAbordagem: (id: string, data: Partial<Abordagem>) => void;
  removeAbordagem: (id: string) => void;
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
      updateAbordagem: (id, data) =>
        set((state) => ({
          abordagens: state.abordagens.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        })),
      removeAbordagem: (id) =>
        set((state) => ({
          abordagens: state.abordagens.filter((a) => a.id !== id),
        })),
      clearAbordagens: () => set({ abordagens: [] }),
    }),
    {
      name: 'abordagens-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
