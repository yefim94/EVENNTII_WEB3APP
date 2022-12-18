import { View, Text, Image,TextInput,ScrollView,Pressable,Modal } from 'react-native'
import React,{useState, useEffect} from 'react'
import {db} from "../firebase"
import { collection, query, where, getDocs,addDoc,onSnapshot } from "firebase/firestore";
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
import { Ionicons } from '@expo/vector-icons'; 

export default function Forums() {
  const [comments,setComments] = useState([])
  const[commentText,setCommentText] = useState("")
  const [feedInput, setFeedInput] = useState("");

  async function handleFeedIn () {
    setApiqu( feedInput )
    setFeedInput("")
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
  const [forumText,setForumText] = useState("")
  const [desc,setDesc] = useState("")
  const [forumData,setForumData] = useState()
  async function submitPost () {
      try {
        const docRef = await addDoc(collection(db, "forums"), {
          title: forumText,
          desc: desc,
          photo: auth.currentUser.photoURL,
          by: auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))
        });
        setForumText("")
        setDesc("")
        setModalVisible(false)
      }
      catch(e){
        alert(e)
      }
    
  }
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
          <View style={{backgroundColor:"#fff",height:"100%",paddingTop:70,paddingRight:30,paddingLeft:30}}>
            <Text style={{fontSize:40,fontWeight:"700"}}>Make a Post</Text>
          <View style={{borderRadius:20,margin:20}}>
            <Text style={{fontWeight:"700",fontSize:25}}>Post title</Text>
  <TextInput style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:10,fontSize:26,marginBottom:20}} placeholder="type post title..." placeholderTextColor="#000" value={forumText}    onChangeText={(val) => setForumText(val)}
 />
     <Text style={{fontWeight:"700",fontSize:25}}>Post Description</Text>
  <TextInput style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:10}} placeholder="type post description..." placeholderTextColor="#000" value={desc}    onChangeText={(val) => setDesc(val)}
 />
  <Pressable style={{marginTop:20,backgroundColor:"#3A84EC",padding:10,borderRadius:11}} onPress={submitPost}>
      <Text style={{color:"#fff",textAlign:"center"}}>Submit Post</Text>
    </Pressable>
</View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{backgroundColor:"#3A84EC",padding:10,borderRadius:15,width:"auto",marginLeft:85,marginRight:85}}
            >
              <Text style={{color:"#fff",textAlign:"center"}}>Cancel</Text>
            </Pressable>
          </View>
      </Modal>
    <View style={{marginBottom: 4,padding:20,zIndex:100}}>
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:15}}>
    <Text style={{fontSize: 40, fontWeight: "700"}}>Forums</Text>
    <Pressable
       
       onPress={() => setModalVisible(true)}
     >
  <View style={{borderRadius:16,backgroundColor:"#Fff"}}>
  <Ionicons name="ios-add-circle" size={47} color="#CF4361"  style={{padding:9}}/>
  </View>
        </Pressable>
    </View>
      <Text style={{fontSize: 25, fontWeight: "650", marginBottom: 10}}>Forums and posts related to web 3</Text>
     <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
     <TextInput
     placeholder='type news keyword'
      style={{
        backgroundColor: "#D1D1D1",
        borderRadius: 20,
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
   <ScrollView style={{marginBottom:100}}>
    {forumData && forumData.map((doc,key) => 
 <ForumCard photo={doc.photo} title={doc.title} key={key} uid={doc.uid} id={doc.id} by={doc.by} desc={doc.desc}/>)}
   </ScrollView>
    </View>

  )
}