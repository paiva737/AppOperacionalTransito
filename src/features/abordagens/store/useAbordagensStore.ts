import { create } from 'zustand';
import type { Abordagem } from '../types';

type AbordagensState = {
  abordagens: Abordagem[];
  addAbordagem: (abordagem: Abordagem) => void;
  clearAbordagens: () => void;
};

const INITIAL_ABORDAGENS: Abordagem[] = [
  {
    id: '1',
    placa: 'ABC-1234',
    observacoes: 'Veículo em situação regular',
    latitude: -12.9714,
    longitude: -38.5014,
    criadaEm: new Date().toISOString(),
  },
  {
    id: '2',
    placa: 'XYZ-5678',
    observacoes: 'Condutor aparenta nervosismo',
    latitude: -12.973,
    longitude: -38.503,
    criadaEm: new Date().toISOString(),
  },
];

export const useAbordagensStore = create<AbordagensState>((set) => ({
  abordagens: INITIAL_ABORDAGENS,
  addAbordagem: (abordagem) =>
    set((state) => ({
      abordagens: [abordagem, ...state.abordagens],
    })),
  clearAbordagens: () => set({ abordagens: [] }),
}));
