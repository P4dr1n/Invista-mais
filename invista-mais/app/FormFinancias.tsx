import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FormData {
  Ano: string;
  Regiao: string;
  SalarioMedio: string;
  Habitacao: string;
  Alimentacao: string;
  Transporte: string;
  EducacaoSaude: string;
  Lazer: string;
  Dividas: string;
  PercentualMoradia: string;
  Fonte: string;
}

const FormCustoVida = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    Ano: '',
    Regiao: '',
    SalarioMedio: '',
    Habitacao: '',
    Alimentacao: '',
    Transporte: '',
    EducacaoSaude: '',
    Lazer: '',
    Dividas: '',
    PercentualMoradia: '',
    Fonte: ''
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('Usuário não autenticado');

      const payload = {
        ...form,
        Ano: Number(form.Ano),
        SalarioMedio: Number(form.SalarioMedio),
        Habitacao: form.Habitacao ? Number(form.Habitacao) : null,
        PercentualMoradia: form.PercentualMoradia ? Number(form.PercentualMoradia) : null
      };

      const response = await fetch('http://localhost:3000/api/auth/custo-vida', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensagem || 'Erro ao salvar dados');

      Alert.alert('Sucesso', 'Dados cadastrados com sucesso!');
      setForm({
        Ano: '',
        Regiao: '',
        SalarioMedio: '',
        Habitacao: '',
        Alimentacao: '',
        Transporte: '',
        EducacaoSaude: '',
        Lazer: '',
        Dividas: '',
        PercentualMoradia: '',
        Fonte: ''
      });

    } catch (error) {
      let errorMessage = 'Erro desconhecido';
      if (error instanceof Error) errorMessage = error.message;
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Cadastro de Custo de Vida</Text>

        {Object.entries(form).map(([key, value]) => (
          <TextInput
            key={key}
            label={key.replace(/([A-Z])/g, ' $1').trim()}
            mode="outlined"
            value={value}
            onChangeText={(text) => setForm(prev => ({ ...prev, [key]: text }))}
            style={styles.input}
            keyboardType={['Regiao', 'Fonte'].includes(key) ? 'default' : 'numeric'}
          />
        ))}

        {loading ? (
          <ActivityIndicator size="large" color="#4F29C4" />
        ) : (
          <Button 
            mode="contained" 
            onPress={handleSubmit}
            style={styles.botao}
            labelStyle={{ color: '#FFF' }}
          >
            Cadastrar Dados
          </Button>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20 },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 8
  },
  botao: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#4F29C4',
    borderRadius: 8
  }
});

export default FormCustoVida;