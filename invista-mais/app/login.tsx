import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { KronaOne_400Regular } from '@expo-google-fonts/krona-one';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    KronaOne_400Regular,
  });

  useEffect(() => {
    const verificarLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Home');
      }
    };
    verificarLogin();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setEmailError('');
      setPasswordError('');

      // Validação básica
      if (!email.trim()) {
        setEmailError('Digite seu e-mail');
        return;
      }
      if (!senha.trim()) {
        setPasswordError('Digite sua senha');
        return;
      }

      const response = await fetch('http://localhost:3000/auth/login', { // <- Adicionar /auth
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.code === 'USER_NOT_FOUND') {
          setEmailError('E-mail não cadastrado');
        } else if (data.code === 'INVALID_PASSWORD') {
          setPasswordError('Senha incorreta');
        } else if (data.mensagem.includes('Confirme seu e-mail')) {
          navigation.navigate('ValidarEmail', { email });
        } else {
          Alert.alert('Erro', data.mensagem || 'Erro no login');
        }
        return;
      }

      // Login bem-sucedido
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('usuario', JSON.stringify({
        id: data.usuario.id, // ← Garanta que o backend envia o ID
        nome: data.usuario.nome,
        email: data.usuario.email,
        
      }))

      router.replace('/home');

    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setSenha(text);
    setPasswordError('');
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FFF" />;
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
              placeholderTextColor="#d4d4d4"
              
              style={[styles.input, emailError ? styles.inputError : null]}
              placeholder="E-mail"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={handlePasswordChange}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <Text style={styles.eyeIconText}>
                  {mostrarSenha ? '🙈' : '👁️'}
                </Text>
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.link}
              onPress={() => navigation.navigate('ValidarEmail', { email })}
            >
              <Text style={styles.linkText}>Esqueci a senha</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.link}
              onPress={() => navigation.navigate('cadastro')}
            >
              <Text style={styles.linkText}>Criar nova conta</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 15,
    fontSize: 16,
    color: 'black'
  },
  inputError: {
    borderColor: '#FF4444',
    borderWidth: 1,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  eyeIconText: {
    fontSize: 20,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#4F29C4',
    borderRadius: 25,
    width: 264,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  buttonDisabled: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
  link: {
    alignItems: 'center',
    marginTop: 15,
  },
  linkText: {
    color: '#4F29C4',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});