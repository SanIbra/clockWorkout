
import React, { Component } from 'react';
import { Button, TextInput, Text, StyleSheet, View, Pressable } from 'react-native';
import { colorPanel } from '../components/Constants';
import { TimeUtils } from './utils/TimeUtils';
interface SetUpState {
    nombreRep: number,
    tpsRepos: number,
    tpsEffort: number
}
export class SetUpScreen extends Component<{ navigation }, SetUpState> {

    static propTypes = {
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 24,
            color: colorPanel.main
        },
        inputStyle: {
            fontSize: 24,
            width: '50%',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: 'grey',
            textAlign: 'center'
        },
        launchButton: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorPanel.main,
            height: '90%',
            width: '90%',
            borderRadius: 10,
            elevation: 10,
        }

    })


    constructor(props) {
        super(props);
        this.state = {
            nombreRep: 3,
            tpsRepos: 3,
            tpsEffort: 5
        };
    }

    render() {
        const toInt = nb => {
            if (!nb) {
                return 0;
            }
            return parseInt(nb);
        }

        const input = (title, updateFonction, initialValue) => <View style={{ alignItems: 'center' }}>
            <Text style={[this.styles.text, { marginBottom: 4 }]} >{title} </Text>
            <TextInput
                style={[this.styles.inputStyle]}
                defaultValue={initialValue + ""}
                onChangeText={updateFonction}
                placeholderTextColor="#60605e"
                keyboardType={'numeric'}
            />
        </View>;

        return (
            <View style={[this.styles.container]}>
                <View style={{ flex: 3, justifyContent: "space-evenly", width: '90%' }}>
                    {/* Serie */}
                    <View style={{ alignItems: 'center' }} >
                        <Text style={[this.styles.text, { marginBottom: 4 }]} >Nombre de séries</Text>
                        <TextInput
                            style={[this.styles.inputStyle]}
                            defaultValue={this.state.nombreRep + ""}
                            onChangeText={input => this.setState({ nombreRep: toInt(input) })}
                            placeholderTextColor="#60605e"
                            keyboardType={'numeric'}
                        />
                    </View>

                    <InputTime
                        title="Durée d'effort (en secondes)"
                        updateFonction={input => this.setState({ tpsEffort: toInt(input) })}
                        initialValue={this.state.tpsEffort}
                    />
                    <InputTime
                        title="Durée de récuperation (en secondes)"
                        updateFonction={input => this.setState({ tpsRepos: toInt(input) })}
                        initialValue={this.state.tpsRepos}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', width: '100%' }}>
                    <Pressable
                        style={this.styles.launchButton}
                        onPress={() => this.launchTimer()}
                    >
                        <Text style={{ color: "white", fontSize: 20 }}>Lancer la session</Text>
                    </Pressable>
                </View>
            </View >);
    }


    launchTimer() {
        this.props.navigation.navigate('Chrono', {
            nombreRep: this.state.nombreRep,
            tpsRepos: this.state.tpsRepos,
            tpsEffort: this.state.tpsEffort
        });
    }

}


export function InputTime({ title, updateFonction, initialValue }) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 24,
            color: colorPanel.main
        },
        inputStyle: {
            fontSize: 24,
            width: '50%',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: 'grey',
            textAlign: 'center'
        },
        selectTime: {
            width: '50%',
            flexDirection: 'row',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: 'grey',
            textAlign: 'center'

        },
        inputTimeStyle: {
            fontSize: 24,
            width: '50%',
            borderWidth: 0,
            borderRadius: 10,
            borderColor: 'grey',
            textAlign: 'center'
        },
        launchButton: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorPanel.main,
            height: '90%',
            width: '90%',
            borderRadius: 10,
            elevation: 10,
        }

    })


    const initialValueNumber = initialValue ? initialValue : 0;
    const [secondes, setSecondes] = React.useState(TimeUtils.getSecondesOfTime(initialValueNumber));
    const [minutes, setMinutes] = React.useState(TimeUtils.getMinutesOfTime(initialValueNumber));

    const convertToNumber = (minutesString) => {
        const num = parseInt(minutesString);
        return isNaN(num) ? 0 : num;
    };
    const setUpTime = (minutes, secondes) => {
        const newVal = TimeUtils.convertToTime(minutes, secondes);
        console.log("new Val =", newVal);
        updateFonction(newVal);
    }
    return (
        <View style={{ alignItems: 'center' }} >
            <View>
                <Text style={[styles.text, { marginBottom: 4 }]} >{title} </Text>
            </View>
            <View style={styles.selectTime}>
            <TextInput
                style={[styles.inputTimeStyle]}
                defaultValue={minutes + ""}
                
                onChangeText={(newValue) => { var newMin = convertToNumber(newValue); setMinutes(newMin); setUpTime(newMin, secondes) }}
                placeholderTextColor="#60605e"
                keyboardType={'numeric'}
            />
            <Text style={styles.text}>:</Text>
            <TextInput
                style={[styles.inputTimeStyle]}
                defaultValue={secondes + ""}
                onChangeText={(newValue) => { var newSec = convertToNumber(newValue); setSecondes(newSec); setUpTime(minutes, newSec) }}
                placeholderTextColor="#60605e"
                keyboardType={'numeric'}
            />
        </View>
        </View >);
}

export default SetUpScreen;