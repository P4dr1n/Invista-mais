import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

type FormData = {
  login: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  cep: string;
  endereco: string;
  bairro: string;
  numero: string;
  cidade: string;
  estado: string;
  moraComo: string;
};

const Cadastro = () => {
  const [etapa, setEtapa] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    login: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
    nome: '',
    sobrenome: '',
    telefone: '',
    cep: '',
    endereco: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: '',
    moraComo: ''
  });

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleChange = (campo: keyof FormData, valor: string) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const validarEtapa1 = () => {
    return (
      formData.nome.length > 2 &&
      formData.sobrenome.length > 2 &&
      formData.cpf.length === 11 &&
      formData.telefone.length >= 10 &&
      formData.login.includes('@') &&
      formData.senha.length >= 6 &&
      formData.senha === formData.confirmarSenha
    );
  };

  const handleCadastro = async () => {
    try {
      const dadosParaEnvio = {
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        cpf: formData.cpf,
        telefone: formData.telefone,
        email: formData.login,
        senha: formData.senha,
        cep: formData.cep,
        endereco: formData.endereco,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        mora_como: formData.moraComo
      };

      const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnvio),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao cadastrar');
      }

      Alert.alert('Sucesso!', 'Cadastro realizado. Verifique seu e-mail para ativar a conta.');
      navigation.navigate('ValidarEmail', { email: formData.login });

    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha no cadastro');
      console.error('Erro no cadastro:', error);
    }
  };

  const renderInput = (
    label: string,
    campo: keyof FormData,
    keyboardType: 'default' | 'numeric' | 'email-address' | 'phone-pad' = 'default',
    secure = false
  ) => (
    <View style={styles.campoContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={formData[campo]}
        onChangeText={(text) => handleChange(campo, text)}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        placeholderTextColor="#FFFFFF99"
      />
      <View style={styles.linha} />
    </View>
  );

  return (
    <LinearGradient
      colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Cadastro - Etapa {etapa}</Text>

          {etapa === 1 ? (
            <>
              {renderInput('Nome Completo', 'nome')}
              {renderInput('Sobrenome', 'sobrenome')}
              {renderInput('CPF', 'cpf', 'numeric')}
              {renderInput('Telefone', 'telefone', 'phone-pad')}
              {renderInput('E-mail', 'login', 'email-address')}
              {renderInput('Senha', 'senha', 'default', true)}
              {renderInput('Confirmar Senha', 'confirmarSenha', 'default', true)}

              <Pressable
                style={[styles.botao, !validarEtapa1() && styles.botaoDesabilitado]}
                onPress={() => setEtapa(2)}
                disabled={!validarEtapa1()}
              >
                <Text style={styles.botaoTexto}>Próxima Etapa</Text>
              </Pressable>
            </>
          ) : (
            <>
              {renderInput('CEP', 'cep', 'numeric')}
              {renderInput('Endereço', 'endereco')}
              {renderInput('Número', 'numero', 'numeric')}
              {renderInput('Bairro', 'bairro')}
              {renderInput('Cidade', 'cidade')}
              {renderInput('Estado', 'estado')}
              {renderInput('Mora Como', 'moraComo')}

              <View style={styles.buttonGroup}>
                <Pressable 
                  style={styles.botao}
                  onPress={() => setEtapa(1)}
                >
                  <Text style={styles.botaoTexto}>Etapa Anterior</Text>
                </Pressable>
                <Pressable 
                  style={styles.botaoEnviar}
                  onPress={handleCadastro}
                >
                  <Text style={styles.botaoTexto}>Finalizar Cadastro</Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 20 },
  scrollContainer: { paddingBottom: 40 },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 30,
    textAlign: 'center'
  },
  campoContainer: { marginBottom: 25 },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 8
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  linha: { height: 1, backgroundColor: '#FFF', marginTop: 5 },
  botao: {
    backgroundColor: '#4F29C4',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  botaoEnviar: {
    backgroundColor: '#69ACBF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  botaoDesabilitado: { backgroundColor: '#666', opacity: 0.6 },
  buttonGroup: { marginTop: 30, gap: 15, alignItems: 'center' },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular'
  }
});

export default Cadastro;