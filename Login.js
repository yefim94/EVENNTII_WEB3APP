import React from 'react'
import { StyleSheet, Text, View, SafeAreaView , Image, TextInput, Button,StatusBar,Modal,Pressable,Switch} from 'react-native';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {auth} from "./firebase"
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import {  deleteUser } from "firebase/auth";
import { useEffect } from 'react';
const Tab = createMaterialBottomTabNavigator();
import { Appearance, useColorScheme } from 'react-native';
import Forums from "./components/Forums"
export const Login = ({setLoggedIn}) => {
  const emails = ["gmail, yahoo, aol, nycdoestudents"]
  const username = auth.currentUser.email.replace(/@gmail.com/, '').replace(/@yahoo.com/, '').replace(/@aol.com/, '').toUpperCase()
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    colorScheme === "dark"
  };
  const user = auth.currentUser;
function deleteACC () {
  deleteUser(user).then(() => {
    setLoggedIn(false)
  }).catch((error) => {
   alert(error)
  });
  
}
const colorScheme = useColorScheme();
useEffect(()=>{
  const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
       setIsEnabled(true); // true means dark
    }else{
       setIsEnabled(false); // false means light
    }
},[])
  if (colorScheme === 'dark') {
  } else {
    // render some light thing
  }
  return (
    <View style={{marginTop: 15, flex: 1, borderRadius: 20}}>
            <StatusBar hidden />
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles3.centeredView}>
          <View style={styles3.modalView}>
          <View style={{alignItems:"center"}}> 
            <Text style={styles3.modalText}>Settings:</Text>
            <View>
              <Image source={{
                uri:"https://publish.one37pm.net/wp-content/uploads/2021/11/Brantly.eth_.png"
              }} style={{width:100,height:100,borderRadius:500,marginBottom:20}}/>
            </View>
            <Text style={{fontSize:30}}>Hello,  <Text style={{color:"#3A84EC",fontWeight:"700"}}>{username}</Text></Text>
            </View>
           <View style={{flexDirection:"row", alignItems:"center"}}>
           <Text style={{marginRight:20}}>Dark Mode:</Text>
            <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
           </View>
           <View style={{width:"100%"}}>
            <View style={{backgroundColor:"#D9D9D9",padding:15,borderRadius:20,marginBottom:15}}>
            <Text style={{color:"#3A84EC",fontWeight:"700",textDecorationLine:"underline"}}>FAQ -  POPULAR ASKED QUESTIONS</Text>
            </View>
            <View style={{backgroundColor:"#D9D9D9",padding:15,borderRadius:20,marginBottom:15}}>
            <Text style={{color:"#3A84EC",fontWeight:"700",textDecorationLine:"underline"}}>Leave us a review </Text>
            </View>
            <View style={{backgroundColor:"#D9D9D9",padding:15,borderRadius:20,marginBottom:15}}>
            <Text style={{color:"#3A84EC",fontWeight:"700",textDecorationLine:"underline"}}>Notifications</Text>
            </View>
            <View style={{backgroundColor:"#D9D9D9",padding:15,borderRadius:20,marginBottom:15}}>
            <Text style={{color:"#3A84EC",fontWeight:"700",textDecorationLine:"underline"}}>About us</Text>
            </View>
                        
           </View>
          <View style={{width:"100%"}}>
          <View style={styles3.deleteacc}>
        <Button onPress={(e) => deleteACC()} color="#fff" title="delete account" />
        </View>
          <View style={styles3.signout}>
        <Button onPress={(e) => {setLoggedIn(false)}} color="#fff" title="sign out" />
        </View>
        <Pressable
              style={[styles3.button, styles3.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles3.textStyle}>Cancel</Text>
            </Pressable>
          </View>
          </View>
        </View>
      </Modal>
           <View style={styles3.logoCont}>
{/**
 *         <View style={{flexDirection: "row"}}>
        <View style={styles3.logostco}>
           <Image style={{height: 40,width:40}} source={{
            uri: "https://cdn.discordapp.com/attachments/783336191529320498/1034953013695103017/Screen_Shot_2022-10-26_at_6.13.27_PM.png"
           }}/>
          </View>
         <View style={styles3.eve2co}>
         <Text style={styles3.logo}>EVENNTII</Text>
         </View>
        </View>
 */}
         <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
         <View>
              <Image source={{
                uri:"https://publish.one37pm.net/wp-content/uploads/2021/11/Brantly.eth_.png"
              }} style={{width:35,height:35,borderRadius:500,marginRight:10,borderColor:"#3A84EC",borderWidth:3}}/>
            </View>
         <Text style={styles3.username}>{username}</Text>
         </View>
         <Pressable style={[styles3.button, styles3.buttonOpen]} onPress={() => setModalVisible(true)}>
         <Entypo name="dots-three-vertical" size={24} color="black" />

      </Pressable>
        </View>
    <NavigationContainer 
>
      <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#8DB7F3"
      inactiveColor='#3A84EC'
      barStyle={{ backgroundColor: '#fff' }}
    >
     <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-newspaper-sharp" size={30} color={color} />
          ),
        }}
      />
     
           <Tab.Screen
        name="Forums"
        component={Forums}
        options={{
          tabBarLabel: 'Forums',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="forum" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Crypto',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="chart-area" size={26} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        setParams={setLoggedIn}
        component={Profile}
        options={{
          tabBarLabel: `NFT's`,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
      </NavigationContainer>
    </View>
  )
}
const styles3 = StyleSheet.create({
  logoCont : {
    alignItems: 'center',
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logostco: {
   
  },
  deleteacc:{
    backgroundColor:"#B01A1A",
    borderRadius:20,
    padding:10
  },
  disimagco: {
  },
  logostcote: {
    color: "#fff",
    transform: [{ rotate: '-20deg'}],
    fontSize: 30,
    fontWeight: "700"
  },
  logo :{
    fontSize: 25,
    color: "#000",
    fontWeight: "700",
  },
  disTeCo: {
  },
  disblu: {
    color: "#000",
    fontSize: 35,
    textAlign: "center",
    fontWeight: "600",
  },
  signout: {
    backgroundColor: '#3A84EC',
    padding: 10,
    fontSize: 20,
    width: "100%",
    borderRadius:20,
    marginTop:14
  },
  eve2co: {
    justifyContent: "center",
    alignItems: "flex-start", 
    marginLeft:10
  },
  username: {
    color: "#3A84EC",
    fontSize: 22,
    fontWeight: "700"
  },
  centeredView: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  modalView: {
    height:"100%",
    backgroundColor: "white",
    paddingTop:90,
    alignItems:"",
    justifyContent:'space-between',    
    width:"100%",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
  },
  buttonClose: {
  },
  textStyle: {
    color: 'grey',
    textDecorationLine:"underline",    
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 45,
    paddingLeft:16,
    fontWeight:"700"
  },
});