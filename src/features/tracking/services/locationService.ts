import * as Location from 'expo-location';
import { BACKGROUND_LOCATION_TASK } from './backgroundTask';
import { useLocationStore } from '../store/useLocationStore';

export async function startBackgroundLocationTracking() {
  const store = useLocationStore.getState();

  const { status: fgStatus } =
    await Location.requestForegroundPermissionsAsync();

  if (fgStatus !== 'granted') {
    console.warn('Permissão de localização em foreground negada.');
    return;
  }

  const { status: bgStatus } =
    await Location.requestBackgroundPermissionsAsync();

  if (bgStatus !== 'granted') {
    console.warn('Permissão de localização em background negada.');
    return;
  }

  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    BACKGROUND_LOCATION_TASK
  );

  if (!hasStarted) {
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 30000, // a cada 30s (ajustável)
      distanceInterval: 20, // ou a cada 20m (ajustável)
      showsBackgroundLocationIndicator: true,
      pausesUpdatesAutomatically: false,
      foregroundService: {
        notificationTitle: 'Monitorando localização',
        notificationBody: 'Sua localização está sendo atualizada em segundo plano.',
      },
    });
  }

  store.startTrackingLocal();
}

export async function stopBackgroundLocationTracking() {
  const store = useLocationStore.getState();

  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    BACKGROUND_LOCATION_TASK
  );

  if (hasStarted) {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  }

  store.stopTrackingLocal();
}
