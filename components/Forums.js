import { View, Text, Image,TextInput,ScrollView,Pressable,Modal,Alert,Animated } from 'react-native'
import React,{useState, useEffect,useRef} from 'react'
import {db} from "../firebase"
import { collection, query, where, getDocs,addDoc,onSnapshot,updateDoc } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Entypo } from '@expo/vector-icons'; 
import {auth} from "../firebase.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail} from "firebase/auth";
import ForumCard from './ForumCard';
import { FontAwesome } from '@expo/vector-icons'; 
import { Button } from 'react-native-paper';
import Luna from "./Luna"
import Crypto from "./Crypto"
import { Appearance, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL ,uploadBytes,uploadString} from "firebase/storage";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';

export default function Forums() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
        useNativeDriver: true, // <-- Add this
    }).start();
  }, []);



  const [comments,setComments] = useState([])
  const[commentText,setCommentText] = useState("")
  const [feedInput, setFeedInput] = useState("");

  async function handleFeedIn () {
   try {
    LSLS()
   }
   catch(e){
    alert(e)
   }
  }
  const onShare = async (name,current_price) => {
    try {
      const result = await Share.share({
        message:
          `EVENNTII MARKET DATA :  The popular cryptocoin ${name} current price is ${current_price}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
async function ddd() {
try {
  const querySnapshot = await getDocs(collection(db, "forums"));
  let todos = []
querySnapshot.forEach((doc) => {
  todos.push({...doc.data(), id: doc.id })
  
})
setForumData(todos)
}
catch(E) {
  console.log(E)
}


}
ddd()
  }, [])
 
  const colorScheme = useColorScheme();
  useEffect(() => {
    if(forumData) {
      console.log(forumData)
    } else {
      console.log("null");
    }
    
  }, [])
  useEffect(() => {
    async function url() {
      try {
        const url = collection(db, "users");
        const q = query(url, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        let todos = []
        querySnapshot.forEach((doc) => {setUrl1(doc.data())})
      }
      catch(e) {
        alert(e)
      }

    }
    url()
    
  }, [])
  useEffect(() => {    
  }, [])
  
  const [url1,setUrl1]=useState()
  const uid = auth.currentUser.uid
  const [forumText,setForumText] = useState("")
  const [desc,setDesc] = useState("")
  const [forumData,setForumData] = useState()
  async function submitPost () {
      try {
        const docRef = await addDoc(collection(db, "forums"), {
          title: forumText,
          desc: desc,
          postImage: url,
          uid:Date.now(),
          photo: auth.currentUser.photoURL? auth.currentUser.photoURL : url1.photoUrl,
          by: auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))
        });
        setForumText("")
        setDesc("")
        setModalVisible(false)
        console.log(url)
      }
      catch(e){
        alert(e)
      }
    
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);  
  const [url, setUrl] = useState(null)
  async function postImage () {
    try {
      // No permissions request is necessary for launching the image library
         let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 1,
         });
     
     
         if (!result.canceled) {
          imgFirebase()
          setImage(result.assets[0].uri);         }
       {/**
       await updateDoc(doc(db, "users", uid, {
           photoURL: result.uri.toString()
         }))
     */}
         }
         catch(E) {
          Alert.alert(
            "Alert Title",
            "My Alert Msg 1",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
         }
  }
  const [filteredData, setFilteredData] = useState([]);
  async function LSLS() {
    const newLessons = forumData.filter((lesson) =>
    lesson.title.toLowerCase().includes(feedInput.toLowerCase())
  );
  console.log(newLessons)
  setFilteredData(feedInput.length < 1 ? forumData : newLessons);
  }
  async function imgFirebase () {
    try {
      console.log(image);
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
 }).catch(e=>{
  Alert.alert(
    "Alert Title",
    "My Alert Msg 2",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
 }) 
   }); 
    }
    catch(e) {
     alert(e)
    }
   }
  return (
    <Animated.View
    style={{
      opacity: fadeAnim,
    }}>
    <View style={colorScheme === "light" ? "#fff": {backgroundColor:"#000"}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
          <View style={{backgroundColor:`${colorScheme==="light"?"#fff":"#000"}`,height:"100%",paddingTop:70,paddingRight:20,paddingLeft:20}}>
            <Text style={{fontSize:40,fontWeight:"700",color:`${colorScheme==="light"?"#000":"#fff"}`}}>Make a Post</Text>
          <View style={{borderRadius:20,margin:20}}>
            <Text style={{fontWeight:"700",fontSize:25,color:`${colorScheme==="light"?"#000":"#fff"}`}}>Post title</Text>
  <TextInput style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:10,fontSize:26,marginBottom:20}} placeholder="type post title..." placeholderTextColor="#000" value={forumText}    onChangeText={(val) => setForumText(val)}
 />
     <Text style={{fontWeight:"700",fontSize:25,color:`${colorScheme==="light"?"#000":"#fff"}`}}>Post Description</Text>
  <TextInput style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:10,}} placeholder="type post description..." placeholderTextColor="#000" value={desc}         multiline={true}
   onChangeText={(val) => setDesc(val)}
 />
 <Pressable color="#000" style={{marginTop:20,backgroundColor:"#FF35F0",padding:10,borderRadius:11,color:"#000"}} onPress={postImage}>
      <Text style={{color:"#fff",textAlign:"center",fontSize:20}}>Pick Image</Text>
    </Pressable>
  <Pressable color="#000" style={{marginTop:20,backgroundColor:"#3A84EC",padding:10,borderRadius:11,color:"#000"}} onPress={submitPost}>
      <Text style={{color:"#fff",textAlign:"center",fontSize:20}}>Submit Post</Text>
    </Pressable>
</View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{padding:10,borderRadius:15,width:"auto",marginLeft:85,marginRight:85}}
            >
              <Text style={{color:"grey",textAlign:"center",textDecorationColor:"grey",textDecorationLine:"underline"}}>Cancel</Text>
            </Pressable>
         {colorScheme==="light"? <Image source={{
            uri: "https://images.ctfassets.net/0idwgenf7ije/2orXzfWd0mvritHtAijvzr/ee56b7589d666d1cdc76632afdc04b76/How_a_Block_in_the_Bitcoin_Blockchain_Works_-100.jpg?fm=webp"
          }} style={{height:200}}/>:null}
          </View>
      </Modal>
    <View style={{marginBottom: 4,padding:20,zIndex:100}}>
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:15}}>
    <Text style={colorScheme === "light" ? {fontSize: 40, fontWeight: "700"}: {color:"#fff",fontSize: 40, fontWeight: "700"}}>Forums 💬</Text>
    <Pressable
       
       onPress={() => setModalVisible(true)}
     >
  <View style={{borderRadius:10,backgroundColor:"#Fff"}}>
  <Ionicons name="ios-add-circle" size={47} color="#CF4361"  style={{padding:9}}/>
  </View>
        </Pressable>
    </View>
      <Text style={{fontSize: 25, fontWeight: "650", marginBottom: 10,color:`${colorScheme==="light"?"#000":"#fff"}`}}>Forums and posts related to web 3</Text>
     <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
     <TextInput
     placeholder='type news keyword'
     onChange={LSLS}
      style={{
        backgroundColor: `${colorScheme==="light"?"#D1D1D1":"#052451"}`,
        borderRadius: 20,
        color:`${colorScheme==="light"?"#000":"#fff"}`,
        padding: 10,
        fontSize: 16,
        width: "60%"
      }}
        onChangeText={(val) => setFeedInput(val)}
        value={feedInput}
      />
    <AntDesign name="rightcircle" size={30} color="#3A84EC"  onPress={handleFeedIn}/>
     </View>
   </View>
<ScrollView horizontal={true} style={{marginBottom:20,marginLeft:20}}>
</ScrollView>
   <ScrollView style={{marginBottom:500}}>
   {
  feedInput === "" ?  
  forumData && forumData.map((doc,key) => 
  <ForumCard photo={doc.photo} title={doc.title} key={key} uid={doc.uid} id={doc.id} by={doc.by} desc={doc.desc} doc={doc} /> )
  : 
  filteredData.map((doc,key)=>{
    return (
      <ForumCard photo={doc.photo} title={doc.title} key={key} uid={doc.uid} id={doc.id} by={doc.by} desc={doc.desc} doc={doc} />
    );
  })

}
   </ScrollView>
    </View>
    </Animated.View>

  )
}