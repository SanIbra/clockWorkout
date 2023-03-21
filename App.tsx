import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Timer from './components/Timer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetUpScreen from './components/SetUpScreen';
import { colorPanel } from './components/Constants';
import { Provider as PaperProvider } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: 'red',
    borderRadius: 4
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,

    textAlign: 'center',
    backgroundColor: 'white',
    mainColor: 'black'
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style='auto' />
        <Stack.Navigator>
          <Stack.Screen name="Préparation" component={SetUpScreen} />
          <Stack.Screen name="Chrono" component={Timer} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}