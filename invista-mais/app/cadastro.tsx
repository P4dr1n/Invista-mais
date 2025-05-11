import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

type FormData = {
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
  </View>
);

const Cadastro = () => {
  const [etapa, setEtapa] = useState(1);
  const [isMounted, setIsMounted] = useState(true);
  const [formData, setFormData] = useState<FormData>({
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
      <View style={styles.cadastro}>
        <Text style={styles.textForm}> Nome Completo </Text>
        <TextInput style={styles.TextInput}
          placeholder='Nome Completo...'
          value={formData.nome}
          onChangeText={(text) => handleChange('nome', text)}
        />
        <Text style={styles.textForm}> Sobrenome</Text>
        <TextInput style={styles.TextInput}
          placeholder="Sobrenome..." 
          value={formData.sobrenome}
          onChangeText={(text) => handleChange('sobrenome', text)}
        />
        <Text style={styles.textForm}> CPF </Text>
        <TextInput style={styles.TextInput}
          placeholder="CPF..." 
          value={formData.cpf}
          onChangeText={(text) => handleChange('cpf', text)}
          keyboardType="numeric"
        />
        <Text style={styles.textForm}> Telefone/Celular </Text>
        <TextInput style={styles.TextInput}
          placeholder="Telefone/Celular..." 
          value={formData.telefone}
          onChangeText={(text) => handleChange('telefone', text)}
          keyboardType="numeric"
        />
        <Text style={styles.textForm}> Senha </Text>
        <TextInput style={styles.TextInput}
          placeholder="Senha..."
          secureTextEntry
          value={formData.senha}
          onChangeText={(text) => handleChange('senha', text)}
        />
        <Text style={styles.textForm}> Confirmar Senha </Text>
        <TextInput style={styles.TextInput}
          placeholder="Confirmar Senha..." 
          value={formData.confirmarSenha}
          onChangeText={(text) => handleChange('confirmarSenha', text)}
        />
      
        <Pressable 
          style={styles.botao} 
          onPress={() => setEtapa(2)}
          >
          <Text style={styles.botaoTexto}>Próxima Etapa</Text>
        </Pressable>
      </View>
    </>
  );

  const Etapa2 = () => (
    <>
    <View style={styles.cadastro}>
      <Text style={styles.textForm}> CEP </Text>
      <TextInput style={styles.TextInput}
        placeholder='CEP...'
        value={formData.cep}
        onChangeText={(text) => handleChange('cep', text)}
        keyboardType="numeric"
      />
      <Text style={styles.textForm}> Endereço </Text>
      <TextInput style={styles.TextInput}
        placeholder="Endereço..." 
        value={formData.endereco}
        onChangeText={(text) => handleChange('endereco', text)}
      />
      <Text style={styles.textForm}> Número </Text>
      <TextInput style={styles.TextInput} 
        placeholder="Número..." 
        value={formData.numero}
        onChangeText={(text) => handleChange('numero', text)}
        keyboardType="numeric"
      />
      <Text style={styles.textForm}> Bairro </Text>
      <TextInput style={styles.TextInput} 
        placeholder="Bairro..." 
        value={formData.bairro}
        onChangeText={(text) => handleChange('bairro', text)}
      />
      <Text style={styles.textForm}> Cidade </Text>
      <TextInput style={styles.TextInput} 
        placeholder="Cidade..." 
        value={formData.cidade}
        onChangeText={(text) => handleChange('cidade', text)}
      />
      <Text style={styles.textForm}> Estado </Text>
      <TextInput style={styles.TextInput} 
        placeholder="Estado..." 
        value={formData.estado}
        onChangeText={(text) => handleChange('estado', text)}
      />
      <Text style={styles.textForm}> Mora Como </Text>
      <TextInput style={styles.TextInput} 
        placeholder="Mora Como..." 
        value={formData.moraComo}
        onChangeText={(text) => handleChange('moraComo', text)}
      />

      <View>
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
  },
  scrollContainer: {
    paddingBottom: 40
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 30,
    paddingTop: 30,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFF',
    fontSize: 16,
    borderRadius: 50,
    width:100,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
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
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
  cadastro: {
    height: '100%',
    paddingTop: 30,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textForm: {
    textAlign: 'justify',
    paddingBottom: 10,
    fontFamily: 'KronaOne-Regular',
  },
  TextInput: {
    textAlign: 'justify',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingTop: 14,
    paddingBottom: 14,
    fontFamily: 'KronaOne-Regular',
  }
});

export default Cadastro;