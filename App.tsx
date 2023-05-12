import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Timer from './components/Timer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetUpScreen from './components/SetUpScreen';
import { Provider as PaperProvider, Text } from 'react-native-paper';
import SetUpAdvanced from './components/SetUpAvanced';
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// La clé est générer sur le site de AdMob. Attention ce n'est pas l'id de l'application mais de la bannière!! 
const adUnitId = /*__DEV__ ? TestIds.BANNER : */ "ca-app-pub-5268342870975556/4105531192";
const mockBannerAd = false && __DEV__;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: 'red',
    borderRadius: 4
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
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    // Fonctionne sans... Je ne sais pas à quoi ça sert
    if (!mockBannerAd)
      mobileAds()
        .initialize()
        .then(adapterStatuses => {
          // console.trace(adapterStatuses);
        });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style='auto' />
        <Stack.Navigator>
          <Stack.Screen name="Préparation" component={SetUpScreen} />
          <Stack.Screen name="Chrono" component={Timer} />
          <Stack.Screen name="Créer session personnalisé" component={SetUpAdvanced} />
        </Stack.Navigator>
      </NavigationContainer>
      {mockBannerAd && __DEV__ ?
        <Text style={{ height: 60, textAlign: 'center', backgroundColor: 'gray', fontSize: 20 }} >Espace publicité</Text>
        :
        <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }} />
      }
    </PaperProvider>
  )
}