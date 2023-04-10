import { Sound } from 'expo-av/build/Audio';
import React, { useEffect, useRef, useState } from 'react';
import { Text, AppState, StyleSheet, View, Platform } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { FontAwesome } from '@expo/vector-icons';
import { TimerSession } from './TimerSession';
import { colorPanel } from './Constants';
import { Button } from 'react-native-paper';
import { AVPlaybackStatusSuccess } from 'expo-av';
import { AVPlaybackStatus } from 'expo-av/build/AV.types';
// import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { EventEmitter, Subscription, UnavailabilityError } from 'expo-modules-core';

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

const BACKGROUND_FETCH_TASK = "TIMER_TASK_BACKGROUND";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function Timer({ route }) {

    const programme: TimerSession = route.params;
    const sessions: Session[] = [];
    const [indexSession, setIndexSession] = useState(0);
    const [lastSerie, setLastSerie] = useState(false);
    const [appState, setAppState] = useState(AppState.currentState);


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(null);
    const notificationListener: React.MutableRefObject<Subscription> = useRef();
    const responseListener: React.MutableRefObject<Subscription> = useRef();
    const appStateSubscription: React.MutableRefObject<Subscription> = useRef();



    useEffect(() => {

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
            setIsPlaying(false);

            console.log("Passer la ");
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });


        // this.appStateSubscription TODO voir comment stocker cette event
        appStateSubscription.current = AppState.addEventListener(
            'change',
            nextAppState => {
                console.log('YOOOOLLOOOOOO', appState, "___", nextAppState, new Date());
                if (
                    (appState === "active") &&
                    nextAppState === 'background'
                ) {
                    console.log('App has come to the background!',tempsRestant);
                    // registerBackgroundFetchAsync();

                    // if (isPlaying)
                    schedulePushNotification(tempsRestant, "Time's up !!! ");// sessions[indexSession].titre);

                }
                setAppState(nextAppState);
            },
        );


        return () => {
            console.log("UNMONT?")
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
            appStateSubscription.current?.remove();;
        };



    }, []);


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
    const [tempsExercice, setTempsExercice] = useState(sessions[0].temps);
    const [tempsRestant, setTempsRestant] = useState(sessions[0].temps);

    const onFinish = () => {
        var next = indexSession + 1;
        if (next == sessions.length) {
            setLastSerie(true)
            return;
        }
        setIndexSession(indexSession => indexSession + 1);
        setTempsExercice(sessions[next].temps)

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
                    duration={tempsExercice}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[7, 5, 2, 0]}

                    onComplete={total => { timeUp(); }}
                    onUpdate={remainingTime => { console.log(remainingTime), setTempsRestant(remainingTime) }}
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


async function schedulePushNotification(tempsRestant: number, message: string) {
    console.log("===>", tempsRestant);
    await Notifications.scheduleNotificationAsync({
        content: {
            title: message,
            body: 'Retourner sur l\'application pour poursuivre votre session',
            sound: "./../assets/sounds/bell.mp3",
            // sound: true
        },
        trigger: { seconds: tempsRestant },
    });
}

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    // if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    // } else {
    //     alert('Must use physical device for Push Notifications');
    // }

    return token;
}
