import { Sound } from 'expo-av/build/Audio';
import React, { Component, Provider } from 'react';
import { Button, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { FontAwesome } from '@expo/vector-icons';

type TimerProps = {
    timer: number,
    additionalTime: number
}
type TimerState = {
    timerRemaining: number,
    timerRemainingSave: number,
    isPlaying: boolean,
    subTitle: string
}


export class Timer extends Component<TimerProps, TimerState> {

    static propTypes = {
        timer: PropTypes.number,
        additionalTime: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            timerRemaining: props.timer,
            timerRemainingSave: props.timer,
            isPlaying: false,
            subTitle: "Start"
        };
        console.log(super.props)
    }

    async timeUp(): Promise<void> {
        const sound = new Sound();
        await sound.loadAsync(require('./../assets/sounds/beep-beep.mp3'));
        await sound.playAsync();
        setTimeout(() => sound.unloadAsync(), 1000)
        this.reset();
    }

    componentDidMount() {
    }

    start() {
        this.setState({
            subTitle: "Pause"
        })
    }

    stop() {

        this.setState({
            subTitle: "Start"
        })
    }



    onPressTimerButton() {
        const isRunningPreState = !this.state.isPlaying;
        if (isRunningPreState) {
            this.start();
        } else {
            this.stop();
        }
        this.setState({ isPlaying: isRunningPreState });
    }

    componentWillUnmount() {
        this.stop();
    }

    addAdditionalTime() {
        this.setState({ timerRemaining: this.state.timerRemainingSave + this.props.additionalTime })
    }

    reset() {
        this.stop()
        this.setState({ isPlaying: false, timerRemaining: this.props.timer })
        this.render();
    }

    render() {
        return (
            <View style={[this.styles.center]}>
                <View >
                    <CountdownCircleTimer
                        isPlaying={this.state.isPlaying}
                        duration={this.props.timer}
                        initialRemainingTime={this.state.timerRemaining}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={total => { this.timeUp(); return { shouldRepeat: true } }}
                        onUpdate={remainingTime => { this.setState({ timerRemainingSave: remainingTime }) }}
                    >
                        {({ remainingTime }) => (
                            <View>
                                <Text adjustsFontSizeToFit>{remainingTime}</Text>
                            </View>)
                        }
                    </CountdownCircleTimer>
                </View>
                <View >
                    {this.state.isPlaying ?
                        <FontAwesome name="pause" size={24} color="black" onPress={() => this.onPressTimerButton()} />
                        :
                        <FontAwesome name="play" size={24} color="black" onPress={() => this.onPressTimerButton()} />
                    }
                </View>
                {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                    <FontAwesome name="repeat" size={24} color="black" onPress={() => this.reset()} />
                </View> */}

            </View >);
    }


    styles = StyleSheet.create({
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
}


export default Timer;