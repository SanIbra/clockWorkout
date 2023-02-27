
import React, { Component } from 'react';
import { Button, TextInput, Text, StyleSheet, View } from 'react-native';
import { TimerSession } from './TimerSession';

interface SetUpState {
    nombreRep: number,
    tpsRepos: number,
    tpsEffort: number
}
export class SetUpScreen extends Component<{ navigation }, SetUpState> {

    static propTypes = {
    }


    constructor(props) {
        super(props);
        this.state = {
            nombreRep: 3,
            tpsRepos: 3,
            tpsEffort: 5
        };

        this.launchTimer.bind(this);
    }

    render() {
        const toInt = nb => {
            if (!nb) {
                return 0;
            }
            return parseInt(nb);
        }

        const input = (title, updateFonction, initialValue) => <View>
            <Text style={[this.styles.text, { color: 'blue' }]} >{title} </Text>
            <TextInput
                defaultValue={initialValue + ""}
                onChangeText={updateFonction}
                placeholderTextColor="#60605e"
                keyboardType={'numeric'}
            />
        </View>;

        return (
            <View style={[this.styles.center]}>
                {
                    input('Nombre de répétition( en secondes )',
                        input => this.setState({ nombreRep: toInt(input) }),
                        this.state.nombreRep)
                }
                {
                    input("Durée de l'exercice( en secondes )",
                        input => this.setState({ tpsEffort: toInt(input) }),
                        this.state.tpsRepos)
                }
                {
                    input("Durée de recuperation( en secondes )",
                        input => this.setState({ tpsRepos: toInt(input) }),
                        this.state.tpsEffort)
                }
                <View>
                    <Button
                        title='Lancer la session'
                        onPress={() => this.launchTimer()}
                    />
                </View>
            </View >);
    }
    navigation: any;

    launchTimer() {

        this.props.navigation.navigate('Chrono', {
            nombreRep: this.state.nombreRep,
            tpsRepos: this.state.tpsRepos,
            tpsEffort: this.state.tpsEffort
        });
    }

    styles = StyleSheet.create({
        center: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: 24
        }
    })
}


export default SetUpScreen;