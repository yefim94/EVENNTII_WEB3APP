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
const Tab = createMaterialBottomTabNavigator();
import { Appearance, useColorScheme } from 'react-native';
import Forums from "./components/Forums"
export const Login = ({setLoggedIn}) => {
  const emails = ["gmail, yahoo, aol, nycdoestudents"]
  const username = auth.currentUser.email.replace(/@gmail.com/, '').replace(/@yahoo.com/, '').toUpperCase()
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const colorScheme = useColorScheme();

  return (
    <View style={{marginTop: 35, flex: 1, borderRadius: 20}}>
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
            <View style={{backgroundColor:"#000",width:100,height:100,borderRadius:500,marginBottom:20}}></View>
            <Text style={{fontSize:20}}>Hello,  <Text style={{color:"#3A84EC",fontWeight:"700"}}>{username}</Text></Text>
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
          <View style={styles3.signout}>
        <Button onPress={(e) => {setLoggedIn(false)}} color="#fff" title="sign out" />
        </View>
        <Pressable
              style={[styles3.button, styles3.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles3.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
          </View>
        </View>
      </Modal>
           <View style={styles3.logoCont}>
        <View style={{flexDirection: "row"}}>
        <View style={styles3.logostco}>
           <Image style={{height: 60,width:60}} source={{
            uri: "https://cdn.discordapp.com/attachments/783336191529320498/1034953013695103017/Screen_Shot_2022-10-26_at_6.13.27_PM.png"
           }}/>
          </View>
         <View style={styles3.eve2co}>
         <Text style={styles3.logo}>EVENNTII</Text>
         </View>
        </View>
         <View style={{flexDirection:"row",alignItems:"center"}}>
         <Text style={styles3.username}>{username}</Text>
         <Pressable style={[styles3.button, styles3.buttonOpen]} onPress={() => setModalVisible(true)}>
         <Entypo name="dots-three-vertical" size={24} color="black" />

      </Pressable>
         </View>
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
            <Ionicons name="ios-newspaper-sharp" size={30} color={color} />
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
  disimagco: {
  },
  logostcote: {
    color: "#fff",
    transform: [{ rotate: '-20deg'}],
    fontSize: 30,
    fontWeight: "700"
  },
  logo :{
    fontSize: 30,
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
    justifyContent:"center"
  },
  modalView: {
    height:"100%",
    paddingTop:90,
    alignItems:"",
    justifyContent:'space-between',    
    width:"100%",
    backgroundColor: 'white',
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