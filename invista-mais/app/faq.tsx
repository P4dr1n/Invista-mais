import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View, SafeAreaView } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../types/types';
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';

// Componentes SVG temporários - substitua pelos reais
const Group49 = () => <View style={styles.separator} />;
const Group50 = () => <View style={styles.separator} />;

const AjudaFaq = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
   const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
    const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
    };
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          resizeMode="contain"
          
        />
        <View style={styles.header}>
                  <MenuToggleButton onPress={toggleSidebar} />
                  <Text style={styles.headerTitle}></Text>
                  <View style={styles.headerSpacer} />
                </View>
                <SidebarNavigation
          currentPage="faq"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
        <Text style={styles.title}>AJUDA / FAQ</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPORTE</Text>
          <Group49 />
          
          <Pressable style={styles.item}>
            <Text style={styles.text}>Central de Atendimento</Text>
            <Text style={styles.detail}>contato@invista.com.br</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DÚVIDAS FREQUENTES</Text>
          <Group50 />
          
          <Pressable style={styles.item}>
            <Text style={styles.text}>Como investir?</Text>
          </Pressable>
          
          <Pressable style={styles.item}>
            <Text style={styles.text}>Políticas de segurança</Text>
          </Pressable>
        </View>
      </View>

      {/* Botão de Voltar */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backIcon}
          resizeMode="contain"
         
        />
      </Pressable>
       {/* Menu Lateral */}
       <SidebarNavigation
          currentPage="faq"
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
    marginBottom: 30,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    color: '#eaff08',
    fontSize: 20,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
  },
  separator: {
    height: 2,
    backgroundColor: '#FFF',
    marginVertical: 15,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff30',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
  detail: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 5,
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    padding: 10,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
});

export default AjudaFaq;