// App.tsx
import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'senha'>('login');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const renderLogin = () => (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
        style={styles.background}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.titulo}>INSTABILIDADE ETERNA</Text>
          
          <View style={styles.formContainer}>
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

            <TouchableOpacity style={styles.botaoEntrar}>
              <Text style={styles.botaoTexto}>ENTRAR</Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => setCurrentScreen('senha')}>
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

  const renderSenha = () => (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
        style={styles.background}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.titulo}>REDEFINIR SENHA</Text>
          
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>NOVA SENHA:</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a nova senha"
                placeholderTextColor="#999"
                value={novaSenha}
                onChangeText={setNovaSenha}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CONFIRMAR SENHA:</Text>
              <TextInput
                style={styles.input}
                placeholder="Repita a nova senha"
                placeholderTextColor="#999"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.botaoSalvar}
              onPress={() => setCurrentScreen('login')}
            >
              <Text style={styles.botaoTexto}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {currentScreen === 'login' ? renderLogin() : renderSenha()}
    </>
  );
}

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
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 50,
    letterSpacing: 3,
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
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
    backgroundColor: '#69ACBF',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoSalvar: {
    backgroundColor: '#4F29C4',
    borderRadius: 8,
    padding: 16,
    marginTop: 30,
    alignItems: 'center',
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
    color: '#69ACBF',
    fontWeight: '600',
  },
});