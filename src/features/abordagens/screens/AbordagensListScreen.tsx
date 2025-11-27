import { FlatList, Text, View, StyleSheet } from 'react-native';
import type { Abordagem } from '../types';

const MOCK_ABORDAGENS: Abordagem[] = [
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
    latitude: -12.9730,
    longitude: -38.5030,
    criadaEm: new Date().toISOString(),
  },
];

export default function AbordagensListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abordagens da sessão</Text>

      <FlatList
        data={MOCK_ABORDAGENS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.placa}>{item.placa}</Text>
            {item.observacoes ? (
              <Text style={styles.observacoes}>{item.observacoes}</Text>
            ) : null}
            <Text style={styles.meta}>
              {item.latitude?.toFixed(4)}, {item.longitude?.toFixed(4)}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 16 },
  listContent: { gap: 12 },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 12,
  },
  placa: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  observacoes: { fontSize: 14, marginBottom: 4 },
  meta: { fontSize: 12, color: '#6b7280' },
});
