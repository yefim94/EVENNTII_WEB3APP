import React from 'react'
import { StyleSheet, Text, View, SafeAreaView , Image, TextInput, Button, Modal, Pressable, StatusBar,Alert} from 'react-native';
import { useState, useEffect } from 'react';
import {auth} from "./firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import { Appearance, useColorScheme } from 'react-native';
import {
  exchangeCodeAsync,
  makeRedirectUri,
  TokenResponse,
  useAuthRequest,
} from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://www.coinbase.com/oauth/authorize",
  tokenEndpoint: "https://api.coinbase.com/oauth/token",
  revocationEndpoint: "https://api.coinbase.com/oauth/revoke",
};

const redirectUri = "exp://localhost:19000/--/"
const CLIENT_ID = "00cdc90882780c73673a820f2a7db09f6de8f9ec4c522be7c7a306485b0ca487";
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
  const forgotPassword = async (email) => {
    return sendPasswordResetEmail(auth, email).then((a) => {
      alert("Password reset email sent")
    }).catch(e => alert(e))
  }
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["wallet:accounts:read"],
      redirectUri,
    },
    discovery
  );
  const {
    // The token will be auto exchanged after auth completes.
    token,
    exchangeError,
  } = useAutoExchange(
    response?.type === "success" ? response.params.code  : null
  );

  React.useEffect(() => {
    if (token) {
      console.log("My Token:", token.accessToken);
    }
  }, [token]);

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
          <View>
            <Image style={{height:60,width:210,paddingLeft:10}} source={{
              uri:"https://cdn.discordapp.com/attachments/783336191529320498/1041428064955019324/Screen_Shot_2022-11-13_at_2.03.15_PM.png"
            }}/>
          </View>
          <View>
            <Image source={{
              uri:"https://cdn.discordapp.com/attachments/783336191529320498/1041432134482669609/Screen_Shot_2022-11-13_at_2.19.26_PM.png"
            }} style={{width:"100%",height:300,borderRadius:20}} />
          </View>
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
            <Button  onPress={handleLogin} color="white"  title="Sign In"  style={styles2.buttonsi} />
            </View>
            <View style={{backgroundColor:"#000",borderRadius:20,padding:10,marginTop:10}}>
            <Button title="Coinbase Connect"color="white"  disabled={!request}
      onPress={() => {
        promptAsync();
      }}/>
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
                        <Text onPress={(email) => forgotPassword(email)} style={{textDecorationLine:"underline",color:"#fff",marginBottom:10}}>Forgot Password?</Text>
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
             <Text style={{
              color: "grey",
              textAlign: "center",
              textDecorationLine: "underline"
            }}>Dont Have An Account?</Text>
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
    flex: 0.45,
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
    flex: 0.6,
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
    textAlign: "center",
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
type State = {
  token: TokenResponse | null;
  exchangeError: Error | null;
};

// A hook to automatically exchange the auth token for an access token.
// this should be performed in a server and not here in the application.
// For educational purposes only:
function useAutoExchange(code?: string): State {
  const [state, setState] = React.useReducer(
    (state: State, action: Partial<State>) => ({ ...state, ...action }),
    { token: null, exchangeError: null }
  );
  const isMounted = useMounted();

  React.useEffect(() => {
    if (!code) {
      setState({ token: null, exchangeError: null });
      return;
    }

    exchangeCodeAsync(
      {
        clientId: CLIENT_ID,
        clientSecret: "b2106d0e380eba882cae2e6a8ead932a635896827d87b9929ed3c70fa34e4552",
        code,
        redirectUri,
      },
      discovery
    )
      .then((token) => {
        if (isMounted.current) {
          setState({ token, exchangeError: null });
        }
      })
      .catch((exchangeError) => {
        if (isMounted.current) {
          setState({ exchangeError, token: null });
        }
      });
  }, [code]);

  return state;
}

function useMounted() {
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
