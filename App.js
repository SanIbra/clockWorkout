import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


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
    backgroundColor: 'orange',
  },
});

export default function App() {
  const timerIniatialValue = 40

  const [timer, setTimer] = useState(timerIniatialValue);

  const [isRuning, setIsRuning] = useState(false);

  setTimeout(() => {
    if (isRuning) {
      setTimer(timer - 1);
    }
    return;
  }, 1000)

  const reset = () => {
    setTimer(timerIniatialValue);
  }

  const add10s = () => {
    setTimer(timer + 10);
  }


  return (<View
    style={[styles.container]}>
    <View style={{ flex: 1, backgroundColor: 'red' }} >
      <Text> Top de l'application</Text>
    </View>
    <View style={{ flex: 4, backgroundColor: 'darkorange', justifyContent: 'center', textAlign: 'center', }} >
      <Text style={{ textAlign: 'center' }}> {timer}</Text>
      <Button
        onPress={() => {
          setIsRuning(!isRuning);
        }}
        title={isRuning ? 'Pause' : 'Start'}>
      </Button>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          style={styles.roundButton1}
          onPress={add10s}
          title='+10s'>
        </Button>
        <Button
          style={{}}
          onPress={reset}
          title='reset'>
        </Button>
      </View>
    </View>
    <View style={{ flex: 1, backgroundColor: 'green' }} >
      <Text>Bottom de l'application</Text>
    </View>
  </View>)
}
