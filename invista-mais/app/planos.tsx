import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';
import { LinearGradient } from 'expo-linear-gradient';

const PlanosScreen = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const plans = [
    { id: 'A', title: "PLANO A", subtitle: "FII's", color: '#4F29C4' },
    { id: 'B', title: "PLANO B", subtitle: "CDBs", color: '#3B0CC8' },
    { id: 'C', title: "PLANO C", subtitle: "Ações", color: '#694CBF' },
    { id: 'D', title: "PLANO D", subtitle: "Criptomoedas", color: '#9E97B3' },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <LinearGradient
      colors={['#5028c6', '#603ec5', '#b3b0bc']}
      locations={[0, 0.5, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      <SidebarNavigation
          currentPage="planos"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <MenuToggleButton onPress={toggleSidebar} />
        <Text style={styles.headerTitle}>ESCOLHA DO PLANO</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              selectedPlan === plan.id && styles.selectedPlan,
              { backgroundColor: plan.color }
            ]}
            onPress={() => handleSelectPlan(plan.id)}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planId}>{plan.id}</Text>
              <Text style={styles.planTitle}>{plan.title}</Text>
            </View>
            <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
            
            {selectedPlan === plan.id && (
              <View style={styles.selectedIndicator}>
                <Text style={styles.selectedText}>SELECIONADO</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Botão de confirmação */}
        {selectedPlan && (
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>CONFIRMAR ESCOLHA</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Menu Lateral */}
      <SidebarNavigation
        currentPage="planos"
        isVisible={isSidebarVisible}
        onToggle={toggleSidebar}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50, // Espaço para a status bar
    paddingBottom: 15,
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
  content: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  planId: {
    fontSize: 32,
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    marginRight: 15,
  },
  planTitle: {
    fontSize: 22,
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    flex: 1,
  },
  planSubtitle: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    marginLeft: 15,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  selectedText: {
    color: '#4F29C4',
    fontFamily: 'KronaOne-Regular',
    fontSize: 12,
  },
  confirmButton: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  confirmButtonText: {
    color: '#4F29C4',
    fontFamily: 'KronaOne-Regular',
    fontSize: 16,
  },
});

export default PlanosScreen;