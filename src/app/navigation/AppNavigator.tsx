import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAuthStore } from '../../features/auth/store/useAuthStore';

export default function AppNavigator() {
  const isLogged = useAuthStore((state) => state.isLogged);

  return (
    <NavigationContainer>
      {isLogged ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
