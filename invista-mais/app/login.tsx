import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Para Expo
// OU usar para React Native CLI: import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';

// 1. Tipagem para navegação
type RootStackParamList = {
  Login: undefined;
  RedefinirSenha: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
        locations={[0, 0.33, 0.77, 0.95]}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.titulo}>INSTABILIDADE ETERNA</Text>
          
          <View style={styles.formContainer}>
            {/* Campo Login */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>LOGIN:</Text>
              <TextInput
                style={styles.input}
                placeholder="digite seu login"
                placeholderTextColor="#999"
                value={login}
                onChangeText={setLogin}
              />
            </View>

            {/* Campo Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>SENHA:</Text>
              <TextInput
                style={styles.input}
                placeholder="digite sua senha"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>

            {/* Botão de Entrar */}
            <TouchableOpacity 
              style={styles.botaoEntrar}
              activeOpacity={0.7}
            >
              <Text style={styles.botaoTexto}>ENTRAR</Text>
            </TouchableOpacity>

            {/* Links inferiores */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('RedefinirSenha')}>
                <Text style={styles.link}>ESQUECI A SENHA</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text style={[styles.link, styles.criarConta]}>CRIAR LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay para melhor contraste
    padding: 30,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    color: '#FFF', // Alterado para branco para contraste
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 50,
    letterSpacing: 3,
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)', // Fundo semi-transparente
    borderRadius: 15,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 14,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  botaoEntrar: {
    backgroundColor: '#69ACBF', // Usando uma das cores do gradiente
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  link: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  criarConta: {
    color: '#69ACBF', // Cor de destaque
    fontWeight: '600',
  },
});

export default LoginScreen;