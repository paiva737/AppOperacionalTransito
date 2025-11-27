import { View, Text } from 'react-native';
import { useLocationStore } from '../store/useLocationStore';
import { styles } from './LocationStatus.styles';

export default function LocationStatus() {
  const isTracking = useLocationStore((state) => state.isTracking);
  const lastLocation = useLocationStore((state) => state.lastLocation);

  if (!isTracking && !lastLocation) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Status de rastreamento</Text>
        <Text style={styles.statusInactive}>Rastreamento não iniciado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status de rastreamento</Text>

      {isTracking ? (
        <Text style={styles.statusText}>Rastreamento em segundo plano ativo.</Text>
      ) : (
        <Text style={styles.statusInactive}>Rastreamento parado.</Text>
      )}

      {lastLocation && (
        <>
          <Text style={styles.coordText}>
            Última posição: {lastLocation.latitude.toFixed(4)},{' '}
            {lastLocation.longitude.toFixed(4)}
          </Text>
          <Text style={styles.timestampText}>
            Última atualização: {new Date(lastLocation.timestamp).toLocaleTimeString()}
          </Text>
        </>
      )}
    </View>
  );
}
