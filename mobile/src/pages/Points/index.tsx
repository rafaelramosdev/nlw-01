import { useState, useEffect } from 'react';

import { TouchableOpacity, View, Image, Text, ScrollView, Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { SvgUri } from 'react-native-svg';

// import * as Location from 'expo-location';

import api from '../../services/api';

import styles from './styles';

type Item = {
  id: number;
  title: string;
  image_url: string;
}

type Point = {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

type ParamsProps = {
  uf: string;
  city: string;
}

export function Points() {
  const { navigate, goBack } = useNavigation();

  const { params } = useRoute();

  const routeParams = params as ParamsProps;

  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // const [initialPosition, setInitialPosition] = useState({
  //   latitude: 0,
  //   longitude: 0
  // });

  // useEffect(() => {
  //   async function loadPosition() {
  //     const { status } = await Location.requestPermissionsAsync();

  //     if (status !== 'granted') {
  //       Alert.alert('Opss...', 'Precisamos de sua permissão para obter a localização.');

  //       return;
  //     }

  //     const location = await Location.getCurrentPositionAsync();

  //     const { latitude, longitude } = location.coords;

  //     setInitialPosition({
  //       latitude,
  //       longitude
  //     });
  //   };

  //   loadPosition();
  // }, []);

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems,
      }
    }).then(response => {
      setPoints(response.data);
    })
  }, [selectedItems]);

  function handleBack() {
    goBack();
  };

  function handleNavigateToDetail(id: number) {
    navigate('Detail', { id });
  };

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>Bem-vindo.</Text>

        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView 
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: -23.5494117,
              longitude: -46.6296634,
              latitudeDelta: 0.11,
              longitudeDelta: 0.11,
            }}
            style={styles.map} 
          >
            { points.map(point => {
              return (
                <Marker 
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }} 
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} />

                    <Text style={styles.mapMarkerTitle}>{point.name}</Text> 
                  </View>
                </Marker>
              )
            }) }
          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 32
          }}
        > 
          { items.map(item => {
            return (
              <TouchableOpacity key={String(item.id)} onPress={() => handleSelectItem(item.id)} style={[styles.item, selectedItems.includes(item.id) && styles.selectedItem]} activeOpacity={0.6}>
                <SvgUri width={42} height={42} uri={item.image_url} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity> 
            )
          }) }
        </ScrollView>
      </View>
    </>
  );
}