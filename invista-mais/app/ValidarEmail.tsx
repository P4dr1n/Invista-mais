import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

type ValidarEmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ValidarEmail'>;

        const ValidarEmailScreen = () => {
            const navigation = useNavigation<ValidarEmailScreenNavigationProp>();
            const [email, setEmail] = useState('');
          
            const handleEnviarCodigo = async () => {
          try {
            const response = await fetch('http://192.168.1.7:3000/verificacao/solicitar-codigo', { // <- Novo caminho
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email }),
            });

            if (response.ok) {
              navigation.navigate('ValidarCodigo', { email });
            }
          } catch (error) {
            Alert.alert('Erro', 'Falha ao enviar código');
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
          <Text style={styles.titulo}>VALIDAÇÃO DE E-MAIL</Text>
          
          <View style={styles.formContainer}>
            <Text style={styles.instrucoes}>
              Digite o e-mail associado à sua conta para enviarmos um código de verificação
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity 
              style={styles.botao}
              onPress={handleEnviarCodigo}
            >
              <Text style={styles.botaoTexto}>ENVIAR CÓDIGO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (use os mesmos estilos do RedefinirSenha.tsx com pequenos ajustes)
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
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
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
});

export default ValidarEmailScreen;