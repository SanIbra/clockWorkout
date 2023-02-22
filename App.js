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
  console.log("start")
  const timerIniatialValue = 40

  const [timer, setTimer] = useState(timerIniatialValue);

  const [isRuning, setIsRuning] = useState(false);

  const [timerTitle, setTimerTitle] = useState(timerIniatialValue + "\nStart");

  const [interval, setIntervalValue] = useState();

  const majTimerTitle = () => setTimerTitle(timer + '\n' + (isRuning ? 'Pause' : 'Start'))

  const clickButton = () => {
    const nextState = !isRuning;
    setIsRuning(nextState);
    majTimerTitle();
    if (nextState)
      start();
    else
      stop()
  }
  const start = () => {
    console.log("START CLOCk")
    // const interval = setInterval(() => {
    //   console.log("IN")
    //   setTimer(timer - 1);
    //   // majTimerTitle();
    // }, 100)
    // console.log("inter", interval)
    setIntervalValue(interval);
  }

  const stop = () => {

    console.log("END CLOCk")
    setIsRuning(false);
    console.log(interval)
    if (interval)
      clearInterval(interval);
  }
  const reset = () => {
    stop();
    setTimer(timerIniatialValue);
    majTimerTitle();
  }

  const add10s = () => {
    setTimer(timer + 10);
    majTimerTitle();
  }

  return (<View
    style={[styles.container]}>
    <View style={{ flex: 1, backgroundColor: 'red' }} >
      <Text> Top de l'application</Text>
    </View>
    <View style={{ flex: 4, justifyContent: 'center', backgroundColor: 'darkorange' }} >
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'rose', justifyContent: 'center' }}>

        {/* <Timer
          start={isRuning}
          stop={!isRuning}
          totalDuration={timerIniatialValue*1000}
        /> */}
        <Timer2
          isRuning={isRuning}
          timer={40}
          additionalTime={10}
        />
        {/* <TouchableOpacity
          style={[styles.roundButton1, {
            width: 200,
            height: 200,
            textAlign: 'center',
            backgroundColor: mainColor,
            mainColor: 'black'
          }]}
          onPress={() => {
            setIsRuning(!isRuning);
          }}>
          <Text style={{ color: 'black', textAlign: 'center' }}>{timer}{'\n'}{isRuning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        {/* <RoundButton
          onPress={add10s}
          title='+10s'
        />
        <RoundButton
          onPress={reset}
          title='reset'
        /> */}
      </View>
    </View>
    <View style={{ flex: 1, backgroundColor: 'green' }} >
      <Text>Bottom de l'application</Text>
    </View>
  </View>)
}


const RoundButton = (props) => {
  const style = props.style ? props.style : {};
  return (
    <TouchableOpacity
      style={[styles.roundButton1, style]}
      onPress={props.onPress}>
      <Text style={{ color: 'black', textAlign: 'center' }}>{props.title}</Text>
    </TouchableOpacity>
  )
}


