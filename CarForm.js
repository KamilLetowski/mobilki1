import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Button,
  Picker,
  Image,
  View
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import Database from './Database';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';

export default function CarForm({ navigation }) {
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [fuelType, setFuelType] = useState('Benzyna');
  const [imgUrl, setImgUrl] = useState('');
  const [usedFuel, setUsedFuel] = useState(0);
  const [distance, setDistance] = useState(0);
  const [date, setDate] = useState(new Date());

  const handleAverageUsedFuel = () => {
    const db = new Database();
    db.addNewRefueling({
      carBrand,
      carModel,
      date: new Date().toLocaleDateString(),
      fuelType,
      imgUrl,
      usedFuelAverage: (usedFuel / distance) * 100
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImgUrl(result.uri);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Dialog
          visible={!true}
          dialogTitle={<DialogTitle title="Okno dialogowe" />}
          onTouchOutside={() => {
            // this.setState({ visible: false });
          }}
        >
          <DialogContent style={{ width: 300, margin: 10 }}>
            <Text style={{ margin: 10 }}>
              Spalanie dla samochodu Samochod 1 zostało pomyślnie dodane do bazy
              spalań
            </Text>
            <Button style={{ width: 100 }} title="ok" />
          </DialogContent>
        </Dialog>
        <Text>Podaj markę samochodu:</Text>
        <TextInput
          onChangeText={text => setCarBrand(text)}
          value={carBrand}
          style={styles.textInput}
        />
        <Text>Podaj typ samochodu:</Text>
        <TextInput
          onChangeText={text => setCarModel(text)}
          value={carModel.toString()}
          style={styles.textInput}
        />
        <Text>Podaj ilość przebytych kilometrów:</Text>
        <TextInput
          onChangeText={text => setDistance(text)}
          value={distance.toString()}
          style={styles.textInput}
        />
        <Text>Wybierz typ paliwa:</Text>
        <Picker
          selectedValue={fuelType}
          style={{ height: 50, width: 300 }}
          onValueChange={(itemValue, itemIndex) => {
            setFuelType(itemValue);
          }}
        >
          <Picker.Item label="Benzyna" value="Benzyna" />
          <Picker.Item label="Olej napędowy" value="Olej napędowy" />
          <Picker.Item label="Gaz" value="Gaz" />
        </Picker>
        <Text>Podaj ilość spalonego paliwa:</Text>
        <TextInput
          onChangeText={text => setUsedFuel(text)}
          value={usedFuel.toString()}
          style={styles.textInput}
        />
        <Text>Podaj datę tankowania:</Text>
        <DatePicker
          style={{ width: 300, marginBottom: 10 }}
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
        <View>
          <Image
            source={{
              uri:
                imgUrl ||
                'https://reactnativecode.com/wp-content/uploads/2017/10/Guitar.jpg'
            }}
            style={{ width: 300, height: imgUrl ? 200 : 0 }}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          <Button
            title="Wybierz zdjęcie"
            onPress={pickImage}
            style={{ marginBottom: 20 }}
          />
        </View>
        <Button
          title="Dodaj notatke spalania"
          style={styles.button}
          onPress={handleAverageUsedFuel}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60
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
  }
});

// baza do raportów spalania w 2 tech: sqllite i firebase na za 2 tygodnie
// dane do baz: marka, model, typ paliwa, spalanie litrów na 100km, data, link do zdjęcia
