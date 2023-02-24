import { Sound } from 'expo-av/build/Audio';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export class Timer extends Component {
    interval;

    constructor(props) {
        super(props);
        this.state = {
            timer: props.timer,
            isRunning: false,
            subTitle: "Start"
        };
    }

    async timeUp() {
        const sound = new Sound();
        await sound.loadAsync(require('./../assets/sounds/beep-beep.mp3'));
        await sound.playAsync();
        setTimeout(() => sound.unloadAsync(), 1000)
    }

    componentDidMount() {
        if (this.props.isRunning) {
            this.start();
        }
    }

    start() {
        this.interval = setInterval(
            () => this.tick(),
            1000
        );

        this.setState({
            subTitle: "Pause"
        })
    }

    stop() {
        clearInterval(this.interval);
        this.setState({
            subTitle: "Start"
        })
    }



    onPressTimerButton() {
        const isRunningPreState = !this.state.isRunning;
        if (isRunningPreState) {
            this.start();
        } else {
            this.stop();
        }
        this.setState({ isRunning: isRunningPreState });
    }

    componentDidUpdate(prevProps) {

        if (prevProps.isRuning != this.props.isRuning) {
            if (this.props.isRuning) {
                this.start();
            } else {
                this.stop();
            }
        }
        if (this.sound)
            this.sound.unloadAsync();
    }

    componentWillUnmount() {
        this.stop();
    }

    tick() {
        if (this.state.timer <= 1) {
            this.timeUp();
            this.reset();
        }else{
            this.setState({ timer: this.state.timer - 1 })
        }
    }

    addAdditionalTime() {
        this.setState({ timer: this.state.timer + this.props.additionalTime })
    }

    reset() {
        this.stop()
        this.setState({ timer: this.props.timer })
    }

    render() {
        return (
            <View>
                <View>
                    <RoundButton
                        style={{
                            width: 200,
                            height: 200
                        }}
                        onPress={() => this.onPressTimerButton()}
                        title={this.state.timer}
                        subTitle={this.state.subTitle}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <RoundButton
                        onPress={() => this.addAdditionalTime()}
                        title={"+" + this.props.additionalTime}
                    />

                    <RoundButton
                        onPress={() => this.reset()}
                        title="reset"
                    />
                </View>
            </View >);
    }
}

const RoundButton = (props) => {
    const mainColor = 'green';
    const style = props.style ? props.style : {};
    const roundButton1 = {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,

        textAlign: 'center',
        backgroundColor: mainColor,
        mainColor: 'black'
    }

    return (
        <TouchableOpacity
            style={[roundButton1, style]}
            onPress={props.onPress}>
            <Text style={{ color: 'black', textAlign: 'center' }}>{props.title}{props.subTitle ? "\n" : ""}{props.subTitle}</Text>
        </TouchableOpacity>
    )
}

export default Timer;