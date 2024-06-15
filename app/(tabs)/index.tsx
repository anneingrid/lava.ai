import { useAppContext } from '@/components/provider';
import React, { useState } from 'react';
import { View, Button, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Divider } from 'react-native-paper';

export default function Index() {
  const { box1, box2, box3, instanteAtual, incrementarInstanteAtual } = useAppContext();
  const incrementarInstante = () => {
    incrementarInstanteAtual()
  };
  const filaStyle = (boxLength) => {
    return boxLength >= 5 ? styles.filaCheia : styles.filaNormal;
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Instante: {instanteAtual}</Text>
      <Divider />
      <View style={styles.boxContainer}>
        <Link href={'/box1'}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Box 1</Text>
        </Link>

        <Text style={filaStyle(box1.length)}>Fila: {box1.length} veículos</Text>
        <Divider />
      </View>
      <View style={styles.boxContainer}>
        <Link href={'/box2'}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Box 2</Text>
        </Link>

        <Text style={filaStyle(box2.length)}>Fila: {box2.length} veículos</Text>
        <Divider />
      </View>
      <View style={styles.boxContainer}>
        <Link href={'/box3'}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Box 3</Text>
        </Link>


        <Text style={filaStyle(box2.length)}>Fila: {box2.length} veículos</Text>
        <Divider />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Incrementar Instante Atual" onPress={incrementarInstante} />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  boxContainer: {

    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  filaNormal: {
    color: 'black',
  },
  filaCheia: {
    color: 'red',
  },
});