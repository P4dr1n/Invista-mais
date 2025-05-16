import * as React from "react";
import { Image, StyleSheet, Text, Pressable, View, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from "@react-navigation/native";

// Interface para props dos componentes SVG
interface SVGProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

// Componentes SVG com tipagem adequada
const Group49: React.FC<SVGProps> = ({ width, height, style }) => (
  <View style={[styles.svgLine, { width, height }, style]} />
);

const Edit: React.FC<SVGProps> = ({ width, height, style }) => (
  <View style={[styles.editIconBase, { width, height }, style]} />
);

const Group50: React.FC<SVGProps> = ({ width, height, style }) => (
  <View style={[styles.svgLine, { width, height }, style]} />
);

const Edit1: React.FC<SVGProps> = ({ width, height, style }) => (
  <View style={[styles.editIconBase, { width, height }, style]} />
);

const Group51: React.FC<SVGProps> = ({ width, height, style }) => (
  <View style={[styles.svgLine, { width, height }, style]} />
);

const Edit2: React.FC<SVGProps> = ({ width, height, style }) => (
  <View style={[styles.editIconBase, { width, height }, style]} />
);

// Importe suas imagens
const images = {
  profile: require("../assets/WhatsApp Image 2025-02-19 at 19.27.06.png"),
  settings: require("../assets/settings.svg"),
  logout: require("../assets/log-out.svg"),
};

const EDITARPERFIL = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#5028c6', '#6f54c3', '#b3b0bc']}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            resizeMode="cover"
            source={images.profile}
          />
          
          <Text style={styles.title}>EDITAR PERFIL</Text>
          
          <Pressable style={styles.settingsButton}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={images.settings}
            />
          </Pressable>
        </View>

        {/* Formulário de Edição */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>EDITAR:</Text>
          
          {/* Campo Cadastro */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CADASTRO</Text>
            <Group49 width={344} height={2} />
            <Edit width={24} height={24} style={styles.editIcon} />
          </View>

          {/* Campo Foto */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>FOTO</Text>
            <Group50 width={344} height={2} />
            <Edit1 width={24} height={24} style={styles.editIcon} />
          </View>

          {/* Campo Corretora */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>CORRETORA</Text>
            <Group51 width={344} height={2} />
            <Edit2 width={24} height={24} style={styles.editIcon} />
          </View>
        </View>

        {/* Botão de Logout */}
        <Pressable
          style={styles.logoutButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.logoutIcon}
            resizeMode="cover"
            source={images.logout}
          />
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  profileImage: {
    width: 82,
    height: 73,
    borderRadius: 8,
  },
  title: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    width: 48,
    height: 48,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    flex: 1,
    gap: 30,
  },
  sectionTitle: {
    color: '#eaff08',
    fontFamily: 'KronaOne-Regular',
    fontSize: 20,
    marginBottom: 20,
  },
  inputGroup: {
    gap: 10,
    position: 'relative',
  },
  inputLabel: {
    color: '#FFF',
    fontFamily: 'KronaOne-Regular',
    fontSize: 18,
  },
  svgLine: {
    backgroundColor: '#FFF',
    height: 2,
  },
  editIconBase: {
    position: 'absolute',
    right: 0,
    top: '50%',
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  editIcon: {
    marginTop: -12, // Ajuste fino para posicionamento
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 56,
    height: 50,
  },
  logoutIcon: {
    width: '100%',
    height: '100%',
  },
  svgPlaceholder: {
    backgroundColor: '#ffffff30',
    height: 2,
    width: '100%',
    marginVertical: 8,
  },
});

export default EDITARPERFIL;