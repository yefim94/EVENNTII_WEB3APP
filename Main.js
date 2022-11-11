import React from 'react'
import { StyleSheet, Text, View, SafeAreaView , Image, TextInput, Button, Modal, Pressable, StatusBar,Alert} from 'react-native';
import { useState, useEffect } from 'react';
import {auth} from "./firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { Appearance, useColorScheme } from 'react-native';

export const Main = ({setLoggedIn}) => {
  const [email, setEmail] = useState("")
  const [slideim, setslideIm] =useState([])
  const [password,setPassword] = useState("")
  const [emaillo, setEmaillo] = useState("")
  const [passwordlo,setPasswordlo] = useState("")
  const [siimage,setImage] = useState(["  https://arke-art.com/wp-content/uploads/2021/08/avatar2.png","https://media.wired.com/photos/603959e5f02d2d2aebd211e8/1:1/w_3000,h_3000,c_limit/business_nft_beeple.jpg"])
  const [spim,setSpIm] = useState("")
  const [modalVisible, setModalVisible] = useState(false);

  const handleForm = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
       const user = userCredential.user;
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`a error occured ${errorCode}`)
    });
    setEmail("")
    setPassword("")
  }
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      setModalVisible(false)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`a error occured ${errorCode}`)
    });
    setEmail("")
    setPassword("")
  }
  useEffect(() => {
    const i = Math.floor(Math.random() * siimage.length)
    setSpIm(siimage[i])
  }, [])
  
  return (
    <View style={{flex: 1, backgroundColor: "#F5F5F5", borderRadius: 20}}>
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
      <View style={styles2.linear}></View>
          <Image
            style={styles2.tinyLogo}
            source={{
              uri: "https://about.fb.com/wp-content/uploads/2022/06/CD22_440-NRP-NFTs_A-Beginners-Guide_Header-sm.gif"
            }}
      />
          </View>
        <View style={styles2.bottom}>
        <View style={styles2.disTeCo}>
          <Text style={styles2.disblu}>
          Discover Rare NFT and Crypto Analytics 
          </Text>
          {/** */}
        </View>
        {/** */}
        <View style={styles2.signupCo}>
          <View style={styles2.siteco}> 
          <Text style={{color: "rgba(0,0,0,0.5)",fontSize: 15, textAlign: "center"}}>NFTs and Crypto have exciting new properties: they’re unique, provably scarce, and usable across multiple applications.</Text>
          </View>
          <View style={styles2.teinpuco}>
            <TextInput value={email} onChangeText={value => {setEmail(value)}} color="#fff" style={styles2.textinpu} placeholder="Enter your email..."         autoCapitalize='none'/>
            <TextInput value={password} onChangeText={value => {setPassword(value)}} color="#fff" style={styles2.textinpu} secureTextEntry autoCapitalize="none"
        placeholder="Enter your password..."/>
            <View style={styles2.buttonco}>
            <Button  onPress={handleForm} color="white"  title="Get Started"  style={styles2.buttonsi} />
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
                      <Text style={styles2.modalText}>Welcome Back...</Text>
                      
                      <View style={{
                        width: "100%"
                      }}>
                        <Text style={styles2.teinhe}>Email</Text>
                      <TextInput value={email} onChangeText={value => {setEmail(value)}} color="#fff" style={styles2.textinpu} placeholder="Enter your email..."         autoCapitalize='none'/>
                      <Text style={styles2.teinhe}>Password</Text>
                      <TextInput value={password} onChangeText={value => {setPassword(value)}} color="#fff" style={styles2.textinpu} secureTextEntry autoCapitalize="none"
                        placeholder="Enter your password..."/>
                        <Text style={{textDecorationLine:"underline",color:"#fff",marginBottom:10}}>Forgot Password?</Text>
                   <View style={{
                        backgroundColor: "#4D76D8",
                        borderRadius: 10,
                        padding: 7
                   }} >
                    <Button  type="submit" onPress={handleLogin} color="white"  title="Get Started"   />
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
             <Text style={{
              color: "grey",
              textAlign: "center",
              textDecorationLine: "underline"
            }}>Already have a account?</Text>
            </Pressable>
          </View>
        </View>
        </View>
      </View> 
  )
}
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoCont : {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "flex-start"
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
    justifyContent: 'center',
    alignItems: "center",
    flex: 0.5,
    backgroundColor:"#18113A"
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
    flex: 0.4,
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
    fontSize: 25,
    marginBottom:15,
    textAlign: "center",
    fontWeight: "600",
  },
  diswhi: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
    marginTop: 30
  },
  tinyLogo : {
    width: "100%",
    height: "100%",
    marginBottom: 20,
    zIndex: 50,
    marginTop:40
  },
  signupCo: {
  },
  siteco: {
    alignItems: "center"
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
    color: "#000",
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