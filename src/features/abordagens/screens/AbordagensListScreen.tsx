import { FlatList, Text, View } from 'react-native';
import type { Abordagem } from '../types';
import { useAbordagensStore } from '../store/useAbordagensStore';
import { styles } from './AbordagensListScreen.styles';
import LocationStatus from '../../tracking/components/LocationStatus';

function AbordagemCard({ item }: { item: Abordagem }) {
  return (
    <View style={styles.card}>
      <Text style={styles.placa}>{item.placa}</Text>
      {item.observacoes ? (
        <Text style={styles.observacoes}>{item.observacoes}</Text>
      ) : null}
      <Text style={styles.meta}>
        {item.latitude !== undefined && item.longitude !== undefined
          ? `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`
          : 'Sem localização registrada'}
      </Text>
    </View>
  );
}

export default function AbordagensListScreen() {
  const abordagens = useAbordagensStore((state) => state.abordagens);

  return (
    <View style={styles.container}>
      <LocationStatus />

      <Text style={styles.title}>Abordagens da sessão</Text>

      <FlatList
        data={abordagens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          abordagens.length === 0 ? styles.emptyList : styles.listContent
        }
        renderItem={({ item }) => <AbordagemCard item={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma abordagem registrada nesta sessão.
          </Text>
        }
      />
    </View>
  );
}
