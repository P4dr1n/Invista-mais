import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import FloatingNavigation from '../components/FloatingNavigation';
import { RootStackParamList } from '../types/types';
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';

// Importe os SVGs corretamente (exemplo genérico)
const Group49 = () => <View style={styles.svgLine} />;
const Group50 = () => <View style={styles.svgLine} />;
const Group51 = () => <View style={styles.svgLine} />;
const Group511 = () => <View style={styles.svgLine} />;

const Configuracoes = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
      const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
      };
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
                  <MenuToggleButton onPress={toggleSidebar} />
                  <Text style={styles.headerTitle}></Text>
                  <View style={styles.headerSpacer} />
                </View>
                <SidebarNavigation
          currentPage="configuracoes"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          resizeMode="cover"
          
        />
        <Text style={styles.title}>CONFIGURAÇÕES</Text>
      </View>

      {/* Opções de Configuração */}
      <View style={styles.content}>
        <Pressable style={styles.option} onPress={() => {}}>
          <Text style={styles.optionText}>AJUDA/FAQ</Text>
          <Group49 />
        </Pressable>

        <Pressable style={styles.option} onPress={() => {}}>
          <Text style={styles.optionText}>DELETAR USUÁRIO</Text>
          <Group50 />
        </Pressable>

        <Pressable 
          style={styles.option} 
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.optionText}>SAIR DO USUÁRIO</Text>
          <Group51 />
        </Pressable>

        <Pressable style={styles.option} onPress={() => {}}>
          <Text style={styles.optionText}>CONTROLE DE PRIVACIDADE</Text>
          <Group511 />
        </Pressable>
      </View>

      {/* Botão de Logout */}
      <Pressable 
        style={styles.logoutButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.logoutIcon}
          resizeMode="contain"
          
        />
      </Pressable>
      {/* Menu Lateral */}
      <SidebarNavigation
          currentPage="configuracoes"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5028c6',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
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
  profileImage: {
    width: 82,
    height: 73,
    borderRadius: 8,
    marginRight: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
  },
  content: {
    flex: 1,
    gap: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  optionText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
  },
  svgLine: {
    height: 2,
    backgroundColor: '#FFF',
    width: '100%',
  },
  logoutButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  logoutIcon: {
    width: 56,
    height: 50,
  },
});

export default Configuracoes;