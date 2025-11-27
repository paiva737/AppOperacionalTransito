import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AbordagensListScreen from '../../features/abordagens/screens/AbordagensListScreen';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AbordagensList"
        component={AbordagensListScreen}
        options={{
          title: 'Abordagens',
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={{ marginRight: 12 }}>
              <Text style={{ color: '#ef4444', fontWeight: '600' }}>Sair</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
