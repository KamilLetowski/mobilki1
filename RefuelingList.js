import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';
import Database from './Database';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';

const RefuelingList = props => {
  const [refuelingList, setRefuelingList] = useState([]);
  useEffect(() => {
    const db = new Database();
    db.getAllRefueling(setRefuelingList);
  }, [props]);

  const handleDelete = id => {
    const db = new Database();
    db.deleteRefueling(id);
  };

  return (
    <View>
      <Dialog
        visible={true}
        dialogTitle={<DialogTitle title="Okno dialogowe" />}
        onTouchOutside={() => {
          // this.setState({ visible: false });
        }}
      >
        <DialogContent style={{ width: 300, margin: 10 }}>
          <Text style={{ margin: 10 }}>
            Czy na pewno chcesz usunąć Samochód do usunięcia z bazy spalań?
          </Text>
          <Button style={{ width: 100 }} title="potwierdź" />
        </DialogContent>
      </Dialog>
      <FlatList
        data={refuelingList}
        keyExtractor={item => item.refuelingId}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image
              source={{ uri: item.imgUrl }}
              style={{ height: 150, flex: 1 }}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text>Marka: {item.carBrand}</Text>
              <Text>Model: {item.carModel}</Text>
              <Text>Typ paliwa: {item.fuelType}</Text>
              <Text>
                Średnie spalanie: {Number(item.usedFuelAverage).toFixed(2)}
              </Text>
              <Text>Data tankowania: {item.date}</Text>
              <Button
                title="Usuń"
                onPress={() => handleDelete(item.refuelingId)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 50
  }
});

export default RefuelingList;
