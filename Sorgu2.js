import React, {Component} from 'react'
import {ActivityIndicator,View,Text,StyleSheet,FlatList,TouchableOpacity,Button,Dimensions} from 'react-native'
import {ActionSheet,Root} from "native-base";
import MapView from 'react-native-maps';
import { DataTable } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// SELECT AVG(total_amount),SUBSTR(CAST(tpep_pickup_datetime AS STRING),9,2) AS sa FROM `alpine-realm-310718.taxi.yellow`  GROUP BY sa ORDER BY AVG(total_amount);

let sayac = 0;
let bas,son;
let veri = new Array();
class Sorgu2 extends React.Component{
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
        {"gun":arr[1].v,"ortalama": arr[0].v}
       )
}
async submitToGoogle (jobId) {

       this.setState({isClick:true});
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
         await delay(1000);
    veri = new Array();
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


     let uzunluk = responseJson["totalRows"];

        for(let i = 0 ; i < uzunluk ; i++){
        let rows = this.arrayToObject(responseJson["rows"][i].f);
             if(sayac < 2){
                    if(sayac == 0){
                      bas = parseInt(rows.gun);
                    }else if (sayac == 1){
                      son = parseInt(rows.gun);
                      break;
                    }
                    sayac = sayac + 1;
              }
        }
         for(let i = 0 ; i < uzunluk ; i++){
                let rows = this.arrayToObject(responseJson["rows"][i].f);
                if(parseInt(rows.gun) >= bas && parseInt(rows.gun) <= son ){
                    veri.push( rows );
                }
         }
        this.setState({data:veri})
          if(veri.length != 0){
                this.setState({isLodaing:false})
                }
  };



    render(){
    let {content,btnPressStyle,txtStyle} = styles ;
    return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
         <TouchableOpacity style ={styles.btnPressStyle0}>
              <Text style= {txtStyle}>Günlük seyehat başına düşen ortalama alınan ücretlere göre; en az ücret alınan iki
         tarih arasındaki günlük alınan ortalama ücret listesi.</Text></TouchableOpacity>

            {this.state.isLodaing == false ?
                              <DataTable>
                                <DataTable.Header>
                                  <DataTable.Title style={{paddingLeft:70}}>Gun</DataTable.Title>
                                    <DataTable.Title >Ortalama</DataTable.Title>
                                     </DataTable.Header>
                                        {this.state.data.sort((a, b) => a.gun > b.gun).map((item,index) => (
                                            <DataTable.Row key = {index} style={{ borderBottomWidth: 0 }}>
                                                     <DataTable.Cell style={{paddingLeft:75}} >{parseInt(item.gun)}</DataTable.Cell>
                                                       <DataTable.Cell >{parseFloat(item.ortalama).toFixed(5)} </DataTable.Cell>
                                             </DataTable.Row>
                                         ))}
                                          </DataTable>
                              :
                             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                              {this.state.isFailed == true ? <TouchableOpacity style ={styles.error}>
                                                                                              <Text style= {styles.errorTxt}>Api isteğinde sorun oluştu</Text></TouchableOpacity> : null}
                              <ActivityIndicator animating={this.state.isClick} size="large" color="#0000ff" />
                              <TouchableOpacity   onPress={() => this.submitToGoogle(global.jobId2)} style ={btnPressStyle}>
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
          backgroundColor:'#b0b0b0',
          height:200,
          width: windowWidth,
          alignItems :'center',
          justifyContent:'center',
        alignContent:'center',
            top:-15
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
         backgroundColor:'#b0b0b0',
         height:90,
         width: windowWidth,
         alignItems :'center',
         justifyContent:'center',
           top:170
       },
    mapStyle:{
        flex:1,
    },
      txtStyle:{
          color:'#f8f8f8',
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
export default Sorgu2;