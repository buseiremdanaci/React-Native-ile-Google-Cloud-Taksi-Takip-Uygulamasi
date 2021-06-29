import React, {Component} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Button,Dimensions} from 'react-native'
import {ActionSheet,Root} from "native-base";
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { DataTable } from 'react-native-paper';

let originCoord ={latitude : 0,longitude: 0};
let destinationCoord ={latitude : 0,longitude: 0};
const GOOGLE_MAPS_APIKEY = 'AIzaSyDrktcllDab8p4EwUzAUpYlzAYSx8CUGek';
class GoogleMaps extends React.Component{

    render(){
        return(
        <View style = {styles.container}>
         <MapView
         style = {styles.mapStyle}
        initialRegion={{
          latitude: global.origin.latitude,
          longitude: global.origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
        <MapView.Marker  coordinate={global.origin} />
        <MapView.Marker coordinate={global.destination} />
         <MapViewDirections
                   origin={global.origin}
                   destination={global.destination}
                   apikey={'AIzaSyDrktcllDab8p4EwUzAUpYlzAYSx8CUGek'} // insert your API Key here
                   strokeWidth={4}
                   strokeColor="#111111"
                 />
        </MapView>
         <DataTable>
                                    <DataTable.Header>
                                      <DataTable.Title style={{ position: 'absolute',top:0, left:5,width: 304,height: 95}}>Başlangic Konum</DataTable.Title>
                                      <DataTable.Title style={{ position: 'absolute',top:0, left:157,width: 100,height: 95}}>Bitis Konum</DataTable.Title>
                                      <DataTable.Title style={{ position: 'absolute',top:0, right:-10,width: 100,height: 95}}>Mesafe</DataTable.Title>
                                    </DataTable.Header>
                                        <DataTable.Row  >
                                                      <DataTable.Cell style={{ position: 'absolute',top:-25, left:-10,width: 304,height: 95}} >{global.source}</DataTable.Cell>
                                                      <DataTable.Cell style={{ position: 'absolute',top:-25, left:135,width: 200,height: 95}}>{global.finish}</DataTable.Cell>
                                                      {global.secici == false ?
                                                      <DataTable.Cell style={{ position: 'absolute',top: -25, right: -25,width: 100,height: 95}}>{global.mesafe} </DataTable.Cell> :
                                                      <DataTable.Cell style= {{ position: 'absolute',top: -25, right: -30,width: 100,height: 95}}>{global.mesafe2} </DataTable.Cell> }
                                        </DataTable.Row>

                                  </DataTable>
        </View>


        );
    }
}

const styles = StyleSheet.create({

    mapStyle:{
          height : 550
    },
    container:{
         height : 400
    },
    txtStyle:{
      color:'#ffffff'
    },

    map: {
      ...StyleSheet.absoluteFillObject,
    }

});

export default GoogleMaps;