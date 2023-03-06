
import React, { Component } from 'react';
import { Button, TextInput, Text, StyleSheet, View, Pressable } from 'react-native';
import { colorPanel } from '../components/Constants';
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
                    {
                        input('Nombre de séries',
                            input => this.setState({ nombreRep: toInt(input) }),
                            this.state.nombreRep)
                    }
                    {
                        input("Durée d'effort (en secondes)",
                            input => this.setState({ tpsEffort: toInt(input) }),
                            this.state.tpsRepos)
                    }
                    {
                        input("Durée de récuperation (en secondes)",
                            input => this.setState({ tpsEffort: toInt(input) }),
                            this.state.tpsEffort)
                    }
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


export default SetUpScreen;