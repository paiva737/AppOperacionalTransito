import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { styles } from './NovaAbordagemScreen.styles';
import { useAbordagensStore } from '../store/useAbordagensStore';
import type { Abordagem } from '../types';

type MainStackParamList = {
  AbordagensList: undefined;
  NovaAbordagem: undefined;
};

type Props = NativeStackScreenProps<MainStackParamList, 'NovaAbordagem'>;

export default function NovaAbordagemScreen({ navigation }: Props) {
  const [placa, setPlaca] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [fotoUri, setFotoUri] = useState<string | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);

  const addAbordagem = useAbordagensStore((state) => state.addAbordagem);

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

      let latitude: number | undefined;
      let longitude: number | undefined;

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      } else {
        Alert.alert(
          'Localização não permitida',
          'A abordagem será salva sem coordenadas de localização.'
        );
      }

      const novaAbordagem: Abordagem = {
        id: Date.now().toString(),
        placa: placa.trim(),
        observacoes: observacoes.trim() || undefined,
        criadaEm: new Date().toISOString(),
        fotoUri,
        latitude,
        longitude,
      };

      addAbordagem(novaAbordagem);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar obter a localização. A abordagem será salva sem coordenadas.'
      );

      const novaAbordagem: Abordagem = {
        id: Date.now().toString(),
        placa: placa.trim(),
        observacoes: observacoes.trim() || undefined,
        criadaEm: new Date().toISOString(),
        fotoUri,
      };

      addAbordagem(novaAbordagem);
      navigation.goBack();
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancelar() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova abordagem</Text>

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
          {isSaving ? 'Salvando...' : 'Salvar abordagem'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelar}>
        <Text style={styles.buttonTextSecondary}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
