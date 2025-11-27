import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useAuthStore } from '../../features/auth/store/useAuthStore';
import {
  startBackgroundLocationTracking,
  stopBackgroundLocationTracking,
} from '../../features/tracking/services/locationService';

export default function AppNavigator() {
  const isLogged = useAuthStore((state) => state.isLogged);

  useEffect(() => {
    if (isLogged) {
      startBackgroundLocationTracking();
    } else {
      stopBackgroundLocationTracking();
    }
  }, [isLogged]);

  return (
    <NavigationContainer>
      {isLogged ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
