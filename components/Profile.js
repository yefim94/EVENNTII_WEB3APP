// importing
import React from 'react'
import {useState, useEffect} from "react"
import { Text, View,ImageBackground, ScrollView, Button, Image, StyleSheet , TextInput,Pressable,Modal} from 'react-native'
import { func } from 'prop-types';
import { AntDesign } from '@expo/vector-icons'; 
{/**import Carousel from 'react-native-snap-carousel';
 */}
 import * as Linking from 'expo-linking';
 import { A } from '@expo/html-elements';
 import { Appearance, useColorScheme } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
import ProfileCard from './ProfileCard';

export const Profile = () => {
  //state
  const [profileData, setProfileData] = useState([]);
  const [apiQ,setApiQ] = useState("")
  const [nfttei,setNftTei] = useState("")
  const [comments,setComments] = useState([])
  const[commentText,setCommentText] = useState("")
 //functions 
 async  function getData () {
  try {
    const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'WYON0dXwg4zG3GSsaPb79ofaPTLAbDUpmt01OuTlZihmzoH1F059it3bdsXSou0t'}};
const data = await fetch(`https://deep-index.moralis.io/api/v2/nft/search?chain=eth&format=decimal&q=${apiQ}&filter=name&limit=10`, options)
const ddata = await data.json()
setProfileData(ddata.result)
  }
   catch(ee) {
    alert(ee)
   }
  }

  async function handleNftIn () {
   setApiQ(nfttei)
   setNftTei("")
  }
 
  useEffect(() => {
    getData();
    
  }, [apiQ]);
  function liked (id) {
    setPressed(true)
  }
  return (
    <View style={profileStyles.overallcont}>
    <Text style={profileStyles.mainheading}>NFT'S 🖼️</Text>
    <View style={profileStyles.lowerarea}>
    <Text style={profileStyles.lowerheading}>What kind of NFT?</Text>
   <View style={profileStyles.bottom}>
   <TextInput
   placeholder='type nft keyword'
      style={profileStyles.textin}
      onChangeText={(val) => setNftTei(val)}
      value={nfttei}
    />
<AntDesign name="rightcircle" size={30} color="#3A84EC"  onPress={handleNftIn}/>
   </View>
   </View>
   <Text style={{color:"grey",textDecorationLine:"underline",marginBottom:10}}>Data gathered from Morallis</Text>
    <ScrollView>
    {profileData ? <>
      {profileData.map((el, key,id) => 
      <ProfileCard key={key} name={JSON.parse(el.metadata).name} description={JSON.parse(el.metadata).description} id={el.token_id} image={JSON.parse(el.metadata).image} link={el.token_uri}/>
      )} 
      
    </>: <>
    <Text style={{
      fontWeight:"700",
      color:"#000",
      fontSize:20,
      marginBottom:20
    }}>Try searching something! Anything!</Text>
    <Image source={{
    uri:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/50e513115094373.6047d1f4cf3f1.jpg"
    }} style={{
      width:"100%",
      borderRadius:20,
      height:500
    }}/>
    <Text style={{color:"grey",textDecorationLine:"underline",marginTop:10}}>- Darth Vadar by Beeple</Text>
    </>}
      </ScrollView>
      </View>
  )
}

const profileStyles = StyleSheet.create({
  overallcont:{padding: 20},
  mainheading:{fontSize: 40, fontWeight: "700"},
  lowerarea:{
    marginBottom: 20
  },
  lowerheading:{fontSize: 25, fontWeight: "650", marginBottom: 10},
  signout: {
    backgroundColor: '#3A84EC',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 10,
    fontSize: 20
  },
  bottom:{
    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  },
  textin:{backgroundColor: "#D1D1D1",
  borderRadius: 20,
  padding: 10,
  fontSize: 16,
  width: "60%"},
  liikebtn:{position: "absolute", zIndex: 10, right: 0, backgroundColor: "#fff", padding: 8,borderRadius: 30, marginRight: 20, marginTop: 10},
  lowercont:{marginTop: 20, padding:20},
  lower1:{flexDirection: "row", alignItems:"center"},
  lower2:{marginRight:10, color: "grey"},
  line:{width: 10,height:10,backgroundColor:"#000", borderRadius:50},
  id:{marginLeft: 10},
  name:{fontSize: 20, fontWeight: "700", marginBottom: 10},
  lowerlowerco:{backgroundColor: "#3A84EC", borderRadius: 10,padding:7,justifyContent: "center", alignItems: "center",marginTop:20},
  link:{color:"white", fontSize: 19}
})