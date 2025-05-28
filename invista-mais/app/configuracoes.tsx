import * as React from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../types/types';
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';
import { MaterialIcons } from '@expo/vector-icons';

const Configuracoes = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const handleLogout = () => {
    setLoading(true);
    // Simulação de processo de logout
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('login');
    }, 1500);
  };

  const settingsOptions = [
    { 
      icon: "help-outline", 
      label: "AJUDA / FAQ", 
      onPress: () => navigation.navigate('faq') 
    },
    { 
      icon: "security", 
      label: "CONTROLE DE PRIVACIDADE", 
      
    },
    { 
      icon: "notifications", 
      label: "NOTIFICAÇÕES", 
      
    },
    { 
      icon: "account-circle", 
      label: "GERENCIAR CONTA", 
      onPress: () => navigation.navigate('editarPerfil') 
    },
    { 
      icon: "lock", 
      label: "ALTERAR SENHA", 
      
    },
    { 
      icon: "palette", 
      label: "APARÊNCIA", 
      
    },
    { 
      icon: "logout", 
      label: "SAIR DO USUÁRIO", 
      onPress: handleLogout,
      color: "#FF5252"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <MenuToggleButton onPress={toggleSidebar} style={styles.menuButton} />
        <Text style={styles.headerTitle}>CONFIGURAÇÕES</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EAFF08" />
          <Text style={styles.loadingText}>Saindo...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {/* Perfil Rápido */}
          <View style={styles.profileCard}>
            <View style={styles.profileImagePlaceholder}>
              <MaterialIcons name="person" size={40} color="#5028C6" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Maria Silva</Text>
              <Text style={styles.profileEmail}>maria.silva@email.com</Text>
            </View>
            <Pressable 
              style={styles.editButton}
              onPress={() => navigation.navigate('editarPerfil')}
            >
              <MaterialIcons name="edit" size={20} color="#5028C6" />
            </Pressable>
          </View>

          {/* Configurações Gerais */}
          <Text style={styles.sectionTitle}>CONFIGURAÇÕES GERAIS</Text>
          
          <View style={styles.optionsCard}>
            {settingsOptions.map((option, index) => (
              <Pressable 
                key={index} 
                onPress={option.onPress} 
                style={styles.optionItem}
              >
                <View style={styles.optionLeft}>
                  <MaterialIcons 
                    name={option.icon as any} 
                    size={24} 
                    color={option.color || "#EAFF08"} 
                  />
                  <Text style={[styles.optionText, { color: option.color || "#FFF" }]}>
                    {option.label}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#EAFF08" />
              </Pressable>
            ))}
          </View>

          {/* Informações do App */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>INFORMAÇÕES DO APLICATIVO</Text>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Versão</Text>
              <Text style={styles.infoValue}>1.2.0</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Desenvolvedor</Text>
              <Text style={styles.infoValue}>Invista Solutions</Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Menu Lateral */}
      <SidebarNavigation
        currentPage="configuracoes"
        isVisible={isSidebarVisible}
        onToggle={toggleSidebar}
      />

      {/* Botão de Voltar */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={28} color="#FFF" />
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EAFF08',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#DDD',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
    marginLeft: 5,
  },
  optionsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    marginLeft: 15,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  infoTitle: {
    color: '#EAFF08',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
  },
  infoValue: {
    color: '#EAFF08',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
  },
  backButton: {
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

export default Configuracoes;