import { Sound } from 'expo-av/build/Audio';
import React, { Component, Provider, useState } from 'react';
import { Button, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { FontAwesome } from '@expo/vector-icons';
import { TimerSession } from './TimerSession';
import { colorPanel } from './Constants';

type TimerProps = {
    timer: number,
    additionalTime: number
    route?: any
}
type TimerState = {
    timerRemaining: number,
    timerRemainingSave: number,
    isPlaying: boolean,
    subTitle: string
}


export interface Session {
    temps: number;
    titre: string;
}

export default function Timer({ route }) {

    const programme: TimerSession = route.params;
    const sessions: Session[] = [];

    const [indexSession, setIndexSession] = React.useState(0);
    for (let i = 0; i < programme.nombreRep; i++) {
        sessions.push({
            temps: programme.tpsEffort,
            titre: "Let's go"
        });
        sessions.push({
            temps: programme.tpsRepos,
            titre: "Récuperation"
        });
    }

    const listSession =
        sessions
            .map((s, i) => (<SessionDisplay
                session={s}
                onFinish={() => setIndexSession(i + 1)}
                runnigImmediately={i !== 0} />));

    listSession.push((<View><Text style={styles.text}>Bravo vous avez fini</Text></View>));

    return (<View>{listSession[indexSession]}</View>);

}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

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
    text: {
        fontSize: 24,
        color: colorPanel.main
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
    }
})
function SessionDisplay({ session, onFinish, runnigImmediately }) {
    const sessionActuel = session as Session;
    const timerRemaining = sessionActuel.temps;
    const [timerRemainingSave, setTimerRemainingSave] = React.useState(timerRemaining);
    const [isPlaying, setIsPlaying] = React.useState(runnigImmediately);

    const timeUp = async () => {
        const sound = new Sound();
        await sound.loadAsync(require('./../assets/sounds/beep-beep.mp3'));
        await sound.playAsync();

        setTimeout(() => sound.unloadAsync(), 1000)
        // setIsPlaying(false) // les states sont partagé dans toute l'appli!!
        onFinish();
    }

    return (
        <View style={[styles.center]}>
            <View style={{ paddingBottom: 40 }}><Text style={styles.text}>{sessionActuel.titre}</Text></View>
            <View style={{ paddingBottom: 20 }}>
                <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={timerRemainingSave}
                    initialRemainingTime={timerRemaining}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}
                    onComplete={total => { timeUp(); return { shouldRepeat: true } }}
                // onUpdate={remainingTime => { setTimerRemainingSave(remainingTime) }}
                >
                    {({ remainingTime }) => (
                        <View>
                            <Text style={styles.text}>{remainingTime}</Text>
                        </View>)
                    }
                </CountdownCircleTimer>
            </View>
            <View >
                {isPlaying ?
                    <FontAwesome name="pause" size={24} color="black" onPress={() => setIsPlaying(false)} />
                    :
                    <FontAwesome name="play" size={24} color="black" onPress={() => setIsPlaying(true)} />
                }
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                <FontAwesome name="repeat" size={24} color="black" onPress={() => this.reset()} />
            </View> */}

        </View >);
}
