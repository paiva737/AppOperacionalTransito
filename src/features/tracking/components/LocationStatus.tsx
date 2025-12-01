import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './LocationStatus.styles';
import { useLocationStore } from '../../tracking/store/useLocationStore';

export default function LocationStatus() {
  const { isTracking, lastLocation, startTrackingLocal } = useLocationStore();

  function handleRefresh() {
    startTrackingLocal();

    useLocationStore.setState((state) => {
      if (!state.lastLocation) {
        return state;
      }

      return {
        ...state,
        lastLocation: {
          ...state.lastLocation,
          timestamp: new Date().toISOString(),
        },
      };
    });
  }

  const formattedTime =
    lastLocation && lastLocation.timestamp
      ? new Date(lastLocation.timestamp).toLocaleString()
      : null;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Status de rastreamento</Text>

        <TouchableOpacity onPress={handleRefresh}>
          <Text style={styles.refreshText}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      {isTracking ? (
        <View style={styles.infoBox}>
          <Text style={styles.activeText}>Rastreamento em segundo plano ativo.</Text>

          {lastLocation ? (
            <>
              <Text style={styles.subText}>
                Última posição: {lastLocation.latitude.toFixed(4)},{' '}
                {lastLocation.longitude.toFixed(4)}
              </Text>
              <Text style={styles.subText}>
                Última atualização:{' '}
                {formattedTime ?? 'sem horário disponível'}
              </Text>
            </>
          ) : (
            <Text style={styles.subText}>Sem dados de localização.</Text>
          )}
        </View>
      ) : (
        <View style={styles.infoBox}>
          <Text style={styles.inactiveText}>Rastreamento não iniciado.</Text>
        </View>
      )}
    </View>
  );
}
