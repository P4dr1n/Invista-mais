// formFinancias.tsx
// FormFinancias.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, Text, RadioButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface para os parâmetros de navegação

type RootStackParamList = {
  FormFinancias: undefined;
  ResultadoPerfil: { perfil: string };
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'FormFinancias'>;
};

interface InvestmentProfileForm {
  idade: string;
  rendaMensal: string;
  patrimonio: string;
  objetivo: string;
  horizonte: string; // Nome corrigido
  toleranciaRisco: string;
  conhecimentoInvestimentos: string;
  score: number;
  perfilInvestidor?: string;
}

interface CustoVidaData {
  Regiao: string;
  SalarioMedio: number;
  PercentualMoradia: number;
}

const FormFinancias = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [custoVidaData, setCustoVidaData] = useState<CustoVidaData[]>([]);
 const [form, setForm] = useState<InvestmentProfileForm>({
  idade: '',
  rendaMensal: '',
  patrimonio: '',
  objetivo: 'preservacao',
  horizonte: 'curto', // Nome corrigido
  toleranciaRisco: 'conservador',
  conhecimentoInvestimentos: 'iniciante',
  score: 0
});
   useEffect(() => {
    const loadCustoVida = async () => {
      try {
        const response = await fetch('http://localhost:3000/custo-vida');
        const data = await response.json();
        setCustoVidaData(data);
      } catch (error) {
        console.error('Erro ao carregar custo de vida:', error);
      }
    };
    loadCustoVida();
  }, []);

  const calcularPerfil = () => {
    let score = 0;

    // Cálculo baseado nas respostas
    const scores = {
      objetivo: {
        preservacao: 1,
        renda: 2,
        moderado: 3,
        alto: 4
      },
      horizonte: {
        curto: 1,
        medio: 2,
        longo: 4
      },
      toleranciaRisco: {
        conservador: 1,
        moderado: 3,
        arrojado: 5
      },
      conhecimento: {
        iniciante: 1,
        intermediario: 3,
        avancado: 5
      }
    };

    score += scores.objetivo[form.objetivo as keyof typeof scores.objetivo];
    score += scores.horizonte[form.horizonte as keyof typeof scores.horizonte];
    score += scores.toleranciaRisco[form.toleranciaRisco as keyof typeof scores.toleranciaRisco];
    score += scores.conhecimento[form.conhecimentoInvestimentos as keyof typeof scores.conhecimento];

    let perfil = '';
    if (score <= 6) perfil = 'Conservador';
    else if (score <= 10) perfil = 'Moderado';
    else if (score <= 15) perfil = 'Arrojado';
    else perfil = 'Agressivo';

    return { score, perfil };
  };

 const handleSubmit = async () => {
    setLoading(true);
    try {
      const usuarioId = await AsyncStorage.getItem('userId');
      if (!usuarioId) throw new Error('Usuário não autenticado');

      const { score, perfil } = calcularPerfil();
      
      const payload = {
        usuarioId,
        ...form,
        idade: Number(form.idade),
        rendaMensal: Number(form.rendaMensal),
        patrimonio: Number(form.patrimonio),
        score,
        perfilInvestidor: perfil
      };


      // Substitua pela URL da sua API
     const response = await fetch('http://localhost:3000/perfil-investimento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Falha ao salvar perfil');

      navigation.navigate('ResultadoPerfil', { perfil });
    } catch (error) {
    let errorMessage = 'Falha ao salvar perfil';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    Alert.alert('Erro', errorMessage);
  } finally {
    setLoading(false);
  }
};

   const renderRadioGroup = (
    label: string,
    value: string,
    options: { label: string; value: string }[],
    field: keyof InvestmentProfileForm
  ) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      <RadioButton.Group
        value={value}
        onValueChange={(newValue) => setForm({ ...form, [field]: newValue })}
      >
        {options.map((option) => (
          <RadioButton.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </RadioButton.Group>
    </View>
  );

  return (
    <LinearGradient
      colors={['#3B0CC8', '#4F29C4', '#69ACBF', '#9E9783']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.titulo}>Perfil de Investimento</Text>

          <View style={styles.formContainer}>
            {custoVidaData.length > 0 && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Média regional: R$ {custoVidaData[0].SalarioMedio.toFixed(2)}
                </Text>
                <Text style={styles.infoText}>
                  % Moradia: {custoVidaData[0].PercentualMoradia}%
                </Text>
              </View>
            )}

            <TextInput
              label="Idade"
              mode="outlined"
              keyboardType="numeric"
              value={form.idade}
              onChangeText={(text) => setForm({ ...form, idade: text })}
              style={styles.input}
            />

            <TextInput
              label="Renda Mensal (R$)"
              mode="outlined"
              keyboardType="numeric"
              value={form.rendaMensal}
              onChangeText={(text) => setForm({ ...form, rendaMensal: text })}
              style={styles.input}
            />

            <TextInput
              label="Patrimônio Total (R$)"
              mode="outlined"
              keyboardType="numeric"
              value={form.patrimonio}
              onChangeText={(text) => setForm({ ...form, patrimonio: text })}
              style={styles.input}
            />

            {renderRadioGroup(
              'Objetivo Financeiro',
              form.objetivo,
              [
                { label: 'Preservação de Capital', value: 'preservacao' },
                { label: 'Geração de Renda', value: 'renda' },
                { label: 'Crescimento Moderado', value: 'moderado' },
                { label: 'Alto Crescimento', value: 'alto' },
              ],
              'objetivo'
            )}

           {renderRadioGroup(
            'Horizonte de Investimento',
            form.horizonte, // Nome corrigido
            [
                { label: 'Curto Prazo (até 2 anos)', value: 'curto' },
                { label: 'Médio Prazo (2-5 anos)', value: 'medio' },
                { label: 'Longo Prazo (+5 anos)', value: 'longo' },
            ],
            'horizonte' // Nome corrigido
            )}

            {renderRadioGroup(
              'Tolerância a Risco',
              form.toleranciaRisco,
              [
                { label: 'Conservador', value: 'conservador' },
                { label: 'Moderado', value: 'moderado' },
                { label: 'Arrojado', value: 'arrojado' },
              ],
              'toleranciaRisco'
            )}
            {renderRadioGroup(
              'Conhecimento em Investimentos',
              form.conhecimentoInvestimentos,
              [
                { label: 'Iniciante', value: 'iniciante' },
                { label: 'Intermediário', value: 'intermediario' },
                { label: 'Avançado', value: 'avancado' },
              ],
              'conhecimentoInvestimentos'
            )}

            {loading ? (
              <ActivityIndicator size="large" color="#4F29C4" />
            ) : (
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.botao}
              >
                Salvar Perfil
              </Button>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// Mantenha os mesmos estilos do exemplo anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20
  },
  titulo: {
    color: '#FFF',
    fontSize: 24,
    marginBottom: 30,
    paddingTop: 30,
    textAlign: 'center',
  },
    infoBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 5,
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  botao: {
    marginTop: 20,
    paddingVertical: 8,
  },
});

export default FormFinancias;