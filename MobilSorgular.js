import React, {Component} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Button,Dimensions,Image} from 'react-native'
import {ActionSheet,Root} from "native-base";
import MapView from 'react-native-maps';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class HomeScreen extends React.Component{
    render(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style ={styles.btnPressStyle0}>
            <Image
            style= {styles.imageStyle}
            source={require('./taxi.jpg')}/>

                                    </TouchableOpacity>
            <TouchableOpacity   onPress={() =>this.props.navigation.navigate('Tip1') } style ={styles.btnPressStyle}>
                            <Text style= {styles.txtStyle}>MESAFE ANALİZİ</Text>
                                    </TouchableOpacity>

              <TouchableOpacity   onPress={() =>this.props.navigation.navigate('Tip2') } style ={styles.btnPressStyle2}>
                                          <Text style= {styles.txtStyle}>ÜCRET ANALİZİ</Text>
                                                  </TouchableOpacity>

              <TouchableOpacity   onPress={() =>this.props.navigation.navigate('Tip3') } style ={styles.btnPressStyle3}>
                                          <Text style= {styles.txtStyleacik}>ROTA</Text>
                                                  </TouchableOpacity>
            </View>
        );


    }

}
const styles = StyleSheet.create({
    btnPressStyle0:{
      backgroundColor:'#000000',
      height:250,
      width: 360,
      alignItems :'center',
      justifyContent:'center',
    alignContent:'center'
    },
    btnPressStyle:{
      backgroundColor:'#ffffff',
      height:(windowHeight-250)/3,
      width: windowWidth,
      alignItems :'center',
      justifyContent:'center',
    alignContent:'center',
        top:0
    },
    txtStyleacik:{
          color:'#888888',
            fontSize:17,
            fontFamily:'Iowan Old Style'
        },
    btnPressStyle2:{
      backgroundColor:'#b0b0b0',
      height:(windowHeight-250)/3,
      width: windowWidth,
      alignItems :'center',
      justifyContent:'center',
    alignContent:'center',
        top:0
    },
    btnPressStyle3:{
      backgroundColor:'#282828',
      height:(windowHeight-250)/3,
      width: windowWidth,
      alignItems :'center',
      justifyContent:'center',
     alignContent:'center',
        top:0
    },
    txtStyle:{
      color:'#383838',
        fontSize:17,
        fontFamily:'Iowan Old Style'
    },


});
export default HomeScreen;
