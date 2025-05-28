import * as React from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView,
  Pressable
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from "@react-navigation/native";
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';

const GASTOS = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
  
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        style={styles.gradient} 
        locations={[0, 0.5, 1]} 
        colors={['#5028c6','#6f54c3','#b3b0bc']} 
        
      >
        <SidebarNavigation
          currentPage="gastos"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
        {/* Header */}
        <View style={styles.header}>
          <MenuToggleButton onPress={toggleSidebar} />
          <Text style={styles.headerTitle}>CONTROLE DE GASTOS</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Saldo Disponível */}
          <View style={styles.card}>
            <Text style={[styles.label, styles.green]}>SALDO DISPONIVEL:</Text>
            <Text style={[styles.value, styles.green]}>{financialData.saldoDisponivel}</Text>
          </View>

          {/* Saldo Guardado */}
          <View style={styles.card}>
            <Text style={[styles.label, styles.green]}>SALDO GUARDADO:</Text>
            <Text style={[styles.value, styles.green]}>{financialData.saldoGuardado}</Text>
          </View>

          {/* Dívida Mensal */}
          <View style={styles.card}>
            <Text style={[styles.label, styles.red]}>DIVIDA MENSAL:</Text>
            <Text style={[styles.value, styles.red]}>{financialData.dividaMensal}</Text>
          </View>

          {/* Dívida Extra */}
          <View style={styles.card}>
            <Text style={[styles.label, styles.red]}>DIVIDA EXTRA:</Text>
            <Text style={[styles.value, styles.red]}>{financialData.dividaExtra}</Text>
          </View>

          {/* Renda Mensal */}
          <View style={styles.card}>
            <Text style={styles.label}>RENDA MENSAL:</Text>
            <Text style={styles.value}>{financialData.rendaMensal}</Text>
          </View>

          {/* Renda Extra */}
          <View style={styles.card}>
            <Text style={styles.label}>RENDA EXTRA:</Text>
            <Text style={styles.value}>{financialData.rendaExtra}</Text>
          </View>

          {/* Meta */}
          <View style={styles.card}>
            <Text style={[styles.label, styles.blue]}>META:</Text>
            <Text style={[styles.value, styles.blue]}>{financialData.meta}</Text>
          </View>

          
        </ScrollView>

        {/* Botão de Logout */}
       

        {/* Menu Lateral */}
        <SidebarNavigation
          currentPage="gastos"
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
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: 'rgba(217, 217, 217, 0.45)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportCard: {
    backgroundColor: 'rgba(217, 217, 217, 0.65)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    height: 189,
  },
  label: {
    color: '#000',
    fontFamily: 'KronaOne-Regular',
    fontSize: 16,
  },
  value: {
    color: '#000',
    fontFamily: 'KronaOne-Regular',
    fontSize: 16,
    fontWeight: 'bold',
  },
  green: {
    color: '#058b0c',
  },
  red: {
    color: '#ff0000',
  },
  blue: {
    color: '#0d00ff',
  },
  reportLabel: {
    color: '#fff',
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
    marginBottom: 10,
  },
  chartPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 16,
  },
});

export default GASTOS;