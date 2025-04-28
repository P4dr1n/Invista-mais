import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#3B0CC8' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          title: 'Login'
        }} 
      />
      <Stack.Screen 
        name="Senha-esquecida" 
        options={{ 
          title: 'Redefinir Senha',
          headerBackTitle: 'Voltar'
        }} 
      />
    </Stack>
  );
}