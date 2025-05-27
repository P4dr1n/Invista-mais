import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import VerticalMenuNavigation from '../components/VerticalMenuNavigation';

interface MenuToggleProps {
  currentPage?: string;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ currentPage }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      {/* Botão para abrir o menu */}
      <Pressable 
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <View style={styles.hamburger}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </Pressable>

      {/* Modal com o menu */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuWrapper}>
            <VerticalMenuNavigation 
              currentPage={currentPage}
              onClose={() => setMenuVisible(false)}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

// Exemplo de como usar na página Home
const HomeWithMenu = () => {
  return (
    <LinearGradient 
      style={styles.container}
      colors={['#5028c6', '#603ec5', '#b3b0bc']}
      locations={[0, 0.5, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}  
    >
      {/* Seu conteúdo da página aqui */}
      <View style={styles.content}>
        <Text style={styles.title}>HOME</Text>
        <Text style={styles.subtitle}>Resumo Financeiro</Text>
        
        {/* Cards de exemplo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dívida Atual</Text>
          <Text style={styles.cardValue}>R$ 1.200,00</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Saldo Atual</Text>
          <Text style={styles.cardValue}>R$ 1.500,00</Text>
        </View>
      </View>

      {/* Menu Toggle */}
      <MenuToggle currentPage="home" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 5,
  },
  cardValue: {
    color: '#EAFF08',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  hamburger: {
    gap: 4,
  },
  line: {
    width: 20,
    height: 3,
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuWrapper: {
    flex: 1,
  },
});

export default HomeWithMenu;