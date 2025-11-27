import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { styles } from './LoginScreen.styles';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar (mock)</Text>
      </TouchableOpacity>
    </View>
  );
}
