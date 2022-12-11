import { View, Text,Image ,Modal,StyleSheet,Pressable,Share} from 'react-native'
import React from 'react'
import { LineChart, Grid ,XAxis} from 'react-native-svg-charts'
import { A } from '@expo/html-elements';
import {useState,useEffect} from "react"
import * as Linking from 'expo-linking';
import { func } from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
{/**
           {historical && <Text>{historical.description.en}</Text>}
 */}
export default function NotifcationCard({name,image,symbol,price_change_24h,current_price}) {
  useEffect(() => {
    getData()
    console.log(historical)
  }, [])
  const [historical,setHistorical] = useState()
  async function getData() {
   try {
    {/**
  https://api.coingecko.com/api/v3/search/trending
https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true

  */}
  const rawData1 = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true")
  const d1 = await rawData1.json()
  setHistorical(d1)

   }
   catch(err) {
    alert(err)
   }
  }
  const [modalVisible, setModalVisible] = useState(false);
  const onShare = async (name,current_price) => {
    try {
      const result = await Share.share({
        message:
          `EVENNTII MARKET DATA :  The popular cryptocoin ${name} current price is ${current_price}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
  }}
>
  <View style={feedS.imcont}>
    <View style={{flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center"}}>
    <Text style={{color:"#fff",fontSize:36}}>{name}</Text>
    <Image source={{uri:image}} style={{width:50,height:50,marginLeft:10}}/>
    </View>
    <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
      <View>
        <Text style={{fontSize:20,color:"#Fff"}}>{name}'s price</Text>
        <Text style={{color:"black"}}>${current_price}</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#fff" onPress={() => onShare(name,current_price)} />
      </View>
    </View>
    <View>
      <Text></Text>
    </View>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:"#fff",borderRadius:20,padding:15,marginTop:20}}
      >
        <Text style={{color:"#3A84EC",fontSize:17,textAlign:"center"}}>Back to Currency's</Text>
      </Pressable>
  </View>
</Modal>
<Pressable
      onPress={() => setModalVisible(true)}>

<View style={{width:"100%",height:80,marginBottom:20,flexDirection:"row",backgroundColor:"#fff",borderRadius:20,padding:15}}>
          <View style={{flexDirection:"row",flex:2}}>
            <Image source={{uri:`${image}`}} style={{width:50,height:"100%",marginRight:20,borderRadius:50}}/>
            <View>
              <Text style={{fontWeight:"700",color:"#3A84EC",fontSize:20}}>{name}</Text>
              <Text style={{fontSize:17}}>${symbol.toUpperCase()}</Text>
            </View>
          </View>
          <View>
          </View>
          <View style={{alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:`${price_change_24h >= 0 ? "green":"red"}`,fontWeight:"700",fontSize:20}}>${current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
        </View>
      </Pressable>
</>

  )
}

const feedS = StyleSheet.create({
  maincont:{
    borderRadius: 20, 
        padding: 20
  },
  mainhead:{fontSize: 40, fontWeight: "700"},
  lowermainc:{
    marginBottom: 20
  },
  smallhead:{fontSize: 25, fontWeight: "650", marginBottom: 10},
  teco:{flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
  teinput:{backgroundColor: "#D1D1D1",
  borderRadius: 20,
  padding: 10,
  fontSize: 16,
  width: "60%"},
  apikey:{fontSize:27},
  apikey2:{color:"#3A84EC",fontWeight:"700"},
  newscard:{ backgroundColor: "#fff",
  borderRadius: 20,
  marginBottom: 30,
  flex:1},
  imcont:{backgroundColor:"#3A84EC",height:"100%",width:"100%",padding:30,marginTop:30},
  title:{color:"#000",fontSize:26,fontWeight:"700"},
  linkss:{
    color:"grey",textDecorationLine: "underline",marginTop:10
  }
  })