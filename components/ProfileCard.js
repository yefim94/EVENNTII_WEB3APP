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
export default function ProfileCard({name,description,id,image,link}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pressed,setPressed] = useState(false)
  const colorScheme = useColorScheme()
  return (
    <View style={{}}>
             <Modal 
       animationType="slide"
       transparent={true}
       visible={modalVisible}
       onRequestClose={() => {
         Alert.alert("Modal has been closed.");
         setModalVisible(!modalVisible);
       }}
     >
       <View style={{backgroundColor:`${colorScheme==="light"?"#fff":"#000"}`,height:"100%"}}>
        <Image source={{uri:image}} style={{width:"100%", height:300,marginTop:50}}/>
        <ScrollView style={{padding:18}}>
        <Text style={{fontWeight:"700",fontSize:26,color:`${colorScheme==="light"?"#000":"#fff"}`}}>{name}</Text>
        <Text style={{color:`${colorScheme==="light"?"grey":"#fff"}`,fontSize:16}}>{description} </Text>
           <Pressable
             onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:"#3A84EC",padding:20,borderRadius:20,marginTop:20}}
           >
             <Text style={{color:"#fff"}}>Hide Modal</Text>
           </Pressable>
        </ScrollView>
       </View>
     </Modal>
        <Pressable   onPress={() => setModalVisible(true)} >
          <View style={{
          backgroundColor: `${colorScheme === "light" ? "#fff":"#052451"}`,
          display: `${image.includes("https") ? "block": "none"}`,
          borderRadius: 20,
          marginBottom: 20
        }} >
          <View style={{position: "relative"}}>
          {image.includes("https") ? <>
              <Image source={{
            uri: `${image}`
          }} style={{width: "100%", height: 200, width: "100%"}}/> 
          </>: null}
          </View>
          <View style={profileStyles.lowercont}>
            <View style={profileStyles.lower1}>
              <Text style={profileStyles.lower2}>ID</Text>
              <View style={profileStyles.line}></View>
              <Text style={{color:`${colorScheme ==="light"?"#000":"#fff"}`,fontWeight:"700",marginLeft:20,fontSize:20,marginRight:20}}>{id}</Text>
            </View>
            <Text style={{color:`${colorScheme ==="light"?"#000":"#fff"}`,fontWeight:"700",fontSize:22,marginBottom:20,marginTop:20}} >{name}</Text>
          <Text style={{color:`${colorScheme === "light" ? "#000": "#fff"}`}}>{description}</Text>
          <View style={profileStyles.lowerlowerco}>
            {link.includes("https") ? <>
            <A style={profileStyles.link} href={link}><Text>learn More</Text></A> 
            </> : <Text>Learn More</Text>} 
             </View>
          </View>
        </View>
        </Pressable>
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