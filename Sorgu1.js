import React, {Component} from 'react'
import {ActivityIndicator,View,Text,StyleSheet,FlatList,TouchableOpacity,Button,Dimensions} from 'react-native'
import {ActionSheet,Root} from "native-base";
import MapView from 'react-native-maps';
import { DataTable } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let veri = new Array();
//SELECT SUBSTR(CAST(tpep_pickup_datetime AS STRING),0,10) AS baslangic,SUBSTR(CAST(tpep_pickup_datetime AS STRING),0,10) AS bitis,trip_distance FROM`alpine-realm-310718.taxi.yellow` ORDER BY trip_distance DESC LIMIT 5;

class Sorgu1 extends React.Component{
constructor(props){
    super(props);
     this.state = {
      data:[],
      isLodaing:true,
      isClick:false,
      isFailed:false
    }

  }


arrayToObject = (arr) =>{
return (
        {"tpep_pickup_datetime": arr[0].v, "tpep_dropoff_datetime":arr[1].v, "trip_distance":arr[2].v}
       )
}
async submitToGoogle (jobId) {
     this.setState({isClick:true});
     const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      await delay(1000);
    veri = new Array();
    let urlMain = "https://bigquery.googleapis.com/bigquery/v2/projects/alpine-realm-310718/queries/";
    let url = urlMain+jobId

    let response = await fetch(
       url,
      {
        headers: {
          Authorization: `${global.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }
    );
     console.log(response.status);
     if(response.status == 200){
              this.setState({isFailed:false})
        }else{
              this.setState({isClick:false});
              this.setState({isFailed:true})
     }
    let responseJson = await response.json();
    console.log(responseJson);


    //this.setState({data:responseJson.rows})
    let uzunluk = responseJson["totalRows"];
       for(let i = 0 ; i < uzunluk ; i++){
                    let rows = this.arrayToObject(responseJson["rows"][i].f);
                   veri.push(rows);
       }
        this.setState({data:veri})
        if(veri.length != 0){
        this.setState({isLodaing:false})
        }


  };
    render(){

    let {content,btnPressStyle,txtStyle} = styles ;
    return(
        <View >
    <TouchableOpacity style ={styles.btnPressStyle0}>
         <Text style= {txtStyle}>  En uzun mesafeli 5 yolculuktaki gun ve mesafeleri listesi.</Text></TouchableOpacity>



        {this.state.isLodaing == false ?
                      <DataTable style ={{top:10}}>
                                  <DataTable.Header>
                                    <DataTable.Title style={{paddingLeft:70}}>Baslangic Tarih</DataTable.Title>
                                    <DataTable.Title style={{paddingLeft:30}}>Mesafe</DataTable.Title>
                                  </DataTable.Header>
                                   {this.state.data.map((item,index) => (
                                      <DataTable.Row key = {index} style={{ borderBottomWidth: 0 }}>
                                                    <DataTable.Cell style={{paddingLeft:75}} >{item.tpep_pickup_datetime}</DataTable.Cell>
                                                    <DataTable.Cell >{item.trip_distance} </DataTable.Cell>
                                      </DataTable.Row>
                                          ))}

                      </DataTable>
                      :

                      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        {this.state.isFailed == true ? <TouchableOpacity style ={styles.error}>
                                                                <Text style= {styles.errorTxt}>Api isteğinde sorun oluştu</Text></TouchableOpacity> : null}
                       <ActivityIndicator style={{top:windowHeight/4}}animating={this.state.isClick} size="large" color="#0000ff" />

                      <TouchableOpacity   onPress={() => this.submitToGoogle(global.jobId1)} style ={btnPressStyle}>
                                      <Text style= {txtStyle}>Sorguyu Çalıştır </Text>
                                      </TouchableOpacity>


                      </View>




                      }

        </View>

    );

    }

}

const styles = StyleSheet.create({
  content:{
     flex:1,
     alignItems:'center',
     marginTop:50,
     paddingLeft:30,
     paddingRight:30,
     marginBottom:30
    },
     btnPressStyle0:{
          backgroundColor:'#ffffff',
          height:200,
          width: windowWidth,
          alignItems :'center',
          justifyContent:'center',
          alignContent:'center',
          top:0
        },
       error:{
                height:20,
                width: windowWidth,
                alignItems :'center',
                justifyContent:'center',
                alignContent:'center',
                top:windowWidth-170
              },
       errorTxt:{
                 color:'red',
                  fontSize:16,
                              fontFamily:'Iowan Old Style',
                              textAlign:'center'
              },
     btnPressStyle:{
         backgroundColor:'#ffffff',
         height:90,
         width: windowWidth,
         alignItems :'center',
         justifyContent:'center',
       alignContent:'center',
           top:415
       },
    mapStyle:{
        flex:1,
    },
    txtStyle:{
       color:'#686868',
              fontSize:16,
              fontFamily:'Iowan Old Style',
              textAlign:'center'
    },
     txtStyle2:{
           color:'#888888',
                  fontSize:16,
                  fontFamily:'Iowan Old Style',
                  textAlign:'center',
                  top: windowHeight/4
        },
    itemImage:{
      height:250,
      width: 250,
      borderRadius:8,
      resizeMode:'contain'
    },
    itemViewImage:{
      alignItems: 'center',
      borderRadius:8,
      marginTop:10
    },


});
export default Sorgu1;