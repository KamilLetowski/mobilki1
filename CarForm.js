import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default function CarForm({ navigation }) {
  const [carBrand, setCarBrand] = useState('');
  const [usedFuel, setUsedFuel] = useState(0);
  const [distance, setDistance] = useState(0);
  const [date, setDate] = useState(new Date());

  const handleAverageUsedFuel = () => {
    navigation.navigate('FuelUsageResult', {
      carDetails: {
        brand: carBrand,
        usedFuel,
        distance,
        date
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>Podaj markę samochodu:</Text>
      <TextInput
        onChangeText={text => setCarBrand(text)}
        value={carBrand}
        style={styles.textInput}
      />
      <Text>Podaj ilość przebytych kilometrów:</Text>
      <TextInput
        onChangeText={text => setDistance(text)}
        value={distance.toString()}
        style={styles.textInput}
      />
      <Text>Podaj ilość spalonego paliwa:</Text>
      <TextInput
        onChangeText={text => setUsedFuel(text)}
        value={usedFuel.toString()}
        style={styles.textInput}
      />
      <Text>Podaj datę tankowania:</Text>
      <DatePicker
        style={{ width: 200, marginBottom: 10 }}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2019-05-01"
        maxDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={date => setDate(date)}
      />
      <Button
        title="Oblicz średnie spalanie"
        style={styles.button}
        onPress={handleAverageUsedFuel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    borderColor: '#333',
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 6,
    marginTop: 4,
    marginBottom: 8,
    width: 300
  },
  button: {
    borderRadius: 3,
    marginTop: 14
  },
  calendar: {
    display: 'flex'
  }
});

// baza do raportów spalania w 2 tech: sqllite i firebase na za 2 tygodnie
// dane do baz: marka, model, typ paliwa, spalanie litrów na 100km, data, link do zdjęcia
