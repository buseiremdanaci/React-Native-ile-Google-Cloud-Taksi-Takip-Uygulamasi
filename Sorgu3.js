import React, {Component} from 'react'
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Button,Dimensions,ActivityIndicator,Image} from 'react-native'
import {ActionSheet,Root} from "native-base";
import MapView from 'react-native-maps';
import { DataTable } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let origin = {latitude : 0,longitude: 0};
let destination = {latitude : 0,longitude:0};
let sayac = 0;
let baslangiclokid =0;
let baslangiclokSehir = "";
let bitislokid = 0;
let bitislokSehir = "";
let baslangiclokid2 = 0;
let baslangiclokSehir2 = "";
let bitislokid2 = 0;
let bitislokSehir2 = "";
let baslangiclokZone = "";
let bitislokZone = "";
let baslangiclokZone2 = "";
let bitislokZone2 = "";
let baslangicCoor = 0;
let bitisCoor  = 0;

class Sorgu3 extends React.Component{

/* (SELECT DISTINCT trip_distance,PULocationID,DOLocationID  FROM `alpine-realm-310718.taxi.yellow`  WHERE  trip_distance IN (SELECT MAX(trip_distance) FROM `alpine-realm-310718.taxi.yellow`WHERE passenger_count >= 3 )  UNION ALL
 SELECT DISTINCT trip_distance ,PULocationID,DOLocationID FROM `alpine-realm-310718.taxi.yellow` WHERE trip_distance IN (SELECT MIN(trip_distance) FROM `alpine-realm-310718.taxi.yellow`WHERE passenger_count >= 3 and trip_distance > 1.0)) ORDER BY trip_distance DESC LIMIT 2 ;
*/
// SELECT * FROM `alpine-realm-310718.taxi.lokasyon`;


constructor(props){
    super(props);
    global.secici = true;
    global.sehir ="";
    global.sehir2="";
    global.sehirbit="";
    global.sehirbit2="";
    global.mesafe="";
    global.mesafe2="";
    global.source="";
    global.finish = "";
    global.origin = {latitude : 0,longitude:0};;
    global.destination = {latitude : 0,longitude:0};;
    global.origin2 = {latitude : 0,longitude:0};;
    global.destination2 = {latitude : 0,longitude:0};;
     this.state = {
      data:[],
      data2:[],
      isLodaing:true,
      isClick:false,
      isFailed:false
    }

  }

 async submitToGoogleMaps(baslangic,bitis,mesafe){

          let url ="https://maps.googleapis.com/maps/api/directions/json?origin=";
          console.log(baslangic+" "+bitis);
          let parameter1= baslangic+"&destination=";
          let parameter2 = bitis;
          let parameter3 = "&mode=transit&key=AIzaSyDrktcllDab8p4EwUzAUpYlzAYSx8CUGek";
          let urlMain = url+parameter1+parameter2+parameter3;
          //console.log(urlMain);
          const resp = await fetch(urlMain);
          const respJson = await resp.json();
          //console.log(respJson.routes);
          console.log("--------------");
          console.log(respJson.routes[0].legs);
          console.log("---------------");
          console.log(respJson.routes[0].legs[0].start_location);
          console.log("---------------");
          console.log(respJson.routes[0].legs[0].end_location);
          baslangicCoor = respJson.routes[0].legs[0].start_location;
          bitisCoor = respJson.routes[0].legs[0].end_location;

            global.origin = {latitude : baslangicCoor.lat,longitude: baslangicCoor.lng};
                      global.destination = {latitude : bitisCoor.lat,longitude:bitisCoor.lng};
            global.source = baslangic;
            global.finish = bitis;
            if(mesafe == global.mesafe){
                global.secici = false;
            }else{
                global.secici = true;
            }
           this.props.navigation.navigate('Google_Map')




    }


arrayToObject = (arr) =>{
    if(sayac == 0){
    return(
                { "trip_distance":arr[0].v,"PULocationID":arr[1].v, "DOLocationID":arr[2].v}
         )
    }
    if(sayac == 2){
        return(
                  {"LocationID":arr[0].v,"Borough":arr[1].v,"Zone":arr[2].v}
       )
    }

}

async submitToGoogle2 (jobId) {

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
    this.setState({data:responseJson.rows})
    let uzunluk = responseJson["totalRows"];


    for(let i = 0 ; i < uzunluk ; i++){
    let rows = this.arrayToObject(responseJson["rows"][i].f);
        if(baslangiclokid == rows.LocationID){
            baslangiclokSehir = rows.Borough;
            baslangiclokZone =  rows.Zone;
            global.sehir = baslangiclokZone;
        }
        if(bitislokid == rows.LocationID){
             bitislokSehir = rows.Borough;
             bitislokZone = rows.Zone;
             global.sehirbit = bitislokZone;
        }
         if(baslangiclokid2 == rows.LocationID){
                    baslangiclokSehir2 = rows.Borough;
                     baslangiclokZone2 =  rows.Zone;
                     global.sehir2 = baslangiclokZone2;
          }
         if(bitislokid2 == rows.LocationID){
                     bitislokSehir2 = rows.Borough;
                     bitislokZone2 = rows.Zone;
                     global.sehirbit2 = bitislokZone2;
         }


    }
    if(global.sehir != ""){
         this.setState({isLodaing:false})
    }




  };

async submitToGoogle (jobId) {
     this.setState({isClick:true});
     const delay = (ms) => new Promise((res) => setTimeout(res, ms));
     await delay(1000);
    sayac = 0;
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

    this.setState({data:responseJson.rows})
    let uzunluk = responseJson["totalRows"];
     for(let i = 0 ; i < uzunluk ; i++){
      let rows = this.arrayToObject(responseJson["rows"][i].f);
      if(i==0){
           baslangiclokid = rows.PULocationID;
               bitislokid = rows.DOLocationID;
               global.mesafe= rows.trip_distance;
      }
      if(i==1){
        baslangiclokid2 = rows.PULocationID;
        bitislokid2 = rows.DOLocationID;
        global.mesafe2 = rows.trip_distance;
      }

     }
     sayac = 2 ;

     this.submitToGoogle2(global.jobId4)

  };

