import React from 'react'
import {useState, useEffect} from "react"
import { Text, View,ImageBackground, ScrollView, Button, Image, StyleSheet , TextInput} from 'react-native'
import { func } from 'prop-types';
import { AntDesign } from '@expo/vector-icons'; 

export const Profile = ({setLoggedIn}) => {
  const [profileData, setProfileData] = useState([]);
  const [apiQ,setApiQ] = useState("")
  const [nfttei,setNftTei] = useState("")
 async  function getData () {
  const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'WYON0dXwg4zG3GSsaPb79ofaPTLAbDUpmt01OuTlZihmzoH1F059it3bdsXSou0t'}};

const data = await fetch(`https://deep-index.moralis.io/api/v2/nft/search?chain=eth&format=decimal&q=${apiQ}&filter=name&limit=10`, options)
const ddata = await data.json()
setProfileData(ddata.result)
  }

  async function handleNftIn () {
   setApiQ(nfttei)
   setNftTei("")
  }
 
  useEffect(() => {
    getData();
    
  }, [apiQ]);
  return (
    <View style={{padding: 20}}>
    <Text style={{fontSize: 40, fontWeight: "700"}}>Profile</Text>
    <View style={{marginBottom: 20}}>
    <Text style={{fontSize: 25, fontWeight: "650", marginBottom: 10}}>What NFT collection?</Text>
   <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
   <TextInput
   placeholder='type nft keyword'
      style={{
        backgroundColor: "#D1D1D1",
        borderRadius: 20,
        padding: 10,
        fontSize: 16,
        width: "60%"
      }}
      onChangeText={(val) => setNftTei(val)}
      value={nfttei}
    />
<AntDesign name="rightcircle" size={30} color="#3A84EC"  onPress={handleNftIn}/>
   </View>
   </View>
    <ScrollView>
    {profileData ? <>
      {profileData.map((el, key) => 
        <View style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 20,
          marginBottom: 20
        }} key={key}>
          <View style={{position: "relative"}}>
            <View style={{position: "absolute", zIndex: 10, right: 0, backgroundColor: "#fff", padding: 8,borderRadius: 30, marginRight: 20, marginTop: 10}}>
            <AntDesign name="heart" size={24} color="#FF717B" />
            </View>
          {JSON.parse(el.metadata).image.includes("https") ? <>
              <Image source={{
            uri: `${JSON.parse(el.metadata).image}`
          }} style={{width: "1005", height: 200, borderRadius: 30, width: "100%"}}/> 
          </>: null}
          </View>
          <View style={{marginTop: 20}}>
            <View style={{flexDirection: "row", alignItems:"center"}}>
              <Text style={{marginRight:10, color: "grey"}}>By</Text>
              <View style={{width: 10,height:10,backgroundColor:"#000", borderRadius:50}}></View>
              <Text style={{marginLeft: 10}}>{el.token_id}</Text>
            </View>
            <Text style={{fontSize: 20, fontWeight: "700", marginBottom: 10}} key={key}>{JSON.parse(el.metadata).name}</Text>
          <Text>{JSON.parse(el.metadata).description}</Text>
          <View style={{backgroundColor: "#000", borderRadius: 10,padding:7}}>
            <Button title="Place Bid" color="#fff"/>
          </View>
          </View>
        </View>
      )} 
      
    </>: null}
      </ScrollView>
      </View>
  )
}

const profileStyles = StyleSheet.create({
  signout: {
    backgroundColor: '#3A84EC',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 10,
    fontSize: 20
  }
})