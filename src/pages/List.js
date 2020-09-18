import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';

import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  StyleSheet,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@airCnC_User_Id').then((user_id) => {
      console.log(user_id);
      console.log('asa', user_id, 'id');
      const socket = socketio('http://192.168.0.150:3333', {
        query: { user_id },
      });

      socket.on('booking_response', (booking) => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'Aprovada' : 'Rejeitada'
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@airCnC_techs').then((storageTechs) => {
      const techsArray = storageTechs
        .split(',')
        .map((storageTech) => storageTech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map((tech) => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 10,
  },
});

export default List;
