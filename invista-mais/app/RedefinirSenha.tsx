import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';



type RedefinirSenhaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RedefinirSenha'>;

interface RedefinirSenhaScreenProps {
  navigation: RedefinirSenhaScreenNavigationProp;
}

const RedefinirSenhaScreen = ({ navigation }: RedefinirSenhaScreenProps) => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { email } = route.params as { email: string };

  const handleRedefinirSenha = async () => {
    try {
      setLoading(true);

      // Validações
      if (novaSenha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não coincidem');
        return;
      }

      if (novaSenha.length < 6) {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
        return;
      }

      const response = await fetch('http://localhost:3000/auth/redefinir-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          novaSenha,
          confirmarSenha
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao redefinir senha');
      }

      Alert.alert('Sucesso!', 'Senha redefinida com sucesso');
      navigation.navigate('login');

    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha na redefinição');
    } finally {
      setLoading(false);
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
              style={[styles.botaoSalvar, loading && styles.botaoDesabilitado]}
              activeOpacity={0.7}
              onPress={handleRedefinirSenha}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.botaoTexto}>SALVAR</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Estilos permanecem os mesmos
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
   botaoDesabilitado: {
    backgroundColor: '#666',
    opacity: 0.7,
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
    fontWeight: '700',
  },
});

export default RedefinirSenhaScreen;