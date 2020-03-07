import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FuelUsageResult({ route: { params } }) {
  return (
    <View style={styles.container}>
      <Text>Marka samochodu: {params.carDetails.brand}</Text>
      <Text>Ilość spalonego paliwa: {params.carDetails.usedFuel}</Text>
      <Text>Przebyty dystans: {params.carDetails.distance}</Text>
      <Text>Data tankowania: {params.carDetails.date}</Text>
      <Text>
        Spalanie na 100km:
        {` ${(params.carDetails.usedFuel / params.carDetails.distance) * 100}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
