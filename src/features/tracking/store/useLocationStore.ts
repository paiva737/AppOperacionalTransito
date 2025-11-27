import { create } from 'zustand';
import type { LocationSample } from '../types';

type LocationState = {
  isTracking: boolean;
  lastLocation: LocationSample | null;
  samples: LocationSample[];
  startTrackingLocal: () => void;
  stopTrackingLocal: () => void;
  addSample: (sample: LocationSample) => void;
  markAsSent: (id: string) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  isTracking: false,
  lastLocation: null,
  samples: [],
  startTrackingLocal: () => set({ isTracking: true }),
  stopTrackingLocal: () => set({ isTracking: false }),
  addSample: (sample) =>
    set((state) => ({
      lastLocation: sample,
      samples: [sample, ...state.samples].slice(0, 50), // mantém no máx. 50 últimos
    })),
  markAsSent: (id) =>
    set((state) => ({
      samples: state.samples.map((s) =>
        s.id === id ? { ...s, sentToApi: true } : s
      ),
    })),
}));
