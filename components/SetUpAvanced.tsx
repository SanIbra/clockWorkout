
// import React, { Component, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { colorPanel } from '../components/Constants';
// import { FAB, Text, TextInput, TouchableRipple } from 'react-native-paper';

// import { TimeUtils } from './utils/TimeUtils';
// import { IconButton, MD3Colors } from 'react-native-paper';
// import { InputTime } from './SetUpScreen';

export function SetUpAdvanced() {
    return (<View ></View>);
}

// export function SetUpAdvanced() {
//     const [nbSerie, setNbSerie] = useState("3");
//     const [etapes, setEtapes] = useState([] as Etape[]);

//     return (
//         <View>
//             <TextInput
//                 value={nbSerie}
//                 onChangeText={t => setNbSerie(t)}
//             />
//             <ScrollView>
//                 <Programme
//                     programme={etapes}
//                     update={e => setEtapes(e)}
//                 />
//                 <FAB
//                     icon={"plus"}
//                     label="Ajouter un temps d'effort"
//                     onPress={() => setEtapes(etapes => {
//                         var newEtape = [...etapes]
//                         newEtape.push({ titre: "Effort", temps: 30, arretInderteminer: false });
//                         return newEtape;
//                     })}
//                 />


//                 <FAB
//                     icon={"plus"}
//                     label="Ajouter un repos"
//                     onPress={() => setEtapes(etapes => {
//                         var newEtape = [...etapes]
//                         newEtape.push({ titre: "Repos", temps: 30, arretInderteminer: false });
//                         return newEtape;
//                     })}
//                 />


//                 <FAB
//                     icon={"plus"}
//                     label="Ajouter un effort/pause indeterminé"
//                     onPress={() => setEtapes(etapes => {
//                         var newEtape = [...etapes]
//                         newEtape.push({ titre: "Arret indeterminer", temps: 5, arretInderteminer: true });
//                         return newEtape;
//                     })}
//                 />
//                  <FAB
//                     icon={"check"}
//                     label="Valider"
//                     onPress={() => setEtapes(etapes => {
//                         var newEtape = [...etapes]
//                         newEtape.push({ titre: "Arret indeterminer", temps: 5, arretInderteminer: true });
//                         return newEtape;
//                     })}
//                 />
//             </ScrollView>

//         </View>)
// }

// export interface Etape {
//     titre: string;
//     temps: number;
//     arretInderteminer: boolean;

// }
// export interface Programme {
//     programme: Etape[];
//     update: ((n: Etape[]) => void)
// }
// export function Programme({ programme, update }: Programme) {


//     return (<ScrollView>
//         {
//             programme.map(etape =>
//                 <ScrollView>
//                     <Text>{etape.titre}</Text>
//                     {etape.arretInderteminer ? <View /> : <InputTime
//                         title=''
//                         initialValue={30}
//                         updateFonction={newVal => { etape.temps = newVal; update([...programme]) }}
//                     />}
//                     <FAB icon="delete"
//                         onPress={() => update(programme.filter(e => e !== etape))} />
//                 </ScrollView>)
//         }
//     </ScrollView>)

// }



export default SetUpAdvanced;