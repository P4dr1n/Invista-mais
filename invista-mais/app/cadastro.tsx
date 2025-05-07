import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

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

type CampoProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
};

const Campo = ({ 
  label, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  keyboardType = 'default'
}: CampoProps) => (
  <View style={styles.campoContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor="#FFFFFF99"
    />
    <View style={styles.linha} />
  </View>
);

const Cadastro = () => {
  const [etapa, setEtapa] = useState(1);
  const [isMounted, setIsMounted] = useState(true);
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

  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleChange = (campo: keyof FormData, valor: string) => {
    if (isMounted) {
      setFormData(prev => ({
        ...prev,
        [campo]: valor
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://sua-api.com/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Erro no cadastro');
      
      if (isMounted) {
        console.log('Cadastro realizado com sucesso!');
        navigation.goBack();
      }
    } catch (error) {
      if (isMounted) {
        console.error('Erro:', error);
      }
    }
  };

  const Etapa1 = () => (
    <>
      <Campo 
        label="Nome Completo" 
        value={formData.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />
      <Campo 
        label="Sobrenome" 
        value={formData.sobrenome}
        onChangeText={(text) => handleChange('sobrenome', text)}
      />
      <Campo 
        label="CPF" 
        value={formData.cpf}
        onChangeText={(text) => handleChange('cpf', text)}
        keyboardType="numeric"
      />
      <Campo 
        label="Telefone/Celular" 
        value={formData.telefone}
        onChangeText={(text) => handleChange('telefone', text)}
        keyboardType="phone-pad"
      />
      <Campo 
        label="Login" 
        value={formData.login}
        onChangeText={(text) => handleChange('login', text)}
      />
      <Campo 
        label="Senha" 
        secureTextEntry
        value={formData.senha}
        onChangeText={(text) => handleChange('senha', text)}
      />
      <Campo 
        label="Confirmar Senha" 
        secureTextEntry
        value={formData.confirmarSenha}
        onChangeText={(text) => handleChange('confirmarSenha', text)}
      />
      
      <Pressable 
        style={styles.botao} 
        onPress={() => setEtapa(2)}
      >
        <Text style={styles.botaoTexto}>Próxima Etapa</Text>
      </Pressable>
    </>
  );

  const Etapa2 = () => (
    <>
      <Campo 
        label="CEP" 
        value={formData.cep}
        onChangeText={(text) => handleChange('cep', text)}
        keyboardType="numeric"
      />
      <Campo 
        label="Endereço" 
        value={formData.endereco}
        onChangeText={(text) => handleChange('endereco', text)}
      />
      <Campo 
        label="Número" 
        value={formData.numero}
        onChangeText={(text) => handleChange('numero', text)}
        keyboardType="numeric"
      />
      <Campo 
        label="Bairro" 
        value={formData.bairro}
        onChangeText={(text) => handleChange('bairro', text)}
      />
      <Campo 
        label="Cidade" 
        value={formData.cidade}
        onChangeText={(text) => handleChange('cidade', text)}
      />
      <Campo 
        label="Estado" 
        value={formData.estado}
        onChangeText={(text) => handleChange('estado', text)}
      />
      <Campo 
        label="Mora Como" 
        value={formData.moraComo}
        onChangeText={(text) => handleChange('moraComo', text)}
      />

      <View style={styles.buttonGroup}>
        <Pressable 
          style={styles.botao} 
          onPress={() => setEtapa(1)}
        >
          <Text style={styles.botaoTexto}>Etapa Anterior</Text>
        </Pressable>
        <Pressable 
          style={styles.botaoEnviar} 
          onPress={handleSubmit}
        >
          <Text style={styles.botaoTexto}>Finalizar Cadastro</Text>
        </Pressable>
      </View>
    </>
  );

  return (
    <LinearGradient
      colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Cadastro - Etapa {etapa}</Text>
        {etapa === 1 ? <Etapa1 /> : <Etapa2 />}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 30,
    textAlign: 'center',
  },
  campoContainer: {
    marginBottom: 25,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 8,
  },
  input: {
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  linha: {
    height: 1,
    backgroundColor: '#FFF',
    marginTop: 5,
  },
  botao: {
    backgroundColor: '#4F29C4',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoEnviar: {
    backgroundColor: '#69ACBF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonGroup: {
    marginTop: 30,
    gap: 15,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
});

export default Cadastro;