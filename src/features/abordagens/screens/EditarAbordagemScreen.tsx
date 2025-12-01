import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './EditarAbordagemScreen.styles';
import { useAbordagensStore } from '../store/useAbordagensStore';

type MainStackParamList = {
  AbordagensList: undefined;
  NovaAbordagem: undefined;
  DetalhesAbordagem: { id: string };
  EditarAbordagem: { id: string };
};

type ParamList = {
  EditarAbordagem: { id: string };
};

type EditarNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'EditarAbordagem'
>;

export default function EditarAbordagemScreen() {
  const route = useRoute<RouteProp<ParamList, 'EditarAbordagem'>>();
  const navigation = useNavigation<EditarNavigationProp>();
  const { id } = route.params;

  const updateAbordagem = useAbordagensStore((state) => state.updateAbordagem);
  const abordagemEncontrada = useAbordagensStore((state) =>
    state.abordagens.find((a) => a.id === id)
  );

  const [placa, setPlaca] = useState(abordagemEncontrada?.placa ?? '');
  const [observacoes, setObservacoes] = useState(
    abordagemEncontrada?.observacoes ?? ''
  );
  const [fotoUri, setFotoUri] = useState<string | undefined>(
    abordagemEncontrada?.fotoUri
  );
  const [isSaving, setIsSaving] = useState(false);

  if (!abordagemEncontrada) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Abordagem não encontrada.</Text>
      </View>
    );
  }

  async function handleSelecionarFoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de acesso à galeria para selecionar a foto do veículo.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    setFotoUri(asset.uri);
  }

  async function handleSalvar() {
    if (!placa.trim()) {
      Alert.alert('Atenção', 'Informe a placa do veículo.');
      return;
    }

    try {
      setIsSaving(true);

      updateAbordagem(id, {
        placa: placa.trim(),
        observacoes: observacoes.trim() || undefined,
        fotoUri,
      });

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancelar() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar abordagem</Text>

      <Text style={styles.label}>Placa do veículo</Text>
      <TextInput
        style={styles.input}
        placeholder="ABC-1234"
        autoCapitalize="characters"
        value={placa}
        onChangeText={setPlaca}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Alguma observação relevante..."
        multiline
        value={observacoes}
        onChangeText={setObservacoes}
      />

      <Text style={styles.fotoLabel}>Foto do veículo</Text>
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={handleSelecionarFoto}
      >
        <Text style={styles.buttonTextSecondary}>
          Selecionar foto na galeria
        </Text>
      </TouchableOpacity>

      {fotoUri ? (
        <View style={styles.fotoPreview}>
          <Image source={{ uri: fotoUri }} style={styles.fotoImage} />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={handleSalvar}
        disabled={isSaving}
      >
        <Text style={styles.buttonTextPrimary}>
          {isSaving ? 'Salvando...' : 'Salvar alterações'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelar}>
        <Text style={styles.buttonTextSecondary}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
