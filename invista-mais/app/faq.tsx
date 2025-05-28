import React, { useState } from "react";
import { 
  StyleSheet, 
  Pressable, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView,
  Animated,
  Image
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../types/types';
import SidebarNavigation, { MenuToggleButton } from '../components/VerticalMenuNavigation';
import { MaterialIcons } from '@expo/vector-icons';

const AjudaFaq = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>({});
  const animationValues = {
    '1': useState(new Animated.Value(0))[0],
    '2': useState(new Animated.Value(0))[0],
    '3': useState(new Animated.Value(0))[0],
    '4': useState(new Animated.Value(0))[0],
    '5': useState(new Animated.Value(0))[0],
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleItem = (id: string) => {
    const isExpanded = !expandedItems[id];
    setExpandedItems(prev => ({ ...prev, [id]: isExpanded }));
    
    Animated.timing(animationValues[id as keyof typeof animationValues], {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const faqItems = [
    {
      id: '1',
      question: 'Como começar a investir?',
      answer: 'Para começar a investir, primeiro você precisa criar sua conta na nossa plataforma. Após a verificação, você poderá escolher entre nossos diversos planos de investimento de acordo com seu perfil de risco e objetivos financeiros.'
    },
    {
      id: '2',
      question: 'Quais são as taxas envolvidas?',
      answer: 'Nossa plataforma cobra uma taxa de administração de 0,5% ao ano sobre o valor investido. Não há taxas de entrada, saída ou performance. Todas as taxas são transparentes e informadas antes de qualquer aplicação.'
    },
    {
      id: '3',
      question: 'Como faço para resgatar meus investimentos?',
      answer: 'Os resgates podem ser solicitados a qualquer momento através do aplicativo. O prazo de liquidação varia de 1 a 3 dias úteis dependendo do tipo de investimento. Valores acima de R$ 50.000 podem levar até 5 dias úteis.'
    },
    {
      id: '4',
      question: 'Meus investimentos são garantidos?',
      answer: 'Seus investimentos são protegidos pelo Fundo Garantidor de Créditos (FGC) até o limite de R$ 250.000 por CPF e instituição financeira. Além disso, seguimos rigorosos protocolos de segurança para proteger seus dados e recursos.'
    },
    {
      id: '5',
      question: 'Como atualizar meus dados cadastrais?',
      answer: 'Você pode atualizar seus dados acessando a seção "Perfil" no menu principal. Algumas alterações como CPF e data de nascimento exigem documentação comprobatória para serem atualizadas por questões de segurança.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <MenuToggleButton onPress={toggleSidebar} style={styles.menuButton} />
        <Text style={styles.headerTitle}>AJUDA / FAQ</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Conteúdo Principal */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Seção de Suporte */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SUPORTE AO CLIENTE</Text>
          <View style={styles.separator} />
          
          <View style={styles.supportItem}>
            <MaterialIcons name="email" size={24} color="#EAFF08" style={styles.icon} />
            <View style={styles.supportTextContainer}>
              <Text style={styles.supportTitle}>E-mail</Text>
              <Text style={styles.supportDetail}>contato@invista.com.br</Text>
            </View>
          </View>
          
          <View style={styles.supportItem}>
            <MaterialIcons name="phone" size={24} color="#EAFF08" style={styles.icon} />
            <View style={styles.supportTextContainer}>
              <Text style={styles.supportTitle}>Telefone</Text>
              <Text style={styles.supportDetail}>(11) 3003-9303</Text>
            </View>
          </View>
          
          <View style={styles.supportItem}>
            <MaterialIcons name="access-time" size={24} color="#EAFF08" style={styles.icon} />
            <View style={styles.supportTextContainer}>
              <Text style={styles.supportTitle}>Horário de Atendimento</Text>
              <Text style={styles.supportDetail}>Seg-Sex: 8h às 20h</Text>
            </View>
          </View>
        </View>

        {/* Seção de FAQ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>DÚVIDAS FREQUENTES</Text>
          <View style={styles.separator} />
          
          {faqItems.map((item) => {
            const heightAnim = animationValues[item.id as keyof typeof animationValues].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100] // Altura aproximada da resposta
            });
            
            return (
              <Pressable 
                key={item.id} 
                style={styles.faqItem}
                onPress={() => toggleItem(item.id)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  <MaterialIcons 
                    name={expandedItems[item.id] ? "expand-less" : "expand-more"} 
                    size={24} 
                    color="#EAFF08" 
                  />
                </View>
                
                {expandedItems[item.id] && (
                  <Animated.View style={[styles.faqAnswer, { height: heightAnim }]}>
                    <Text style={styles.faqAnswerText}>{item.answer}</Text>
                  </Animated.View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Menu Lateral */}
      <SidebarNavigation
        currentPage="faq"
        isVisible={isSidebarVisible}
        onToggle={toggleSidebar}
      />

      {/* Botão de Voltar */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={28} color="#FFF" />
      </Pressable>
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
  menuButton: {
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontFamily: 'KronaOne-Regular',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    padding: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardTitle: {
    color: '#EAFF08',
    fontSize: 20,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 15,
  },
  separator: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    marginRight: 15,
  },
  supportTextContainer: {
    flex: 1,
  },
  supportTitle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    marginBottom: 3,
  },
  supportDetail: {
    color: '#DDD',
    fontSize: 14,
    fontFamily: 'KronaOne-Regular',
  },
  faqItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  faqQuestion: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'KronaOne-Regular',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: 'rgba(234, 255, 8, 0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(234, 255, 8, 0.3)',
  },
  faqAnswerText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(234, 255, 8, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default AjudaFaq;