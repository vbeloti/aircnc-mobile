import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../services/api';

function Book() {
  const [date, setDate] = useState('');

  const { navigate } = useNavigation();
  const route = useRoute();

  const id = route.params.id;

  async function handleSubmit() {
    console.log('clicou');

    const user_id = await AsyncStorage.getItem('@airCnC_User_Id');

    const result = await api.post(`/spots/${id}/bookings`, { date }, { headers: { user_id } });

    Alert.alert('Solicitação de reserva enviada.');

    navigate('List');
  }

  function handleCancel() {
    navigate('List');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Data de interesse *</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={[styles.button, styles.cancelButton]}
      >
        <Text style={styles.buttonText}>Cancelar </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  cancelButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Book;
