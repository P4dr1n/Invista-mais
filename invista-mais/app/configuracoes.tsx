import * as React from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  SafeAreaView,
  ScrollView
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types/types';
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';

const Configuracoes = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <LinearGradient
      colors={['#5028c6', '#a298b5']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <SidebarNavigation
          currentPage="configuracoes"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Image
             // Substitua pela sua imagem
            style={styles.profileImage}
          />
          <Text style={styles.headerTitle}>CONFIGURAÇÕES</Text>
        </View>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>CONFIGURAÇÕES:</Text>

        {/* Lista de opções */}
       <ScrollView contentContainerStyle={styles.optionsContainer}>
          {[
            { label: 'AJUDA / FAQ', onPress: () => navigation.navigate('faq') },
            { label: 'CONTROLE DE PRIVACIDADE', onPress: () => navigation.navigate('Privacidade') },
            { label: 'SAIR DO USUÁRIO', onPress: () => navigation.navigate('login') },
          ].map((item, index) => (
            <Pressable key={index} onPress={item.onPress} style={styles.buttonOption}>
              <Text style={styles.buttonText}>{item.label}</Text>
            </Pressable>
          ))}
        </ScrollView>


        {/* Botão voltar */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            // Ícone de voltar
            style={styles.backIcon}
          />
        </Pressable>
        <SidebarNavigation
          currentPage="configuracoes"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'KronaOne-Regular',
  },
  subtitle: {
    textAlign: 'center',
    color: 'yellow',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'KronaOne-Regular',
  },
  optionsContainer: {
    paddingHorizontal: 30,
  },
  option: {
    marginBottom: 25,
  },
  optionText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'KronaOne-Regular',
  },
  buttonOption: {
  backgroundColor: '#4F29C4',
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderRadius: 30,
  marginBottom: 20,
  alignItems: 'center',
  elevation: 4, // sombra Android
  shadowColor: '#000', // sombra iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},
buttonText: {
  color: '#FFF',
  fontSize: 16,
  fontFamily: 'KronaOne-Regular',
},

  line: {
    height: 1,
    backgroundColor: '#FFF',
    marginTop: 8,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#FFF',
  },
});

export default Configuracoes;
