import { Pressable, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Index() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#3B0CC8', '#562ECE', '#7352D5', '#AE9DE2']}
      style={styles.gradient}
    >
      <View style={styles.contentContainer}>
        <Image 
          style={styles.logo} 
          source={require('../assets/imagem_logo.jpeg')}
        />
        <Text style={styles.welcomeText}>BEM VINDO A ETERNIDADE</Text>
        
        <Pressable 
          style={styles.button}
          onPress={() => navigation.navigate('login' as never)}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
          <Image
            style={styles.images}
            source={require('../assets/imagem_login.png')}
          />
        </Pressable>

        <Pressable 
          style={styles.button}
          onPress={() => navigation.navigate('cadastro' as never)}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
          <Image
            style={styles.images}
            source={require('../assets/imagem_cadastro.png')}
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 81,
    paddingBottom: 81,
  },

  contentContainer: {
    position: 'absolute',
    top: height * 0.25,
    left: width * 0.1,
    width: width * 0.8,
    height: height * 0.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 97,
    paddingVertical: 121,
    gap: 48,
    alignItems: 'center',
  },

  logo: {
    width: 138,
    height: 135,
    borderRadius: 95,
  },

  welcomeText: {
    fontSize: 16,
    color: '#fff',
    width: 281,
    height: 30,
    textAlign: 'center',
    fontFamily: 'KronaOne-Regular',
  },

  button: {
    backgroundColor: '#bfbfbf',
    borderRadius: 25,
    width: 264,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  
  buttonText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 10,
    fontFamily: 'KronaOne-Regular',
  },

  images: {
    height: 25,
    width: 27,
    marginRight: 5,
  },
});