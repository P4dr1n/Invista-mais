import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

const { width } = Dimensions.get('window');

interface NavigationSquareProps {
  currentPage?: string;
}

const NavigationSquare: React.FC<NavigationSquareProps> = ({ currentPage }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  interface NavigationItem {
    id: string;
    label: string;
    route: keyof RootStackParamList; // Rota deve ser uma chave válida
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    icon: string;
  }
  const navigationItems: NavigationItem[] = [
    { 
      id: 'home', 
      label: 'HOME', 
      route: 'Home',
      position: 'top-left',
      icon: '🏠'
    },
    { 
      id: 'perfil', 
      label: 'PERFIL', 
      route: 'perfil',
      position: 'top-right',
      icon: '👤'
    },
    { 
      id: 'planos', 
      label: 'PLANOS', 
      route: 'planos',
      position: 'bottom-left',
      icon: '📋'
    },
    { 
      id: 'configuracoes', 
      label: 'CONFIG', 
      route: 'configuracoes',
      position: 'bottom-right',
      icon: '⚙️'
    }
  ];

  const handleNavigation = (route: keyof RootStackParamList) => {
    if (route !== currentPage) {
      navigation.navigate(route); // Remove a asserção de tipo
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationGrid}>
        {navigationItems.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.navButton,
              styles[item.position as keyof Pick<typeof styles, 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>],
              currentPage === item.id && styles.activeButton
            ]}
            onPress={() => handleNavigation(item.route)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={[
              styles.label,
              currentPage === item.id && styles.activeLabel
            ]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
        
        {/* Centro do quadrado - logo ou informação */}
        <View style={styles.centerElement}>
          <Text style={styles.centerText}>INVISTA+</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  navigationGrid: {
    width: width * 0.8,
    height: width * 0.8,
    maxWidth: 300,
    maxHeight: 300,
    position: 'relative',
  },
  navButton: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  'top-left': {
    top: 0,
    left: 0,
  },
  'top-right': {
    top: 0,
    right: 0,
  },
  'bottom-left': {
    bottom: 0,
    left: 0,
  },
  'bottom-right': {
    bottom: 0,
    right: 0,
  },
  activeButton: {
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
    borderColor: '#eaff08',
    transform: [{ scale: 1.05 }],
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  label: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activeLabel: {
    color: '#eaff08',
  },
  centerElement: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -20 }],
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(80, 40, 198, 0.8)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  centerText: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default NavigationSquare;