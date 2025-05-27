import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from "@react-navigation/native";
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';

// Importe suas imagens corretamente (exemplo com require)

// Componente temporário para seta (substitua pelo seu componente real)
const Arrowdowncircle = ({ width, height }: { width: number; height: number }) => (
  <View style={{ width, height, backgroundColor: 'transparent' }} />
);

const PERFIL = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSidebarVisible, setIsSidebarVisible] = React.useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
                  <MenuToggleButton onPress={toggleSidebar} />
                  <Text style={styles.headerTitle}>Resumo Financeiro</Text>
                  <View style={styles.headerSpacer} />
                </View>
                <SidebarNavigation
          currentPage="perfil"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
      <View style={styles.headerContainer}>
        <Pressable style={styles.profileImageWrapper}>
          <Image 
            style={styles.profileImage} 
            resizeMode="cover" 
            
          />
        </Pressable>
        
        <Text style={styles.title}>PERFIL</Text>
        
        <Pressable style={styles.settingsButton}>
          <Image 
            style={styles.icon} 
            resizeMode="cover" 
            
          />
        </Pressable>
        
        <Image 
          style={styles.ellipse} 
          resizeMode="cover" 
         
        />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Pressable style={[styles.button, styles.editProfileButton]}>
            <Text style={styles.buttonText}>EDITA PERFIL</Text>
          </Pressable>
          
          <View style={[styles.button, styles.brokerSection]}>
            <Text style={styles.buttonText}>CORRETORA DE USO:</Text>
            <Arrowdowncircle width={36} height={43} />
          </View>
          
          <View style={[styles.button, styles.investmentProfile]}>
            <Text style={styles.buttonText}>PERFIL DE INVESTIMENTOS</Text>
          </View>
        </View>

        <Text style={styles.profileType}>CUIDADOSO</Text>
      </View>
      
      
      <Pressable 
        style={styles.logoutButton} 
        onPress={() => navigation.goBack()}
        
      >
        <Image 
          style={styles.icon} 
          resizeMode="cover" 
          
        />
        
      </Pressable>
       {/* Menu Lateral */}
       <SidebarNavigation
          currentPage="perfil"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
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
  profileImageWrapper: {
    width: 82,
    height: 73,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#000',
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    width: 48,
    height: 48,
  },
  ellipse: {
    width: 156,
    height: 123,
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 46,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  editProfileButton: {
    width: 203,
    height: 62,
  },
  brokerSection: {
    width: '100%',
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  investmentProfile: {
    width: '100%',
    height: 62,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'KronaOne-Regular',
    fontSize: 16,
  },
  profileType: {
    color: '#0551FF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 56,
    height: 50,
  },
});

export default PERFIL;