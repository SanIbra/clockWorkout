
import React, { Component } from 'react';
import { Button, TextInput, Text, StyleSheet, View } from 'react-native';

interface SetUpState {
    nombreRep: number,
    tpsRepos: number,
    tpsEffort: number
}
export class SetUpScreen extends Component<{}, SetUpState> {

    static propTypes = {
    }

    constructor(props) {
        super(props);
        this.state = {
            nombreRep: 3,
            tpsRepos: 15,
            tpsEffort: 45
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

        const input = (title, updateFonction) => <View>
            <Text style={[this.styles.text, { color: 'blue' }]} >{title} </Text>
            <TextInput
                defaultValue='00'
                onChangeText={updateFonction}
                placeholderTextColor="#60605e"
                keyboardType={'numeric'}
            />
        </View>;

        return (
            <View style={[this.styles.center]}>
                {
                    input('Nombre de répétition( en secondes )',
                        input => this.setState({ nombreRep: toInt(input) }))
                }
                {
                    input("Durée de l'exercice( en secondes )",
                        input => this.setState({ tpsEffort: toInt(input) }))
                }
                {
                    input("Durée de recuperation( en secondes )",
                        input => this.setState({ tpsRepos: toInt(input) }))
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
        // lancer
        // const navigation = useNavigation();
        // console.log(navigation)
        // navigation.navigate('Chrono');
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