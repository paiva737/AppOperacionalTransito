import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View } from 'react-native';

import AbordagensListScreen from '../../features/abordagens/screens/AbordagensListScreen';
import NovaAbordagemScreen from '../../features/abordagens/screens/NovaAbordagemScreen';
import DetalhesAbordagemScreen from '../../features/abordagens/screens/DetalhesAbordagemScreen';
import EditarAbordagemScreen from '../../features/abordagens/screens/EditarAbordagemScreen';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

type MainStackParamList = {
  AbordagensList: undefined;
  NovaAbordagem: undefined;
  DetalhesAbordagem: { id: string };
  EditarAbordagem: { id: string };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AbordagensList"
        component={AbordagensListScreen}
        options={({ navigation }) => ({
          title: 'Abordagens',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <TouchableOpacity onPress={() => navigation.navigate('NovaAbordagem')}>
                <Text style={{ color: '#2563eb', fontWeight: '600' }}>Nova</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={logout}>
                <Text style={{ color: '#ef4444', fontWeight: '600' }}>Sair</Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="NovaAbordagem"
        component={NovaAbordagemScreen}
        options={{ title: 'Nova abordagem' }}
      />

      <Stack.Screen
        name="DetalhesAbordagem"
        component={DetalhesAbordagemScreen}
        options={{ title: 'Detalhes da abordagem' }}
      />

      <Stack.Screen
        name="EditarAbordagem"
        component={EditarAbordagemScreen}
        options={{ title: 'Editar abordagem' }}
      />
    </Stack.Navigator>
  );
}
