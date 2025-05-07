import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { KronaOne_400Regular } from '@expo-google-fonts/krona-one';

export default function Login() {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  
  const [fontsLoaded] = useFonts({
    KronaOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#3B0CC8', '#4F29C4', '#694CBF', '#9E97B3']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>INSTABILIDADE ETERNA</Text>
          
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Login"
              placeholderTextColor="#999"
              value={login}
              onChangeText={setLogin}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Senha-esquecida' as never)}
            >
              <Text style={styles.buttonText}>ESQUECI A SENHA</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('cadastro' as never)}
            >
              <Text style={styles.buttonText}>CRIAR CONTA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 30,
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    marginBottom: 50,
  },
  form: {
    gap: 25,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4F29C4',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
});