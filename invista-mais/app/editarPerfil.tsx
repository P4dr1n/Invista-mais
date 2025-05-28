import * as React from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TextInput, 
  Pressable,
  ActivityIndicator,
  Image
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const EditarPerfil = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    name: "Maria Silva",
    email: "maria.silva@email.com",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    birthDate: "15/01/1990",
    profileImage: null as string | null,
    broker: "XP Investimentos"
  });

  const [tempData, setTempData] = React.useState({ ...userData });

  const handleSave = () => {
    setLoading(true);
    // Simulação de salvamento
    setTimeout(() => {
      setUserData({ ...tempData });
      setLoading(false);
      navigation.goBack();
    }, 1500);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setTempData({...tempData, profileImage: result.assets[0].uri});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        </Pressable>
        <Text style={styles.headerTitle}>EDITAR PERFIL</Text>
        <Pressable style={styles.saveButton} onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#EAFF08" />
          ) : (
            <Text style={styles.saveText}>SALVAR</Text>
          )}
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Foto de Perfil */}
        <Pressable style={styles.profileImageContainer} onPress={pickImage}>
          {tempData.profileImage ? (
            <Image source={{ uri: tempData.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <MaterialIcons name="person" size={50} color="#5028C6" />
            </View>
          )}
          <View style={styles.editPhotoButton}>
            <MaterialIcons name="edit" size={18} color="#5028C6" />
          </View>
        </Pressable>

        {/* Campos do Formulário */}
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>NOME COMPLETO</Text>
          <TextInput
            style={styles.input}
            value={tempData.name}
            onChangeText={(text) => setTempData({...tempData, name: text})}
            placeholderTextColor="#AAA"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            value={tempData.email}
            onChangeText={(text) => setTempData({...tempData, email: text})}
            keyboardType="email-address"
            placeholderTextColor="#AAA"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>CPF</Text>
          <TextInput
            style={styles.input}
            value={tempData.cpf}
            onChangeText={(text) => setTempData({...tempData, cpf: text})}
            keyboardType="numeric"
            placeholderTextColor="#AAA"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>TELEFONE</Text>
          <TextInput
            style={styles.input}
            value={tempData.phone}
            onChangeText={(text) => setTempData({...tempData, phone: text})}
            keyboardType="phone-pad"
            placeholderTextColor="#AAA"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>DATA DE NASCIMENTO</Text>
          <TextInput
            style={styles.input}
            value={tempData.birthDate}
            onChangeText={(text) => setTempData({...tempData, birthDate: text})}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#AAA"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>CORRETORA</Text>
          <Pressable style={styles.brokerButton}>
            <Text style={styles.brokerText}>{tempData.broker}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#EAFF08" />
          </Pressable>
        </View>

        {/* Botão para Alterar Senha */}
        <Pressable 
          style={styles.changePasswordButton}
          onPress={() => navigation.navigate('AlterarSenha')}
        >
          <Text style={styles.changePasswordText}>ALTERAR SENHA</Text>
          <MaterialIcons name="chevron-right" size={24} color="#5028C6" />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5028c6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(80, 40, 198, 0.9)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    flex: 1,
  },
  saveButton: {
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  saveText: {
    color: '#EAFF08',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAFF08',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#EAFF08',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#EAFF08',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 25,
  },
  inputLabel: {
    color: '#EAFF08',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  brokerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  brokerText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
    borderRadius: 15,
    padding: 15,
    width: '100%',
    marginTop: 10,
  },
  changePasswordText: {
    color: '#EAFF08',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
  },
});

export default EditarPerfil;