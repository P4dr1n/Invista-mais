// Crie um arquivo src/hooks/useUser.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  nome: string;
  email: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('usuario');
      if (userData) setUser(JSON.parse(userData));
    };
    loadUser();
  }, []);

  return { user };
};