import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#FFF',
        headerTitleStyle: styles.headerTitle,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="login" 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="cadastro" 
        options={{ title: 'CADASTRO' }}
      />
      <Stack.Screen 
        name="RedefinirSenha" 
        options={{ title: 'REDEFINIR SENHA' }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B0CC8',
  },
  headerTitle: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 18,
  }
});