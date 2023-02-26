import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Timer from './components/Timer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetUpScreen from './components/SetUpScreen';

const mainColor: string = 'green';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: 'red',
    borderRadius: 4
    //   alignItems: 'center',
    //   justifyContent: 'center',
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
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Préparation" component={SetUpTimerScreen} />
        <Stack.Screen name="Chrono"  component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  function HomeScreen() {
    const timerIniatialValue = 5
    return (
      <View style={[styles.container, {}]}>
        <StatusBar style="auto"></StatusBar>
        <View style={{ flex: 1 }} >
        </View>
        <View style={{ flex: 4, justifyContent: 'center' }} >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Timer
              timer={timerIniatialValue}
              additionalTime={10}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          </View>
        </View>
        <View style={{ flex: 1 }} >
        </View>
      </View>)
  }

  function SetUpTimerScreen() {
    return (
      <SetUpScreen />
    );
  }
}