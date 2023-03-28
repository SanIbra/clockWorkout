
import React, { Component } from 'react';
import { Switch, TextInput, StyleSheet, View } from 'react-native';
import { colorPanel } from '../components/Constants';
import { FAB, Text, TouchableRipple } from 'react-native-paper';

import { TimeUtils } from './utils/TimeUtils';
import { IconButton, MD3Colors } from 'react-native-paper';

interface SetUpState {
    nombreRep: number,
    tpsRepos: number,
    tpsEffort: number,
    isTpsReposIndertermine: boolean,
    isTpsEffortIndertermine: boolean
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
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#cacbcc',
            textAlign: 'center'
        },
        launchButton: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorPanel.main,
            height: '90%',
            width: '90%',
            borderRadius: 50,
            elevation: 10,
        },
        addFab: {}

    })


    constructor(props) {
        super(props);
        this.state = {
            nombreRep: 3,
            tpsRepos: 3,
            tpsEffort: 5,
            isTpsEffortIndertermine: false,
            isTpsReposIndertermine: false
        };
    }

    render() {
        const toInt = nb => !nb ? 0 : parseInt(nb)

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
                        updateFonction={(input, bool) => this.setState({ tpsEffort: toInt(input), isTpsEffortIndertermine: bool })}
                        initialValue={this.state.tpsEffort}
                        isTempsInterdermine={this.state.isTpsEffortIndertermine}
                    />
                    <InputTime
                        title="Durée de récuperation (en secondes)"
                        updateFonction={(input, bool) => this.setState({ tpsRepos: toInt(input), isTpsReposIndertermine: bool })}
                        initialValue={this.state.tpsRepos}
                        isTempsInterdermine={this.state.isTpsReposIndertermine}
                    />
                </View>
                {/* <FAB
                    icon="plus"
                    style={this.styles.addFab}
                    onPress={() => this.props.navigation.navigate('Créer session personnalisé')}
                /> */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', width: '100%' }}>
                    <TouchableRipple
                        style={this.styles.launchButton}
                        onPress={() => this.launchTimer()}
                        rippleColor={colorPanel.main}
                    >
                        <Text style={{ color: "white", fontSize: 20 }}>Lancer la session</Text>
                    </TouchableRipple>
                </View>
            </View >);
    }


    launchTimer() {
        this.props.navigation.navigate('Chrono', {
            nombreRep: this.state.nombreRep,
            tpsRepos: this.state.tpsRepos,
            tpsEffort: this.state.tpsEffort,
            isTpsReposIndertermine: this.state.isTpsReposIndertermine,
            isTpsEffortIndertermine: this.state.isTpsEffortIndertermine
        });
    }

}



interface InputTimeProps {
    title: string,
    updateFonction: (newValue: number, isTempsInterdermine) => void,
    initialValue: number,
    isTempsInterdermine: boolean
}
export function InputTime({ title, updateFonction, initialValue, isTempsInterdermine }: InputTimeProps) {

    const styles = StyleSheet.create({
        text: {
            fontSize: 24,
            color: colorPanel.main
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
        }
    })


    const initialValueNumber = initialValue ? initialValue : 0;
    const [secondes, setSecondes] = React.useState(TimeUtils.getSecondesOfTime(initialValueNumber) + "");
    const [minutes, setMinutes] = React.useState(TimeUtils.getMinutesOfTime(initialValueNumber) + "");

    const convertToNumber = (minutesString) => {
        const num = parseInt(minutesString);
        return isNaN(num) ? 0 : num;
    };
    const setUpTime = (minutes: string, secondes: string) => {
        const newVal = TimeUtils.convertToTime(convertToNumber(minutes), convertToNumber(secondes));
        const newMinutes = TimeUtils.getMinutesOfTime(newVal);
        const newSecondes = TimeUtils.getSecondesOfTime(newVal);
        setMinutes(newMinutes + "");
        setSecondes(newSecondes + "")
        updateFonction(newVal, !!isTempsInterdermine);
    }




    const addTime = (nbSec: number) => {

        setSecondes(sec => {
            var newSec = convertToNumber(sec) + nbSec;
            if (minutes == "0" && newSec < 0) {
                return sec;
            }
            setUpTime(minutes, newSec + "");
            return newSec + "";
        })
    };


    const clearInput = (input: string): string => {
        if (!input) {
            return "";
        }
        return [...input.trim()].filter(c => c >= '0' && c <= '9').join("")
    }

    const updateTempsIndetermine = (newV) => {
        const newVal = TimeUtils.convertToTime(convertToNumber(minutes), convertToNumber(secondes));
        updateFonction(newVal, newV);
    }

    return (
        <View style={{ alignItems: 'center' }} >
            <View >
                <Text style={[styles.text, { marginBottom: 4 }]} >{title} </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Switch
                    onValueChange={updateTempsIndetermine}
                    value={isTempsInterdermine}
                />
                <Text style={[styles.text, { height: '100%', textAlignVertical: 'center' }]}> sans durée</Text>

            </View>
            {isTempsInterdermine ? null : <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton
                    icon="minus-circle-outline"
                    iconColor={MD3Colors.primary0}
                    size={24}
                    onPress={() => addTime(-1)}
                />
                <View style={styles.selectTime}>
                    <TextInput
                        style={[styles.inputTimeStyle]}
                        defaultValue={minutes}
                        onChangeText={(newValue) => { setUpTime(clearInput(newValue), secondes) }}
                        placeholderTextColor="#60605e"
                        keyboardType={'numeric'}
                    />
                    <Text style={styles.text}>:</Text>
                    <TextInput
                        style={[styles.inputTimeStyle]}
                        defaultValue={secondes}
                        onChangeText={(newValue) => { setUpTime(minutes, clearInput(newValue)) }}
                        placeholderTextColor="#60605e"
                        keyboardType={'numeric'}
                    />
                </View>
                <IconButton
                    icon="plus-circle-outline"
                    iconColor={MD3Colors.primary0}
                    size={24}
                    onPress={() => addTime(+1)}
                />
            </View>}
        </View >);
}

export default SetUpScreen;