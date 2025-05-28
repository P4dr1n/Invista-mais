import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SidebarNavigation, { MenuToggleButton } from "../components/VerticalMenuNavigation";

const PerfilScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const ProfileButton = ({
    text,
    onPress,
  }: {
    text: string;
    onPress?: () => void;
  }) => (
    <Pressable style={styles.profileButton} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["#5028c6", "#603ec5", "#b3b0bc"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SidebarNavigation
          currentPage="perfil"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
        {/* Header */}
        <View style={styles.header}>
          <MenuToggleButton onPress={toggleSidebar} />
          <Text style={styles.headerTitle}>Perfil</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Conteúdo */}
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
         <View style={styles.avatarSection}>
          <Image
             // Adicione uma imagem real
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.profileName}>Nome do Usuário</Text>
        </View>

          <View style={styles.buttonGroup}>
            <ProfileButton text="EDITAR PERFIL" />
            <View style={styles.brokerContainer}>
              <Text style={styles.brokerText}>CORRETORA DE USO:</Text>
              <View style={styles.dropdownIcon}>
                <View style={styles.dropdownPlaceholder} />
              </View>
            </View>
            <ProfileButton text="PERFIL DE INVESTIMENTOS" />
          </View>

          <Text style={styles.profileType}>CUIDADOSO</Text>
        </ScrollView>

        {/* Botão de Logout */}
        <Pressable style={styles.logoutButton} onPress={() => navigation.goBack()}>
          <Image
             // Adicione um ícone real
            style={styles.logoutIcon}
            resizeMode="contain"
          />
        </Pressable>

        {/* Menu Lateral */}
        <SidebarNavigation
          currentPage="perfil"
          isVisible={isSidebarVisible}
          onToggle={toggleSidebar}
        />
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "KronaOne-Regular",
    textAlign: "center",
  },
  headerSpacer: {
    width: 40,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: "KronaOne-Regular",
    color: "#FFF",
  },
  buttonGroup: {
    gap: 15,
    marginBottom: 30,
  },
  profileButton: {
    backgroundColor: "#D9D9D9",
    borderRadius: 46,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontFamily: "KronaOne-Regular",
    fontSize: 16,
  },
  brokerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
    borderRadius: 46,
    paddingHorizontal: 20,
    height: 62,
  },
  brokerText: {
    color: "#000",
    fontFamily: "KronaOne-Regular",
    fontSize: 16,
    flex: 1,
  },
  dropdownIcon: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownPlaceholder: {
    width: 20,
    height: 10,
    backgroundColor: "#999",
    borderRadius: 2,
  },
  profileType: {
    color: "#0551FF",
    fontFamily: "KronaOne-Regular",
    fontSize: 20,
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 56,
    height: 50,
  },
  logoutIcon: {
    width: "100%",
    height: "100%",
  },
});

export default PerfilScreen;
