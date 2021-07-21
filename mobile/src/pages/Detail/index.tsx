import { useEffect, useState } from 'react';

import { View, TouchableOpacity, Image, Text, SafeAreaView, Linking } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { RectButton } from 'react-native-gesture-handler';

import { Feather, FontAwesome } from '@expo/vector-icons';

import * as MailComposer from 'expo-mail-composer';

import api from '../../services/api';

import styles from './styles';

type ParamsProps = {
  point_id: number;
}

type Point = {
  image: string;
  image_url: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

type Item = {
  title: string;
}

type DataProps = {
  point: Point;
  items: Item[];
}

export function Detail() {
  const { goBack } = useNavigation();

  const { params } = useRoute();

  const routeParams = params as ParamsProps;

  const [data, setData] = useState<DataProps>({} as DataProps);

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    })
  }, []);

  function handleBack() {
    goBack();
  }; 

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  };

  function handleWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos`);
  };

  if (!data.point)
    return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={20} color="#34bc79" />
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />

        <Text style={styles.pointName}>{data.point.name}</Text>

        <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>

          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#ffffff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}