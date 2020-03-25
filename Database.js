import { openDatabase } from 'expo-sqlite';
import * as firebase from 'firebase';

export default class Database {
  // constructor() {}
  // init() {
  //   firebase.initializeApp({
  //     apiKey: 'AIzaSyB4SzdA-HFmOx7nMStwmu_VgqwEjHdX8mg',
  //     authDomain: 'mobilki-c9d95.firebaseapp.com',
  //     databaseURL: 'https://mobilki-c9d95.firebaseio.com',
  //     projectId: 'mobilki-c9d95',
  //     storageBucket: 'mobilki-c9d95.appspot.com',
  //     messagingSenderId: '906226936308',
  //     appId: '1:906226936308:web:031b9eed6f2167803a71a1'
  //   });
  // }

  // addNewRefueling(refueling) {
  //   firebase
  //     .database()
  //     .ref('/refuelings')
  //     .push(refueling);
  // }

  // getAllRefueling(loadData) {
  //   firebase
  //     .database()
  //     .ref('/refuelings')
  //     .on('value', function(refueling) {
  //       const mappedRefueling = Object.keys(refueling.val()).map(key => ({
  //         refuelingId: key,
  //         ...refueling.val()[key]
  //       }));
  //       loadData([...mappedRefueling]);
  //     });
  // }

  // deleteRefueling(id) {
  //   firebase
  //     .database()
  //     .ref('/refuelings')
  //     .child(id)
  //     .remove();
  // }

  init() {
    const db = openDatabase('db');
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Refueling            (refuelingId INTEGER PRIMARY KEY AUTOINCREMENT, carBrand,           carModel, fuelType, usedFuelAverage, date, imgUrl)`
      );
    });
  }

  addNewRefueling(refueling) {
    const db = openDatabase('db');
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO Refueling (carBrand, carModel, fuelType,            usedFuelAverage, date, imgUrl)            VALUES (?, ?, ?, ?, ?, ?)`,
        [
          refueling.carBrand,
          refueling.carModel,
          refueling.fuelType,
          refueling.usedFuelAverage,
          refueling.date,
          refueling.imgUrl
        ]
      );
    });
  }

  getAllRefueling(loadData) {
    const db = openDatabase('db');
    db.transaction(tx => {
      tx.executeSql(
        'select * from Refueling;',
        [],
        (_, { rows: { _array } }) => {
          loadData(_array);
        },
        () => console.log('error fetching')
      );
    });
  }

  deleteRefueling(id) {
    const db = openDatabase('db');
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Refueling WHERE refuelingId=?', [id]);
    });
  }
}
