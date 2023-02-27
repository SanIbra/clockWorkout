import { Sound } from 'expo-av/build/Audio';
import React, { Component, Provider } from 'react';
import { Button, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { FontAwesome } from '@expo/vector-icons';
import { TimerSession } from './TimerSession';

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
    const session: Session[] = [];
    for (let i = 0; i < programme.nombreRep; i++) {
        session.push({
            temps: programme.tpsEffort,
            titre: "Let's goo"
        });
        session.push({
            temps: programme.tpsRepos,
            titre: "Récuperation"
        });
    }

    return (<View><SessionDisplay session={session[0]}></SessionDisplay></View>);

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
function SessionDisplay({ session }) {
    const sessionActuel = session as Session;
    const timerRemaining = sessionActuel.temps;
    const [timerRemainingSave, setTimerRemainingSave] = React.useState(timerRemaining);
    const [isPlaying, setIsPlaying] = React.useState(false);

    const timeUp = async () => {
        const sound = new Sound();
        await sound.loadAsync(require('./../assets/sounds/beep-beep.mp3'));
        await sound.playAsync();

        setTimeout(() => sound.unloadAsync(), 1000)
        setIsPlaying(false)
    }

    return (
        <View style={[styles.center]}>
            <View><Text>{sessionActuel.titre}</Text></View>
            <View >
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
                            <Text adjustsFontSizeToFit>{remainingTime}</Text>
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