    render(){
    let {content,btnPressStyle,txtStyle} = styles ;
    return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
             <View style= {styles.viewStyle}>
                                      <Text style= {txtStyle}> En az 3 yolcunun bulunduğu seyahatlerden en kısa mesafeli ve en uzun mesafeli yolu ciziniz.</Text></View>
              {this.state.isLodaing == false ?
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity
                    onPress={() => this.submitToGoogleMaps(global.sehir,global.sehirbit,global.mesafe)}  style ={styles.btnPressStyle2} >
                           <Text style= {txtStyle}> En uzun mesafe  <Image   source={require('./abc.png')}/></Text>
                            </TouchableOpacity>
              <TouchableOpacity
                          onPress={() => this.submitToGoogleMaps(global.sehir2,global.sehirbit2,global.mesafe2)}  style ={styles.btnPressStyle3} >

                            <Text style= {txtStyle}> En kisa mesafe  <Image   source={require('./abc.png')}/></Text>
                                   </TouchableOpacity>

              </View> :
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 {this.state.isFailed == true ? <TouchableOpacity style ={styles.error}>
                        <Text style= {styles.errorTxt}>Api isteğinde sorun oluştu</Text></TouchableOpacity> : null}
              <ActivityIndicator animating={this.state.isClick} size="large" color="#0000ff" />
              <TouchableOpacity   onPress={() => this.submitToGoogle(global.jobId3)} style ={btnPressStyle}>
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
    }, viewStyle:{
         backgroundColor:'#282828',
         height:250,
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
        top:windowWidth/4
       },
       errorTxt:{
        color:'red',
        fontSize:16,
        fontFamily:'Iowan Old Style',
         textAlign:'center'
      },
    btnPressStyle:{
          backgroundColor:'#282828',
          height:90,
          width: windowWidth,
          alignItems :'center',
          justifyContent:'center',
          top:150
        },
     btnPressStyle2:{
               backgroundColor:'#282828',
               height:90,
               width: windowWidth,
               alignItems :'center',
               justifyContent:'center',
               top:120
             },
       btnPressStyle3:{
                     backgroundColor:'#282828',
                     height:90,
                     width: windowWidth,
                     alignItems :'center',
                     justifyContent:'center',
                     top:120
                   },
    mapStyle:{
        flex:1,
    },
     txtStyle:{
           color:'#ffffff',
            fontSize:16,
            fontFamily:'Iowan Old Style',
            textAlign:'center'
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
export default Sorgu3;