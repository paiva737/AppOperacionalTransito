import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

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

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 14, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
