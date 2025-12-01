import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LocationSample } from '../types';

type LocationState = {
  isTracking: boolean;
  lastLocation: LocationSample | null;
  samples: LocationSample[];
  startTrackingLocal: () => void;
  stopTrackingLocal: () => void;
  addSample: (sample: LocationSample) => void;
  markAsSent: (id: string) => void;
  clearSamples: () => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      isTracking: false,
      lastLocation: null,
      samples: [],
      startTrackingLocal: () => set({ isTracking: true }),
      stopTrackingLocal: () => set({ isTracking: false }),
      addSample: (sample) =>
        set((state) => ({
          lastLocation: sample,
          samples: [sample, ...state.samples].slice(0, 50),
        })),
      markAsSent: (id) =>
        set((state) => ({
          samples: state.samples.map((s) =>
            s.id === id ? { ...s, sentToApi: true } : s
          ),
        })),
      clearSamples: () => set({ samples: [] }),
    }),
    {
      name: 'tracking-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
