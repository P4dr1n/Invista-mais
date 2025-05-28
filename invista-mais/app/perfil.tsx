import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import SidebarNavigation, { MenuToggleButton } from "../components/VerticalMenuNavigation";
import { MaterialIcons } from '@expo/vector-icons';

const PerfilScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    birthDate: "15/01/1990",
    investmentProfile: "Moderado",
    lastLogin: "25/10/2023 às 14:30",
    portfolioValue: "R$ 15.230,75",
    profitability: "+12,5%"
  });

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  // Simulação de carregamento de dados
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setUserData({
        ...userData,
        portfolioValue: "R$ 15.650,20",
        profitability: "+13,2%"
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <MenuToggleButton onPress={toggleSidebar} style={styles.menuButton} />
        <Text style={styles.headerTitle}>PERFIL</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EAFF08" />
          <Text style={styles.loadingText}>Atualizando dados...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Seção do Perfil */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImagePlaceholder}>
                <MaterialIcons name="person" size={50} color="#5028C6" />
              </View>
              <Pressable style={styles.editPhotoButton}>
                <MaterialIcons name="edit" size={18} color="#5028C6" />
              </Pressable>
            </View>
            
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userData.portfolioValue}</Text>
                <Text style={styles.statLabel}>Patrimônio</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userData.profitability}</Text>
                <Text style={styles.statLabel}>Rentabilidade</Text>
              </View>
            </View>
          </View>

          {/* Informações Pessoais */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>INFORMAÇÕES PESSOAIS</Text>
            <View style={styles.separator} />
            
            <View style={styles.infoItem}>
              <MaterialIcons name="person-outline" size={24} color="#EAFF08" style={styles.icon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Nome Completo</Text>
                <Text style={styles.infoValue}>{userData.name}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="email" size={24} color="#EAFF08" style={styles.icon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>E-mail</Text>
                <Text style={styles.infoValue}>{userData.email}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="assignment" size={24} color="#EAFF08" style={styles.icon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>CPF</Text>
                <Text style={styles.infoValue}>{userData.cpf}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="phone" size={24} color="#EAFF08" style={styles.icon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Telefone</Text>
                <Text style={styles.infoValue}>{userData.phone}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="cake" size={24} color="#EAFF08" style={styles.icon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Data de Nascimento</Text>
                <Text style={styles.infoValue}>{userData.birthDate}</Text>
              </View>
            </View>
          </View>

          {/* Informações Financeiras */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>INFORMAÇÕES FINANCEIRAS</Text>
            <View style={styles.separator} />
            
            <View style={styles.infoItem}>
              <MaterialIcons name="bar-chart" size={24} color="#EAFF08" style={styles.icon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Perfil de Investimento</Text>
                <Text style={styles.infoValue}>{userData.investmentProfile}</Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="history" size={24} color="#EAFF08" style={styles.icon} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Último Acesso</Text>
                <Text style={styles.infoValue}>{userData.lastLogin}</Text>
              </View>
            </View>
          </View>

          {/* Botões de Ação */}
          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('EditarPerfil')}
          >
            <MaterialIcons name="edit" size={24} color="#5028C6" style={styles.actionIcon} />
            <Text style={styles.actionButtonText}>EDITAR PERFIL</Text>
          </Pressable>
          
          <Pressable 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AlterarSenha')}
          >
            <MaterialIcons name="lock" size={24} color="#5028C6" style={styles.actionIcon} />
            <Text style={styles.actionButtonText}>ALTERAR SENHA</Text>
          </Pressable>

          {/* Corretoras */}
          <Pressable 
            style={styles.brokerButton}
            onPress={() => navigation.navigate('SelecionarCorretora')}
          >
            <MaterialIcons name="account-balance" size={24} color="#5028C6" style={styles.brokerIcon} />
            <Text style={styles.brokerButtonText}>CORRETORAS ASSOCIADAS</Text>
            <MaterialIcons name="chevron-right" size={24} color="#5028C6" />
          </Pressable>
        </ScrollView>
      )}

      {/* Menu Lateral */}
      <SidebarNavigation
        currentPage="perfil"
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
    fontSize: 22,
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAFF08',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#EAFF08',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#EAFF08',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    marginBottom: 5,
  },
  userEmail: {
    color: '#DDD',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 5,
  },
  statLabel: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardTitle: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
  },
  separator: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    marginRight: 15,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    color: '#EAFF08',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 3,
  },
  infoValue: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAFF08',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  actionIcon: {
    marginRight: 15,
  },
  actionButtonText: {
    color: '#5028C6',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    flex: 1,
  },
  brokerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 255, 8, 0.5)',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  brokerIcon: {
    marginRight: 15,
  },
  brokerButtonText: {
    color: '#5028C6',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    flex: 1,
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

export default PerfilScreen;