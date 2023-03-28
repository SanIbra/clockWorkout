import { Sound } from 'expo-av/build/Audio';
import React, { Component, Provider, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { FontAwesome } from '@expo/vector-icons';
import { TimerSession } from './TimerSession';
import { colorPanel } from './Constants';
import { Button } from 'react-native-paper';
import { AVPlaybackStatusSuccess } from 'expo-av';
import { AVPlaybackStatus } from 'expo-av/build/AV.types';

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
    numberSerie: number;
    numberSerieTotal: number;
    temps: number;
    titre: string;
    sansDuree: boolean;
}

export default function Timer({ route }) {

    const programme: TimerSession = route.params;
    const sessions: Session[] = [];
    const [indexSession, setIndexSession] = useState(0);
    const [lastSerie, setLastSerie] = useState(false);
    for (let i = 0; i < programme.nombreRep; i++) {
        sessions.push({
            numberSerie: i + 1,
            numberSerieTotal: programme.nombreRep,
            temps: programme.tpsEffort,
            titre: "Let's go",
            sansDuree: programme.isTpsEffortIndertermine
        });
        // skip last pause
        if (i != programme.nombreRep - 1) {
            sessions.push({
                numberSerie: i + 1,
                numberSerieTotal: programme.nombreRep,
                temps: programme.tpsRepos,
                titre: "Récuperation",
                sansDuree: programme.isTpsReposIndertermine
            });
        }
    }

    const [isPlaying, setIsPlaying] = useState(false);
    const [tempsRestant, setTempsRestant] = useState(sessions[0].temps);

    const onFinish = () => {
        var next = indexSession + 1;
        if (next == sessions.length) {
            setLastSerie(true)
            return;
        }
        setIndexSession(indexSession => indexSession + 1);
        setTempsRestant(sessions[next].temps)


    }
    const timeUp = async () => {
        const sound = new Sound();
        await sound.loadAsync(require('./../assets/sounds/bell.mp3'));

        sound.setOnPlaybackStatusUpdate((value: AVPlaybackStatus) => {
            function isAVPlaybackStatusSuccess(contact: AVPlaybackStatus): contact is AVPlaybackStatusSuccess {
                return (contact as AVPlaybackStatusSuccess).didJustFinish !== undefined;
            }

            if (isAVPlaybackStatusSuccess(value)) {
                const success = value as AVPlaybackStatusSuccess;
                if (success.didJustFinish)
                    sound.unloadAsync()
            }
        })
        await sound.playAsync();
        onFinish();
    }

    const timer = (titre: string) => (
        <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ padding: 15 }}>
                <Text style={styles.text}>Série {sessions[indexSession].numberSerie} / {sessions[indexSession].numberSerieTotal}</Text>
            </View>
            <Text style={[styles.text, { textAlign: 'center' }]}>
                {titre}
            </Text>
            <View style={{ padding: 15 }}>
                <CountdownCircleTimer
                    key={indexSession}
                    isPlaying={isPlaying}
                    duration={tempsRestant}
                    // initialRemainingTime={timerRemaining}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}

                    colorsTime={[7, 5, 2, 0]}
                    onComplete={total => { timeUp(); }}
                // onUpdate={remainingTime => { setTimerRemainingSave(remainingTime) }}
                >
                    {({ remainingTime }) => (
                        <View>
                            <Text style={styles.text}>{remainingTime}</Text>
                        </View>)
                    }
                </CountdownCircleTimer>
            </View>
            <View style={{ padding: 30 }}>
                {isPlaying ?
                    <FontAwesome name="pause" size={24} color="black" onPress={() => setIsPlaying(false)} />
                    :
                    <FontAwesome name="play" size={24} color="black" onPress={() => setIsPlaying(true)} />
                }
            </View>
        </View>
    )

    const finDeSession = (
        <View style={{ flex: 5, justifyContent: 'center' }}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
                Bravo ! Vous avez terminé votre session!!
            </Text>
        </View>
    )

    const SessionSansDuree2 = (titre) => (
        <View style={{ flex: 5, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <View style={{ padding: 15 }}>
                <Text style={styles.text}>Serie {sessions[indexSession].numberSerie} / {sessions[indexSession].numberSerieTotal}</Text>
            </View>
            <Text style={[styles.text]}>
                {titre}
            </Text>
            <Button icon="arrow-right-circle-outline"
                mode="contained"
                onPress={() => { setIsPlaying(true); onFinish() }}>
                Suivant
            </Button>
        </View>

    )


    const SessionSansDuree = (titre) => (
        <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ padding: 15 }}>
                <Text style={styles.text}>Serie {sessions[indexSession].numberSerie} / {sessions[indexSession].numberSerieTotal}</Text>
            </View>
            <Text style={[styles.text]}>
                {titre}
            </Text>
            <View style={{ padding: 15 }}>
                <Button icon="arrow-right-circle-outline"
                    mode="contained"
                    onPress={() => { setIsPlaying(true); onFinish() }}>
                    Suivant
                </Button>
            </View>
            <View style={{ padding: 30 }}>
                {/* {isPlaying ?
                    <FontAwesome name="pause" size={24} color="black" onPress={() => setIsPlaying(false)} />
                    :
                    <FontAwesome name="play" size={24} color="black" onPress={() => setIsPlaying(true)} />
                } */}
            </View>
        </View>
    );
    return (
        <View style={{ flex: 1 }}>
            {(lastSerie) ? finDeSession : (sessions[indexSession].sansDuree ? SessionSansDuree(sessions[indexSession].titre) : timer(sessions[indexSession].titre))}
            <View style={{ flex: 1 }}></View>
        </View>);
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
