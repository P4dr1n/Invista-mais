import * as React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


const HOME = () => {
  return (
     <LinearGradient 
      style={styles.container}
      colors={['#5028c6', '#603ec5', '#b3b0bc']}
      locations={[0, 0.5, 1]}
      useAngle={true}
      angle={180}
    >
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resumo Financeiro</Text>
        </View>

        {/* Cards de Valores */}
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.debtCard]}>
            <Text style={styles.cardTitle}>Dívida Total</Text>
            <Text style={styles.cardValue}>R$ 1.500,00</Text>
          </View>

          <View style={[styles.card, styles.balanceCard]}>
            <Text style={styles.cardTitle}>Saldo Disponível</Text>
            <Text style={styles.cardValue}>R$ 250,00</Text>
          </View>

          <View style={[styles.card, styles.goalCard]}>
            <Text style={styles.cardTitle}>Meta Mensal</Text>
            <Text style={styles.cardValue}>R$ 10.000,00</Text>
          </View>
        </View>

        {/* Gráfico de Desempenho */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Desempenho Mensal</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Gráfico aqui</Text>
          </View>
        </View>

      </ScrollView>
    </LinearGradient>
  );
};

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
  chartPlaceholder: {
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 16,
  },
});

export default HOME;