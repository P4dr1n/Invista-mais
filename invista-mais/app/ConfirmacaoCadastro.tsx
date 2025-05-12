import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';

const ConfirmacaoCadastro = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Simule o email cadastrado (ou receba via contexto/armazenamento)
  const emailCadastrado = ''; 

  return (
    <LinearGradient
      colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        <Text style={styles.title}>🎉 Cadastro Concluído!</Text>
        
        <Text style={styles.text}>
          Um e-mail de confirmação foi enviado para {emailCadastrado}.
        </Text>

        <Text style={styles.subtext}>
          Não recebeu o e-mail?{' '}
          <Text 
            style={styles.link}
            onPress={() => navigation.navigate('ValidarEmail', { email: emailCadastrado })}
          >
            Reenviar código
          </Text>
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    marginBottom: 30,
    textAlign: 'center'
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20
  },
  subtext: {
    color: '#DDD',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30
  },
  link: {
    color: '#4F29C4',
    textDecorationLine: 'underline'
  }
});

export default ConfirmacaoCadastro;