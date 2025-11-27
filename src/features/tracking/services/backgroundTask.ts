import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { useLocationStore } from '../store/useLocationStore';
import type { LocationSample } from '../types';

export const BACKGROUND_LOCATION_TASK = 'BACKGROUND_LOCATION_TASK';

async function simulateSendToApi(sample: LocationSample) {
  
  await new Promise((resolve) => setTimeout(resolve, 300));
}

TaskManager.defineTask(
  BACKGROUND_LOCATION_TASK,
  async ({ data, error }) => {
    if (error) {
      console.error('Erro na task de localização:', error);
      return;
    }

    const locationData = data as
      | {
          locations?: Location.LocationObject[];
        }
      | undefined;

    const locations = locationData?.locations;
    if (!locations || locations.length === 0) return;

    const loc = locations[0];

    const sample: LocationSample = {
      id: Date.now().toString(),
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      timestamp: new Date().toISOString(),
      sentToApi: false,
    };

    const store = useLocationStore.getState();
    store.addSample(sample);

    try {
      await simulateSendToApi(sample);
      store.markAsSent(sample.id);
    } catch (err) {
      console.error('Falha ao enviar localização simulada para API:', err);
    }
  }
);
