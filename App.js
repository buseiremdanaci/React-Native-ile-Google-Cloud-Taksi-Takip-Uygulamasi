import React, {Component} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Button,Dimensions} from 'react-native'
import {ActionSheet,Root} from "native-base";
import MapView from 'react-native-maps';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Sorgu1 from './Sorgu1'
import Mobil_Sorgular from './MobilSorgular'
import Sorgu2 from './Sorgu2'
import Sorgu3 from './Sorgu3'
import GoogleMaps from './GoogleMaps'


const RootStack = createStackNavigator(

 {
  Mobil_Sorgular: Mobil_Sorgular,
  Tip1: Sorgu1,
  Tip2: Sorgu2,
  Tip3: Sorgu3,
  Google_Map:GoogleMaps
 },
 {
  initialRouteName: 'Mobil_Sorgular',
 }
);
const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
constructor(props){
       super(props);
       global.token ='Bearer ya29.a0AfH6SMAPugbUfrb8_81xVwER4Htl-XR8x8qm3WOgRF1ulLTI2rEe7xPpeMyFD-1igTckiXbmcpo5fY99B8SlEA4W10m7J7ACwrBqH54mmrpopvMQexfUb6lFn6hoF7wZ9sZEbp97ffbcay202mJcTgS92NnO';
       global.jobId1='bquxjob_41fc11df_17901d47d7e';
       global.jobId2='bquxjob_4df246df_17901d4991a';
       global.jobId3='bquxjob_1d2f95b4_17901d83323';
       global.jobId4='bquxjob_2a0ddafb_17901d4e37d';
     }
  render() {
    return <AppContainer />;
  }
}