import { useState } from "react";

import { View, Text, Image, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { RectButton } from "react-native-gesture-handler";

import { Feather } from '@expo/vector-icons';

import logoImg from '../../assets/logo.png';
import backgroundImg from '../../assets/home-background.png';

import styles from './styles';

export function Home() {
  const { navigate } = useNavigation();

  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  function handleNavigateToPoints() {
    navigate('Points', { uf, city });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        source={backgroundImg} 
        style={styles.container} 
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={logoImg} />

          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>

            <Text style={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput style={styles.input} 
            placeholder="Digite a UF"
            value={uf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={setUf}
          />

          <TextInput style={styles.input} 
            placeholder="Digite a cidade"
            value={city}
            autoCorrect={false}
            onChangeText={setCity}
          />

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" size={24} color="#ffffff" />
            </View>

            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}