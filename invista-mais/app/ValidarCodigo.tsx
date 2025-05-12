import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { useLocalSearchParams } from 'expo-router';

type ValidarCodigoScreenProps = {
  route: { params: { email: string } };
};

const ValidarCodigoScreen = ({ route }: ValidarCodigoScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [codigo, setCodigo] = useState('');
    const email = Array.isArray(route.params.email) 
    ? route.params.email[0] // Pega o primeiro elemento se for array
    : route.params.email;

  const handleValidar = async () => {
    try {
      // Altere para seu IP real
      const response = await fetch('http://localhost:3000/verificacao/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.mensagem || 'Erro na verificação');
      
      if (data.success) {
        navigation.navigate('RedefinirSenha', { email });
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha na verificação');
    }
  };

  const handleReenviar = async () => {
    try {
      await fetch('http://localhost:3000/verificacao/solicitar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      Alert.alert('Sucesso', 'Código reenviado!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao reenviar código');
    }
  };
      

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
                  onPress={handleValidar} // Nome corrigido
                >
                  <Text style={styles.botaoTexto}>VERIFICAR CÓDIGO</Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.linkTexto}>Reenviar código</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </SafeAreaView>
      );
    }

const styles = StyleSheet.create({
  // ... (estilos semelhantes com adaptações)
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
});

export default ValidarCodigoScreen;