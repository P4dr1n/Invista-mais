import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

interface FloatingNavigationProps {
  currentPage?: string;
}

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({ currentPage }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigationItems = [
    { id: 'home', label: 'HOME', route: 'home', icon: '🏠' },
    { id: 'perfil', label: 'PERFIL', route: 'perfil', icon: '👤' },
    { id: 'planos', label: 'PLANOS', route: 'planos', icon: '📋' },
    { id: 'configuracoes', label: 'CONFIG', route: 'configuracoes', icon: '⚙️' }
  ];

  const handleNavigation = (route: string) => {
    if (route !== currentPage) {
      navigation.navigate(route as keyof RootStackParamList);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        {navigationItems.map((item, index) => (
          <Pressable
            key={item.id}
            style={[
              styles.navButton,
              currentPage === item.id && styles.activeButton,
              // Posicionamento em grade 2x2
              {
                top: Math.floor(index / 2) * 70,
                left: (index % 2) * 70,
              }
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  navigationContainer: {
    width: 140,
    height: 140,
    position: 'relative',
  },
  navButton: {
    position: 'absolute',
    width: 65,
    height: 65,
    backgroundColor: 'rgba(80, 40, 198, 0.9)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  activeButton: {
    backgroundColor: 'rgba(234, 255, 8, 0.9)',
    borderColor: '#eaff08',
    transform: [{ scale: 1.1 }],
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  label: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activeLabel: {
    color: '#5028c6',
  },
});

export default FloatingNavigation;