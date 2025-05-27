import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

const { height, width } = Dimensions.get('window');

interface SidebarNavigationProps {
  currentPage?: string;
  isVisible?: boolean;
  onToggle?: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  currentPage, 
  isVisible = false, 
  onToggle 
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [slideAnim] = useState(new Animated.Value(isVisible ? 0 : -width * 0.8));

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -width * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const navigationItems = [
    { id: 'planos', label: 'PLANOS', route: 'planos' },
    { id: 'home', label: 'HOME', route: 'home' },
    { id: 'perfil', label: 'PERFIL', route: 'perfil' },
    { id: 'faq', label: 'AJUDA / FAQ', route: 'faq' },
    { id: 'configuracoes', label: 'CONFIGURAÇÕES', route: 'configuracoes' }
  ];

  const handleNavigation = (route: string) => {
    if (route !== currentPage) {
      navigation.navigate(route);
    }
    onToggle?.();
  };

  const handleBack = () => {
    onToggle?.();
  };

  return (
    <>
      {/* Overlay */}
      {isVisible && (
        <Pressable 
          style={styles.overlay} 
          onPress={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <LinearGradient
          colors={['#7B3FE4', '#5028C6', '#B3B0BC']}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Menu Items */}
            <View style={styles.menuContainer}>
              {navigationItems.map((item, index) => (
                <Pressable
                  key={item.id}
                  style={[
                    styles.menuItem,
                    currentPage === item.id && styles.activeMenuItem,
                    index === 0 && styles.firstMenuItem
                  ]}
                  onPress={() => handleNavigation(item.route)}
                >
                  <Text style={[
                    styles.menuText,
                    currentPage === item.id && styles.activeMenuText
                  ]}>
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Back Button */}
            <Pressable 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Text style={styles.backIcon}>←</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Animated.View>
    </>
  );
};

// Componente do botão para abrir o menu
export const MenuToggleButton: React.FC<{ onPress: () => void; style?: any }> = ({ 
  onPress, 
  style 
}) => (
  <Pressable style={[styles.toggleButton, style]} onPress={onPress}>
    <View style={styles.hamburgerLine} />
    <View style={styles.hamburgerLine} />
    <View style={styles.hamburgerLine} />
  </Pressable>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.8,
    maxWidth: 300,
    height: height,
    zIndex: 999,
  },
  gradient: {
    flex: 1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 40,
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 8,
    borderRadius: 15,
    minHeight: 70,
    justifyContent: 'center',
  },
  firstMenuItem: {
    marginTop: 0,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderLeftWidth: 4,
    borderLeftColor: '#EAFF08',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  activeMenuText: {
    color: '#EAFF08',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Estilos para o botão toggle
  toggleButton: {
    width: 40,
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

export default SidebarNavigation;