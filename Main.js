
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView , Image, TextInput, Button, Modal, Pressable, StatusBar,Alert,ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { useState, useEffect } from 'react';
import {auth} from "./firebase"
import { db } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail,signInWithCredentialr} from "firebase/auth";
import Onboarding from 'react-native-onboarding-swiper';
import { doc,setDoc,updateDoc } from 'firebase/firestore';
import { Dimensions } from 'react-native';
import { Appearance, useColorScheme } from 'react-native';
import {
  exchangeCodeAsync,
  makeRedirectUri,
  TokenResponse,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { addDoc, collection } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import { GoogleAuthProvider } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

export const Main = ({setLoggedIn}) => {
  // state 
  const [email, setEmail] = useState("")
  const [slideim, setslideIm] =useState([])
  const [password,setPassword] = useState("")
  const [emaillo, setEmaillo] = useState("")
  const [passwordlo,setPasswordlo] = useState("")
  const [spim,setSpIm] = useState("")
  const [modalVisible, setModalVisible] = useState(false);


// functions for auth
  const handleForm = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;

      try {
        const docRef = await addDoc(collection(db, "users"), {
          email:email,
          password:password,
          uid: auth.currentUser.uid,
          photoUrl: "",
          intro: true
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      //=================
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`a error occured ${errorCode}`)
    });
  }
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
  // ...
  })
  .catch((error) => {
    alert(error)
  });

  }
  {/**
const forgotPassword =  (email) => {
     sendPasswordResetEmail(auth, email).then((a) => {
    }).catch(e => alert(e))
  } */}

  // coinbase open code

  const { width, height } = Dimensions.get('window');

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '145110946260-atk0rdrfk6e5gsg5p4lpic89i7kahlbe.apps.googleusercontent.com',
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
     async function dd() {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          uid: auth.currentUser.uid,
          photoUrl: auth.currentUser.photoURL,
          intro: true
        })
        signInWithCredential(auth, credential);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
     }
     dd()
    }
  }, [response]);

  return (
    <ScrollView style={styles2.overallCont}>
      <StatusBar hidden />
        {/** */}
        {/**
         *  <View style={styles2.logoCont}>
          <View style={styles2.logostco}>
            <Text style={styles2.logostcote}>E</Text>
          </View>
         <Text style={styles2.logo}>EVENTEE</Text>
        </View>
         */}
        {/** */}
        <View style={styles2.disimagco}>
          <View>
            <Image style={styles2.logoImage} source={{
              uri:"https://cdn.discordapp.com/attachments/783336191529320498/1041428064955019324/Screen_Shot_2022-11-13_at_2.03.15_PM.png"
            }}/>
          </View> 
          </View>
      <View style={styles2.bottom1}>
        <Image source={{
          uri:`https://cronuts.digital/wp-content/uploads/2022/01/5402207-scaled.jpg`
        }} style={styles2.mainImage}/>
        <View style={styles2.disTeCo}>
          <Text style={styles2.disblu}>
          Discover Rare NFT and Crypto Analytics 
          </Text>
          {/** */}
        </View>
        {/** */}
        <View style={styles2.signupCo}>
          <View style={styles2.siteco}> 
          <Text style={styles2.maindesc}>NFTs and Crypto have exciting new properties: they’re unique, provably scarce, and usable across multiple applications.</Text>
          </View>
          <View style={styles2.teinpuco}>
          <KeyboardAvoidingView enabled behavior="padding">
            <TextInput value={email} onChangeText={value => {setEmail(value)}} color="#fff" style={styles2.textinpu} placeholder="Enter your email..."         autoCapitalize='none' placeholderTextColor="#EDEDED"/>
            <TextInput value={password} onChangeText={value => {setPassword(value)}}  placeholderTextColor="#EDEDED" color="#fff" style={styles2.textinpu} secureTextEntry autoCapitalize="none"
            placeholder="Enter your password..."/>
            <View style={{flexDirection:"row",alignItems:"center",width:"100%",justifyContent:"center",paddingTop:9,paddingBottom:9,borderRadius:20,backgroundColor:"#E3E3E3",marginBottom:7}}>
              <Image source={{
                uri:"https://assets.stickpng.com/thumbs/5847f9cbcef1014c0b5e48c8.png"
              }} style={{height:30,width:30}}/>
            <Button color="grey"
            disabled={!request}
            title="Google Login"
            onPress={() => {
              promptAsync();
            }}
          />
            </View>
            <View style={styles2.buttonco}>
            
            <Button  onPress={handleLogin} color="white"  title="Sign In"  style={styles2.buttonsi} />
            </View>
         {/**
          *    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
              <Image style={{width:"70%",height:40,borderRadius:10,marginTop:10}} source={{
                uri:"https://cdn.discordapp.com/attachments/783336191529320498/1037903445790826627/Screen_Shot_2022-11-03_at_9.37.38_PM.png"
              }}/>
            </View>
          */}
            <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                    <View style={styles2.modalView}>
                    <Image source={{
                        uri: "https://www.modernretail.co/wp-content/uploads/sites/5/2022/01/blockchain-explained-gif.gif"
                      }} style={{width: "100%",height: 380, position: "relative",bottom: 0,}}/>
                      <Text style={styles2.modalText}>Get Started</Text>
                      
                      <View style={{
                        width: "100%"
                      }}>
                        <Text style={styles2.teinhe}>Email</Text>
                      <TextInput value={email} onChangeText={value => {setEmail(value)}} color="#fff" style={styles2.textinpu} placeholder="Enter your email..."         autoCapitalize='none'/>
                      <Text style={styles2.teinhe}>Password</Text>
                      <TextInput value={password} onChangeText={value => {setPassword(value)}} color="#fff" style={styles2.textinpu} secureTextEntry autoCapitalize="none"
                        placeholder="Enter your password..."/>
                         {/**onPress={forgotPassword(email) */}
                        <Text style={{textDecorationLine:"underline",color:"#fff",marginBottom:10}}>Forgot Password?</Text>
                   <View style={{
                        backgroundColor: "#4D76D8",
                        borderRadius: 10,
                        padding: 7
                   }} >
                    <Button  type="submit" onPress={handleForm} color="white"  title="Get Started"   />
                  </View> 
                      </View>
                      <Pressable
                        style={{
                          color: "white"
                        }}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles2.textStyle}>Cancel</Text>
                      </Pressable>
                  
                  </View>
           </Modal>
           <Pressable
              style={[styles2.button]}
              onPress={() => setModalVisible(!modalVisible)}
            >
             <Text style={styles2.donthaveAcc}>Dont Have An Account?</Text>
            </Pressable>
            </KeyboardAvoidingView>
          </View>
        </View>
        </View>

   
      </ScrollView> 
  )
}
const styles2 = StyleSheet.create({
  overallCont : {
    flex: 1, backgroundColor: "#F5F5F5", borderRadius: 20
  },
  logoCont : {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  donthaveAcc:{
    color: "grey",
    textAlign: "center",
    textDecorationLine: "underline"
  },
  coinbasec:{
    backgroundColor:"#000",borderRadius:20,padding:10,marginTop:10
  },
  maindesc:{
    color: "rgba(0,0,0,0.5)",fontSize: 15, textAlign: "left"
  },
  mainImage:{
    width:"100%",height:300
  },
  bottom1:{
    flex:2,
    paddingLeft:20,
    paddingRight:20
  },
  logoImage:{
    height:60,width:210,paddingLeft:10
  },
  logostco: {
    backgroundColor: "#3F8DFD",
    padding: 5,
    paddingLeft: 18,
    paddingRight: 18,
    borderRadius: 100,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  disimagco: {
    flex: 0.1,
    marginTop:40,
    marginLeft:20,marginRight:20,
    marginBottom:20
  },
  linear: {
    position: "absolute",
    zIndex: 100,
    backgroundColor: "linear-gradient(#e66465, #9198e5)",
    width: 200,
    height: 200,
    marginBottom: 100
  },
  bottom: {
    flex: 0.9,
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logostcote: {
    color: "#fff",
    transform: [{ rotate: '-20deg'}],
    fontSize: 30,
    fontWeight: "700"
  },
  teinhe: {
    fontWeight: "700",
    fontSize: 25,
    color: "#fff"
  },
  logo :{
    fontSize: 25,
    color: "#000",
    fontWeight: "700",
    marginLeft: 20
  },
  disTeCo: {
  },
  disblu: {
    color: "#000",
    fontSize: 30,
    marginBottom:15,
    textAlign: "left",
    fontWeight: "700",
  },
  diswhi: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
    marginTop: 30
  },
  tinyLogo : {
    width: "100%",
    height:"100%",
    marginBottom: 20,
    zIndex: 50,
  },
  signupCo: {
  textAlign:"center"
  },
  siteco: {
    alignItems: "flex-start",
    marginBottom:15
  },
  site: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700"
  },
  teinpuco: {

  },
  textinpu: {
    backgroundColor: "#C9C8C8",
    padding: 15,
    width: "100%",
    marginTop: 10,
    color: "#fff",
    marginBottom: 20,
    fontSize: 17,
    borderRadius: 10
  },
  textinpuLO: {
    backgroundColor: "#C9C8C8",
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    color: "#fff", 
    borderRadius: 10
  },
  buttonco: {
    backgroundColor: '#3A84EC',
    borderRadius: 20,
    padding: 10,
    fontSize: 10
  },
  centeredView: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#F4BEBC",
  },
  modalView: {
    backgroundColor: "#CF4361",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: "100%",
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",

  },
  textStyle: {
    color: "white",
    textDecorationLine: "underline",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center"
  }
});
