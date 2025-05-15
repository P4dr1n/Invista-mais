import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

const ValidarCodigoScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [codigo, setCodigo] = useState('');
  const [email, setEmail] = useState('');

  // Carrega os parâmetros de navegação
  useEffect(() => {
    if (route.params) {
      const params = route.params as { email: string | string[] };
      const emailParam = Array.isArray(params.email) 
        ? params.email[0] 
        : params.email;
      
      if (emailParam) {
        setEmail(emailParam);
      } else {
        Alert.alert('Erro', 'E-mail não encontrado');
        navigation.goBack();
      }
    }
  }, [route.params]);

  const handleValidar = async () => {
    try {
      if (!codigo || codigo.length !== 6) {
        Alert.alert('Erro', 'Digite um código válido de 6 dígitos');
        return;
      }

      const response = await fetch('http://localhost:3000/verificacao/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro na verificação');
      }

      if (data.success) {
        navigation.navigate('RedefinirSenha', { email });
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha na verificação');
    }
  };

  const handleReenviar = async () => {
    try {
      const response = await fetch('http://localhost:3000/verificacao/solicitar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,codigo }),
      });

      if (!response.ok) {
        throw new Error('Falha ao reenviar código');
      }

      Alert.alert('Sucesso', 'Novo código enviado para seu e-mail!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao reenviar código');
    }
  };

  if (!email) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
          style={styles.background}
        >
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>E-mail não encontrado</Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.botaoTexto}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.titulo}>VERIFICAÇÃO DE CÓDIGO</Text>
          
          <View style={styles.formContainer}>
            <Text style={styles.instrucoes}>
              Enviamos um código de 6 dígitos para {email}
            </Text>

            <TextInput
              style={styles.codigoInput}
              placeholder="••••••"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={6}
              value={codigo}
              onChangeText={setCodigo}
            />

            <TouchableOpacity 
              style={styles.botao}
              onPress={handleValidar}
            >
              <Text style={styles.botaoTexto}>VERIFICAR CÓDIGO</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.link}
              onPress={handleReenviar}
            >
              <Text style={styles.linkTexto}>Reenviar código</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 40,
    letterSpacing: 2,
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
  },
  instrucoes: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#4F29C4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 10,
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  codigoInput: {
    fontSize: 24,
    letterSpacing: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 15,
    color: '#FFF',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkTexto: {
    color: '#4F29C4',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ValidarCodigoScreen;