import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

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
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const sidebarWidth = Math.min(windowWidth * 0.8, 300);
  
  // Use ref for animation to prevent memory leaks
  const slideAnim = useRef(new Animated.Value(isVisible ? 0 : -sidebarWidth)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isMounted = useRef(true);

  // Handle animation with cleanup
  useEffect(() => {
    isMounted.current = true;
    
    if (animationRef.current) {
      animationRef.current.stop();
    }

    animationRef.current = Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -sidebarWidth,
      duration: 300,
      useNativeDriver: true,
    });

    animationRef.current.start(({ finished }) => {
      if (finished) animationRef.current = null;
    });

    return () => {
      isMounted.current = false;
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [isVisible, sidebarWidth]);

  const navigationItems = [
    { id: 'planos', label: 'PLANOS', route: 'planos' },
    { id: 'home', label: 'HOME', route: 'home' },
    { id: 'perfil', label: 'PERFIL', route: 'perfil' },
    { id: 'faq', label: 'AJUDA / FAQ', route: 'faq' },
    { id: 'configuracoes', label: 'CONFIGURAÇÕES', route: 'configuracoes' },
    { id: 'gastos', label: 'CONTROLE\nGASTOS', route: 'gastos' }
  ];

  // Safe navigation handler with mobile-specific checks
  const handleNavigation = useCallback((route: string) => {
    try {
      // Mobile-specific navigation safety
      if (!navigation.isFocused() || !isMounted.current) return;
      
      if (route !== currentPage) {
        // Reset navigation stack to prevent buildup
        navigation.reset({
          index: 0,
          routes: [{ name: route as keyof RootStackParamList }],
        });
      }
    } catch (error) {
      console.error('Mobile navigation error:', error);
    } finally {
      if (onToggle && isMounted.current) {
        onToggle();
      }
    }
  }, [currentPage, navigation, onToggle]);

  return (
    <>
      {/* Mobile-optimized overlay */}
      {isVisible && (
        <Pressable 
          style={[styles.overlay, { height: windowHeight }]} 
          onPress={onToggle}
        />
      )}
      
      {/* Sidebar with mobile-safe dimensions */}
      <Animated.View 
        style={[
          styles.container,
          {
            width: sidebarWidth,
            height: windowHeight,
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
                  android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
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
          </View>
        </LinearGradient>
      </Animated.View>
    </>
  );
};

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
  gradient: {
    flex: 1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  content: {
    flex: 1,
    paddingTop: 0,
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
    overflow: 'hidden', // For Android ripple effect
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