import { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import type { Abordagem } from '../types';
import { useAbordagensStore } from '../store/useAbordagensStore';
import { styles } from './AbordagensListScreen.styles';
import LocationStatus from '../../tracking/components/LocationStatus';

function AbordagemCard({
  item,
  onPressImage,
}: {
  item: Abordagem;
  onPressImage: (uri: string) => void;
}) {
  const hasLocation =
    item.latitude !== undefined && item.longitude !== undefined;

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardInfo}>
          <Text style={styles.placa}>{item.placa}</Text>

          {item.observacoes ? (
            <Text style={styles.observacoes}>{item.observacoes}</Text>
          ) : null}

          <Text style={styles.meta}>
            {hasLocation
              ? `${item.latitude?.toFixed(4)}, ${item.longitude?.toFixed(4)}`
              : 'Sem localização registrada'}
          </Text>

          <Text style={styles.metaTime}>
            {new Date(item.criadaEm).toLocaleTimeString()}
          </Text>
        </View>

        {item.fotoUri ? (
          <TouchableOpacity onPress={() => onPressImage(item.fotoUri!)}>
            <Image source={{ uri: item.fotoUri }} style={styles.thumb} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

export default function AbordagensListScreen() {
  const abordagens = useAbordagensStore((state) => state.abordagens);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  function handleCloseModal() {
    setSelectedImageUri(null);
  }

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
        renderItem={({ item }) => (
          <AbordagemCard
            item={item}
            onPressImage={(uri) => setSelectedImageUri(uri)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma abordagem registrada nesta sessão.
          </Text>
        }
      />

      <Modal
        visible={!!selectedImageUri}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackdrop}>
          {selectedImageUri ? (
            <>
              <Image
                source={{ uri: selectedImageUri }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.modalCloseText}>Fechar</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </Modal>
    </View>
  );
}
