import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Timer from './components/Timer';
import Timer2 from './components/Timer2';


const mainColor = 'green';

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
    backgroundColor: mainColor,
    mainColor: 'black'
  },
});

export default function App() {
  const timerIniatialValue = 40
  return (
    <View style={[styles.container, { backgroundColor: 'black' }]}>
      <StatusBar style="light"></StatusBar>
      <View style={{ flex: 1 }} >
      </View>
      <View style={{ flex: 4, justifyContent: 'center' }} >
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Timer2
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