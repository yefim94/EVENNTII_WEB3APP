import React from 'react'
import { StyleSheet, Text, View, SafeAreaView , Image, TextInput, Button,StatusBar} from 'react-native';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import { Notifications } from './components/Notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {auth} from "./firebase"
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createMaterialBottomTabNavigator();

export const Login = ({setLoggedIn}) => {
  const emails = ["gmail, yahoo, aol, nycdoestudents"]
  const username = auth.currentUser.email.replace(/@gmail.com/, '').replace(/@yahoo.com/, '')
  return (
    <View style={{marginTop: 35, flex: 1, borderRadius: 20}}>
            <StatusBar hidden />

           <View style={styles3.logoCont}>
          <View style={styles3.logostco}>
           <Image style={{height: 60,width:60}} source={{
            uri: "https://cdn.discordapp.com/attachments/783336191529320498/1034953013695103017/Screen_Shot_2022-10-26_at_6.13.27_PM.png"
           }}/>
          </View>
         <View style={styles3.eve2co}>
         <Text style={styles3.logo}>EVENNTII</Text>
         <Text style={styles3.username}>🌤📈  {username}</Text>
         </View>
        </View>
    <NavigationContainer style={{
        tabBarStyle: {
          paddingTop: 7,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderLeftWidth: 0.2,
          borderRightWidth: 0.2,
          position: 'absolute',
          overflow: 'hidden',
          width: "100%",
},}}
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
            <Ionicons name="ios-newspaper-sharp" size={26} color={color} />
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
      <View style={styles3.signout}>
        <Button onPress={(e) => {setLoggedIn(false)}} color="#fff" title="sign out" />
        </View>
  
    </View>
  )
}
const styles3 = StyleSheet.create({
  logoCont : {
    alignItems: 'center',
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
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
    fontSize: 20
  },
  eve2co: {
    justifyContent: "center",
    alignItems: "flex-start", 
    marginLeft: 20, 

  },
  username: {
    color: "#3A84EC",
    fontSize: 17
  }
});