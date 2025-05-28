import * as React from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  Pressable,
  ActivityIndicator
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from "@react-navigation/native";
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';
import { MaterialIcons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const GASTOS = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  // Dados de exemplo (substituir com dados reais)
  const financialData = {
    saldoDisponivel: "R$ 5.000,00",
    saldoGuardado: "R$ 10.000,00",
    dividaMensal: "R$ 1.200,00",
    dividaExtra: "R$ 500,00",
    rendaMensal: "R$ 7.000,00",
    rendaExtra: "R$ 1.000,00",
    meta: "R$ 20.000,00"
  };

  // Dados para o gráfico de pizza
  const chartData = [
    {
      name: "Moradia",
      amount: 2000,
      color: "#FF6384",
      legendFontColor: "#FFF",
      legendFontSize: 12
    },
    {
      name: "Alimentação",
      amount: 1500,
      color: "#36A2EB",
      legendFontColor: "#FFF",
      legendFontSize: 12
    },
    {
      name: "Transporte",
      amount: 1000,
      color: "#FFCE56",
      legendFontColor: "#FFF",
      legendFontSize: 12
    },
    {
      name: "Lazer",
      amount: 800,
      color: "#4BC0C0",
      legendFontColor: "#FFF",
      legendFontSize: 12
    },
    {
      name: "Saúde",
      amount: 600,
      color: "#9966FF",
      legendFontColor: "#FFF",
      legendFontSize: 12
    }
  ];

  const refreshData = () => {
    setLoading(true);
    // Simulação de carregamento de dados
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <MenuToggleButton onPress={toggleSidebar} style={styles.menuButton} />
        <Text style={styles.headerTitle}>CONTROLE DE GASTOS</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EAFF08" />
          <Text style={styles.loadingText}>Atualizando dados...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Cards de Resumo */}
          <View style={styles.summaryCards}>
            <View style={[styles.summaryCard, styles.incomeCard]}>
              <MaterialIcons name="attach-money" size={24} color="#4CAF50" />
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>RECEITAS TOTAIS</Text>
                <Text style={styles.summaryValue}>R$ 8.000,00</Text>
              </View>
            </View>
            
            <View style={[styles.summaryCard, styles.expenseCard]}>
              <MaterialIcons name="money-off" size={24} color="#FF5252" />
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>DESPESAS TOTAIS</Text>
                <Text style={styles.summaryValue}>R$ 1.700,00</Text>
              </View>
            </View>
          </View>

          {/* Gráfico de Gastos */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>DISTRIBUIÇÃO DE GASTOS</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={chartData}
                width={Dimensions.get('window').width - 80}
                height={220}
                chartConfig={{
                  backgroundColor: '#5028c6',
                  backgroundGradientFrom: '#5028c6',
                  backgroundGradientTo: '#6f54c3',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hasLegend={true}
              />
            </View>
          </View>

          {/* Detalhamento de Gastos */}
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>DETALHAMENTO FINANCEIRO</Text>
            
            <View style={styles.detailItem}>
              <MaterialIcons name="account-balance-wallet" size={24} color="#4CAF50" style={styles.detailIcon} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Saldo Disponível</Text>
                <Text style={[styles.detailValue, styles.green]}>{financialData.saldoDisponivel}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialIcons name="savings" size={24} color="#4CAF50" style={styles.detailIcon} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Saldo Guardado</Text>
                <Text style={[styles.detailValue, styles.green]}>{financialData.saldoGuardado}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialIcons name="credit-card" size={24} color="#FF5252" style={styles.detailIcon} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Dívida Mensal</Text>
                <Text style={[styles.detailValue, styles.red]}>{financialData.dividaMensal}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialIcons name="error" size={24} color="#FF5252" style={styles.detailIcon} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Dívida Extra</Text>
                <Text style={[styles.detailValue, styles.red]}>{financialData.dividaExtra}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialIcons name="work" size={24} color="#2196F3" style={styles.detailIcon} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Renda Mensal</Text>
                <Text style={styles.detailValue}>{financialData.rendaMensal}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialIcons name="redeem" size={24} color="#2196F3" style={styles.detailIcon} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Renda Extra</Text>
                <Text style={styles.detailValue}>{financialData.rendaExtra}</Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <MaterialIcons name="flag" size={24} color="#FFC107" style={styles.detailIcon} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Meta</Text>
                <Text style={[styles.detailValue, styles.yellow]}>{financialData.meta}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Botão de Adicionar Gasto */}
      <Pressable 
        style={styles.addButton}
        onPress={() => navigation.navigate('AdicionarGasto')}
      >
        <MaterialIcons name="add" size={32} color="#5028C6" />
      </Pressable>

      {/* Menu Lateral */}
      <SidebarNavigation
        currentPage="gastos"
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
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 15,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  incomeCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  expenseCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF5252',
  },
  summaryText: {
    marginLeft: 10,
  },
  summaryLabel: {
    color: '#EAFF08',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
  },
  chartCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  chartTitle: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  detailsTitle: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailIcon: {
    marginRight: 15,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
  green: {
    color: '#4CAF50',
  },
  red: {
    color: '#FF5252',
  },
  yellow: {
    color: '#FFC107',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EAFF08',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 20,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
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

export default GASTOS;