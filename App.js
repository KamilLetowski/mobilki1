import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FuelUsageResult from './FuelUsageResult';
import CarForm from './CarForm';
import RefuelingList from './RefuelingList';
import Database from './Database';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const db = new Database();
    db.init();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Formularz spalania" component={CarForm} />
        <Tab.Screen name="Baza spalań" component={RefuelingList} />
      </Tab.Navigator>
    </NavigationContainer>
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
