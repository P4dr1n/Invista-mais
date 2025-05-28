import * as React from "react";
import { 
  ScrollView, 
  Text, 
  StyleSheet, 
  View, 
  SafeAreaView,
  ActivityIndicator,
  Pressable
} from "react-native";
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';
import { MaterialIcons } from '@expo/vector-icons';
import GoogleChart from './GoogleChart';

const HomeScreen = () => {
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [financialData, setFinancialData] = React.useState({
    debt: "R$ 1.200,00",
    balance: "R$ 1.500,00",
    goal: "R$ 10.000,00",
    performance: "+25%"
  });

  const chartData = [
    ['Mês', 'Dívida', 'Saldo', 'Meta'],
    ['Jan', 2000, 500, 10000],
    ['Fev', 1800, 800, 10000],
    ['Mar', 1500, 1200, 10000],
    ['Abr', 1200, 1500, 10000],
    ['Mai', 900, 2000, 10000],
    ['Jun', 600, 3500, 10000]
  ];

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const refreshData = () => {
    setLoading(true);
    // Simulação de carregamento de dados
    setTimeout(() => {
      setFinancialData({
        debt: "R$ 900,00",
        balance: "R$ 2.100,00",
        goal: "R$ 10.000,00",
        performance: "+33%"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <MenuToggleButton onPress={toggleSidebar} style={styles.menuButton} />
        <Text style={styles.headerTitle}>RESUMO FINANCEIRO</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EAFF08" />
          <Text style={styles.loadingText}>Atualizando dados...</Text>
        </View>
      ) : (
        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Cards de Resumo */}
          <View style={styles.cardsContainer}>
            <View style={[styles.card, styles.debtCard]}>
              <MaterialIcons name="trending-down" size={28} color="#FF5252" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>DÍVIDA ATUAL</Text>
                <Text style={styles.cardValue}>{financialData.debt}</Text>
              </View>
            </View>

            <View style={[styles.card, styles.balanceCard]}>
              <MaterialIcons name="trending-up" size={28} color="#4CAF50" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>SALDO ATUAL</Text>
                <Text style={styles.cardValue}>{financialData.balance}</Text>
              </View>
            </View>

            <View style={[styles.card, styles.goalCard]}>
              <MaterialIcons name="flag" size={28} color="#2196F3" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>META MENSAL</Text>
                <Text style={styles.cardValue}>{financialData.goal}</Text>
              </View>
            </View>

            <View style={[styles.card, styles.performanceCard]}>
              <MaterialIcons name="assessment" size={28} color="#FFC107" style={styles.cardIcon} />
              <View>
                <Text style={styles.cardTitle}>DESEMPENHO</Text>
                <Text style={styles.cardValue}>{financialData.performance}</Text>
              </View>
            </View>
          </View>

          {/* Gráfico */}
          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>EVOLUÇÃO FINANCEIRA</Text>
              <Pressable onPress={refreshData}>
                <MaterialIcons name="refresh" size={24} color="#EAFF08" />
              </Pressable>
            </View>
            
            <View style={styles.chartWrapper}>
              <GoogleChart 
                data={chartData}
                title="Evolução Financeira"
                chartType="LineChart"
              />
            </View>
          </View>

          {/* Ações Rápidas */}
          <View style={styles.actionsContainer}>
            <Pressable style={styles.actionButton}>
              <MaterialIcons name="add" size={28} color="#5028C6" />
              <Text style={styles.actionText}>ADICIONAR RECEITA</Text>
            </Pressable>
            
            <Pressable style={styles.actionButton}>
              <MaterialIcons name="remove" size={28} color="#5028C6" />
              <Text style={styles.actionText}>REGISTRAR DESPESA</Text>
            </Pressable>
          </View>

          {/* Insights */}
          <View style={styles.insightsContainer}>
            <Text style={styles.insightsTitle}>INSIGHTS FINANCEIROS</Text>
            <View style={styles.insightItem}>
              <MaterialIcons name="lightbulb-outline" size={24} color="#EAFF08" />
              <Text style={styles.insightText}>
                Você reduziu suas dívidas em 25% este mês. Continue assim!
              </Text>
            </View>
            <View style={styles.insightItem}>
              <MaterialIcons name="lightbulb-outline" size={24} color="#EAFF08" />
              <Text style={styles.insightText}>
                Você está a 15% de alcançar sua meta mensal. Aumente seus investimentos!
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Menu Lateral */}
      <SidebarNavigation
        currentPage="home"
        isVisible={isSidebarVisible}
        onToggle={toggleSidebar}
      />

      {/* Botão de Atualizar */}
      <Pressable
        style={styles.refreshButton}
        onPress={refreshData}
      >
        <MaterialIcons name="refresh" size={28} color="#FFF" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5028c6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(80, 40, 198, 0.9)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10,
  },
  menuButton: {
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#EAFF08',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    marginTop: 15,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 0,
    gap: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    width: '48%',
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  debtCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF5252',
  },
  balanceCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  goalCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  performanceCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  cardIcon: {
    marginRight: 12,
  },
  cardTitle: {
    color: '#EAFF08',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 5,
  },
  cardValue: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  chartTitle: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
  },
  chartWrapper: {
    minHeight: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    overflow: 'hidden',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAFF08',
    borderRadius: 15,
    padding: 15,
    gap: 10,
  },
  actionText: {
    color: '#5028C6',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
  },
  insightsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  insightsTitle: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    gap: 10,
  },
  insightText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
    flex: 1,
    lineHeight: 20,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default HomeScreen;