import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './DetalhesAbordagemScreen.styles';
import { useAbordagensStore } from '../store/useAbordagensStore';
import type { Abordagem } from '../types';

type MainStackParamList = {
  AbordagensList: undefined;
  NovaAbordagem: undefined;
  DetalhesAbordagem: { id: string };
  EditarAbordagem: { id: string };
};

type ParamList = {
  DetalhesAbordagem: { id: string };
};

type DetalhesNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'DetalhesAbordagem'
>;

export default function DetalhesAbordagemScreen() {
  const route = useRoute<RouteProp<ParamList, 'DetalhesAbordagem'>>();
  const navigation = useNavigation<DetalhesNavigationProp>();
  const { id } = route.params;

  const removeAbordagem = useAbordagensStore((state) => state.removeAbordagem);

  const abordagemEncontrada = useAbordagensStore((state) =>
    state.abordagens.find((a) => a.id === id)
  );

  if (!abordagemEncontrada) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Abordagem não encontrada.</Text>
      </View>
    );
  }

  const abordagem: Abordagem = abordagemEncontrada;

  const hasLocation =
    abordagem.latitude !== undefined && abordagem.longitude !== undefined;

  const dataFormatada = new Date(abordagem.criadaEm).toLocaleString();

  function handleExcluir() {
    Alert.alert(
      'Excluir abordagem',
      'Tem certeza que deseja excluir esta abordagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            removeAbordagem(abordagem.id);
            navigation.goBack();
          },
        },
      ]
    );
  }

  function handleEditar() {
    navigation.navigate('EditarAbordagem', { id: abordagem.id });
  }

  return (
    <ScrollView style={styles.container}>
      {abordagem.fotoUri ? (
        <Image source={{ uri: abordagem.fotoUri }} style={styles.bigImage} />
      ) : null}

      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>{abordagem.placa}</Text>
        <Text style={styles.headerSubtitle}>{dataFormatada}</Text>

        <View style={styles.headerMetaRow}>
          <View style={styles.headerMetaChip}>
            <Text style={styles.headerMetaText}>
              {hasLocation ? 'Com localização' : 'Sem localização'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionLabel}>Observações</Text>
        {abordagem.observacoes ? (
          <Text style={styles.sectionValue}>{abordagem.observacoes}</Text>
        ) : (
          <Text style={styles.sectionValueMuted}>
            Nenhuma observação registrada.
          </Text>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionLabel}>Localização</Text>
        {hasLocation ? (
          <Text style={styles.sectionValue}>
            {abordagem.latitude?.toFixed(5)}, {abordagem.longitude?.toFixed(5)}
          </Text>
        ) : (
          <Text style={styles.sectionValueMuted}>
            Sem coordenadas disponíveis.
          </Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditar}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleExcluir}>
          <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
