import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

const { width } = Dimensions.get('window');

const MenuLateral = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const menuItems = [
    { title: 'Home', screen: 'Home' },
    { title: 'Perfil', screen: 'Perfil' },
    { title: 'Configurações', screen: 'Configuracoes' },
    { title: 'Ajuda', screen: 'AjudaFaq' },
    { title: 'Sair', screen: 'Login' },
  ];

  return (
    <>
      {/* Ícone do Menu Hambúrguer */}
      <Pressable 
        style={styles.menuButton}
        onPress={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </Pressable>

      {/* Overlay quando menu aberto */}
      {isMenuOpen && (
        <Pressable 
          style={styles.overlay}
          onPress={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu Lateral */}
      <View style={[styles.menuContainer, { left: isMenuOpen ? 0 : -250 }]}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Menu</Text>
          <Pressable onPress={() => setIsMenuOpen(false)}>
            <Text style={styles.closeIcon}>×</Text>
          </Pressable>
        </View>

        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate(item.screen);
              setIsMenuOpen(false);
            }}
          >
            <Text style={styles.menuItemText}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
    padding: 10,
    backgroundColor: '#5028c6',
    borderRadius: 8,
  },
  menuIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#5028c6',
    zIndex: 3,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    paddingBottom: 15,
  },
  menuTitle: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'KronaOne-Regular',
  },
  closeIcon: {
    color: '#FFF',
    fontSize: 36,
    lineHeight: 36,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff30',
  },
  menuItemText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'KronaOne-Regular',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
  },
});

export default MenuLateral;