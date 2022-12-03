// HOW TO ADD UNIQUE DB experiences
// 1.user signs in/up with email pass, create new uid
// 2. user at home page can select img for avatar
// 3.users avatar matches the uid of the avatar

//imports
import { getStorage, ref, uploadBytesResumable, getDownloadURL ,uploadBytes,uploadString} from "firebase/storage";

import React from 'react'
import {db} from './firebase'
import { collection,query, where, getDocs,onSnapshot ,getDoc} from 'firebase/firestore';
import { doc,setDoc,updateDoc } from 'firebase/firestore';
import { StyleSheet, Text, View, SafeAreaView , Image, TextInput, Button,StatusBar,Modal,Pressable,Switch} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { Feed } from './components/Feed';
import { Profile } from './components/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Notifications1 } from './components/Notifications1';
import {auth} from "./firebase"
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import {  deleteUser, onAuthStateChanged } from "firebase/auth";
import { useEffect ,useRef} from 'react';
import { Appearance, useColorScheme } from 'react-native';
import Forums from "./components/Forums"
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import Learn from "./components/Learn";

//tabs
const Tab = createMaterialBottomTabNavigator();


export const Login = ({setLoggedIn}) => {
  //state
 
  const currentUser = auth.currentUser;
  const uid = currentUser.uid

  const avatar = currentUser.photoURL  
  const [image, setImage] = useState("");  
  const [url, setUrl] = useState("")
  //functions
  const pickImage = async () => {
    try {
 // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      auth.currentUser.photoURL = result.uri
      setImage(result.uri);
      imgFirebase()
    }
  {/**
  await updateDoc(doc(db, "users", uid, {
      photoURL: result.uri.toString()
    }))
*/}
    }
    catch(E) {
      alert(E)
    }

  };
  const [t,setT] = useState(false)
  const [url1,setUrl1]=useState([])
  async function imgFirebase () {
   const d = await fetch(image)
   const dd = await d.blob()
   const fileName = image.substring(image.lastIndexOf("/")+1)
   const storage = getStorage();
  const storageRef = ref(storage, fileName);
  uploadBytes(storageRef,dd).then((snapshot) => {
    getDownloadURL(snapshot.ref).then(async (url) => {

      // Create a query against the collection.
      setUrl(url)
      console.log(url)
      const citiesRef = collection(db, "users");

      // Create a query against the collection.
      const q = query(citiesRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  try {
    updateDoc(doc.ref, { // 👈
      photoUrl: url
     })
  }
  catch(e) {
    alert(e)
  }
alert("might take a few minutes to change...")
  
});
      
}).catch(e=>{
  alert(e)
}) 
  }); 
  setImage("")
  }
  useEffect(() => {
    async function url() {
      try {
        const url = collection(db, "users");
        const q = query(url, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        let todos = []
        querySnapshot.forEach((doc) => {todos.push(doc.data())})
        setUrl1(todos)
        url1.map((d) => console.log(d.photoUrl))
      }
      catch(e) {
        alert(e)
      }

    }
    url()
    
  }, [url])
  
  const [black,seblac] = useState("#fff")
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
    if (colorScheme === 'dark') {
      seblac("#000")
       setIsEnabled(true); // true means dark
    }
    if(colorScheme === 'light'){
      seblac("#fff")
       setIsEnabled(false); 
       // false means light
    } else {
       null
    }
},[colorScheme])
registerForPushNotificationsAsync = async () => {
  

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};
  
  
  return (
    <View style={styles3.maincont}>
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
          <View style={styles3.modalview2}> 
            <Text style={styles3.modalText}>Settings:</Text>
            <Text style={styles3.hi}>Hello,  <Text style={styles3.helloUsername}>{username}</Text></Text>
            <View style={styles3.imagemocont}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {url1 == undefined ? null
           : url1.map((doc) => (
            <Image source={{uri: doc.photoUrl}} style={{
              width:200,
              height:200,
              borderColor:"#3A84EC",
              borderWidth:5,
              borderRadius:"100"
            }} />
          ))}
            </View>
            </View>
           <View style={{flexDirection:"row", alignItems:"center",marginBottom:15}}>
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
            <View style={{backgroundColor:"#D9D9D9",padding:15,borderRadius:20,marginBottom:15}}  >
            <Text style={{color:"#3A84EC",fontWeight:"700",textDecorationLine:"underline"}} onPress={() => registerForPushNotificationsAsync()}>Notifications</Text>
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
         <View style={styles3.bottomcont}>
         <View>
          {/**
           * FOR FUTURE DARK MODE
           * <Text style={{
            color: black
          }}>jisd</Text>
           */}
          {url1.length != 0  ? url1.map((doc) => (
            <Image source={{uri: doc.photoUrl}} style={{
              width:50,
              height:50,
              borderColor:"#3A84EC",
              borderWidth:5,
              marginRight:14,
              borderRadius:"100"
            }} />
          ))
           : null}
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
        component={Notifications1}
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
       <Tab.Screen
        name="Learn"
        setParams={setLoggedIn}
        component={Learn}
        options={{
          tabBarLabel: `Learn`,
          tabBarIcon: ({ color }) => (
            <Ionicons name="school" size={26} color={color} />
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
    backgroundColor:"white",
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
    paddingTop:60,
    paddingLeft: 20,
    paddingRight:20,
    paddingBottom:20,
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
  maincont:{
    marginTop: 30, flex: 1, borderRadius: 20
  },
  modalview2:{
    alignItems:"center"
  },
  hi:{
    fontSize:30
  },
  helloUsername:{
    color:"#3A84EC",fontWeight:"700"
  },
  imagemocont:{
    alignItems:"center"
  },
  bottomcont:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  }
});

//push notifcations

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

