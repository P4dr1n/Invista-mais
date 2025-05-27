import * as React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoogleChart from './GoogleChart';
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';

const HOME = () => {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

  const chartData = [
    ['Mês', 'Dívida', 'Saldo', 'Meta'],
    ['Jan', 2000, 500, 10000],
    ['Fev', 1800, 800, 10000],
    ['Mar', 1500, 1200, 10000],
    ['Abr', 1200, 1500, 10000]
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        style={styles.gradient}
        colors={['#5028c6', '#603ec5', '#b3b0bc']}
        locations={[0, 0.5, 1] as [number, number, number]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}  
      >
        {/* Header com botão do menu */}
        <View style={styles.header}>
          <MenuToggleButton onPress={toggleSidebar} />
          <Text style={styles.headerTitle}>Resumo Financeiro</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
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
                chartType="LineChart"
            />
          </View>
        </ScrollView>

        {/* Menu Lateral */}
        <SidebarNavigation
          currentPage="home"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40, // Mesmo tamanho do botão para centralizar o título
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 30,
  },
  chartTitle: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
    marginBottom: 15,
  },
});

export default HOME;