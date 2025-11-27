import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
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
  const addAbordagem = useAbordagensStore((state) => state.addAbordagem);

  function handleSalvar() {
    if (!placa.trim()) {
      Alert.alert('Atenção', 'Informe a placa do veículo.');
      return;
    }

    const novaAbordagem: Abordagem = {
      id: Date.now().toString(),
      placa: placa.trim(),
      observacoes: observacoes.trim() || undefined,
      criadaEm: new Date().toISOString(),
      // latitude / longitude / foto serão adicionados depois
    };

    addAbordagem(novaAbordagem);
    navigation.goBack();
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

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSalvar}>
        <Text style={styles.buttonTextPrimary}>Salvar abordagem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleCancelar}>
        <Text style={styles.buttonTextSecondary}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
