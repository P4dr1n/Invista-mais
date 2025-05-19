import * as React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import GoogleChart from './GoogleChart';
import MenuLateral from '../components/MenuLateral';

const HOME = () => {
  const chartData = [
    ['Mês', 'Dívida', 'Saldo', 'Meta'],
    ['Jan', 2000, 500, 10000],
    ['Fev', 1800, 800, 10000],
    ['Mar', 1500, 1200, 10000],
    ['Abr', 1200, 1500, 10000]
  ];
  

  return (
    <LinearGradient 
       style={styles.container}
        colors={['#5028c6', '#603ec5', '#b3b0bc']}
        locations={[0, 0.5, 1] as [number, number, number]}
        start={{ x: 0.5, y: 0 }}   // Topo
        end={{ x: 0.5, y: 1 }}  
    >
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resumo Financeiro</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.debtCard]}>
            <Text style={styles.cardTitle}>Dívida Atual</Text>
            <Text style={styles.cardValue}>R$ 1.200,00</Text>
          </View>

          <View style={[styles.card, styles.balanceCard]}>
            <Text style={styles.cardTitle}>Saldo Atual</Text>
            <Text style={styles.cardValue}>R$ 1.500,00</Text>
          </View>

          <View style={[styles.card, styles.goalCard]}>
            <Text style={styles.cardTitle}>Meta Mensal</Text>
            <Text style={styles.cardValue}>R$ 10.000,00</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Evolução Financeira</Text>
          <GoogleChart 
              data={chartData}
              title="Evolução Financeira"
              chartType="LineChart" // Forçar tipo explícito
          />
        </View>

      </ScrollView>
    </LinearGradient>
  );
};

// Mantenha os mesmos estilos do arquivo anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
  },
  cardContainer: {
    gap: 15,
    marginBottom: 30,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  debtCard: {
    backgroundColor: '#ffebee',
  },
  balanceCard: {
    backgroundColor: '#e8f5e9',
  },
  goalCard: {
    backgroundColor: '#e3f2fd',
  },
  cardTitle: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  cardValue: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
  },
  chartTitle: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
    marginBottom: 15,
  },
});

export default HOME;