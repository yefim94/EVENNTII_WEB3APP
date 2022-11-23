import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView , Image, TextInput, Button} from 'react-native';
import {Login} from "./Login.js"
import { Main } from './Main.js';
import { auth } from "./firebase";
import {  onAuthStateChanged} from "firebase/auth";
import { useEffect} from 'react';
{/**
"expo-notifications",
        {
          "icon": "./local/assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": [
            "./local/assets/notification-sound.wav",
            "./local/assets/notification-sound-other.wav"
          ]
        }
*/}
export default function App() {
  useEffect(() => {
    const handAuth = (e) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
          const uid = user.uid;
        } else {
          setLoggedIn(null)
        }
      });
    }
    handAuth()
  }, [])
   const [loggedIn, setLoggedIn] = useState(null)
  return (
    <View style={styles.container}>
      {loggedIn ?  <Login setLoggedIn={setLoggedIn} /> : <Main setLoggedIn={setLoggedIn} />}
      {/**
       * <View style={{flexDirection: "row",justifyContent: "space-between", alignItems: "center", marginLeft: 100, marginRight: 100}}>
        <Image style={styles.logosoc} source={{uri: "https://i.pinimg.com/originals/5e/ff/6c/5eff6c25d920f6a78fda288e6589bf8b.jpg"}} />
        <Image style={styles.logosoc} source={{uri: "https://yt3.ggpht.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s900-c-k-c0x00ffffff-no-rj"}} />
        <Image style={styles.logosoc} source={{uri: "https://thumbs.dreamstime.com/b/rounded-facebook-logo-transparent-white-background-web-use-printing-purpose-rounded-facebook-logo-web-print-205627443.jpg"}} />
      </View>
       */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#fff"
  } ,
  logosoc: {
    marginTop: 10,
    width: 25,
    height:  25,
    borderRadius: 40
  }
});