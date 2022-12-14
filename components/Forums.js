import { View, Text, Image,TextInput,ScrollView } from 'react-native'
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
  const [forumData,setForumData] = useState()
  return (
    <View style={{}}>
    <View style={{marginBottom: 4,padding:20}}>
    <Text style={{fontSize: 40, fontWeight: "700"}}>Forums</Text>
      <Text style={{fontSize: 25, fontWeight: "650", marginBottom: 10}}>Which Forum do You want to see?</Text>
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
<View style={{flexDirection:"row",width:"100%",justifyContent:"space-around",alignItems:"center"}}>
    <View style={{backgroundColor:"#3A84EC",borderRadius:20,marginRight:15}}>
      <Text style={{color:"#fff",padding:10,fontWeight:"700",borderRadius:20}}>Bitcoin</Text>
    </View>
    <View style={{backgroundColor:"#fff",borderRadius:20,marginRight:15}}>
      <Text style={{color:"#000",padding:10,fontWeight:"700",borderRadius:20}}>ETH</Text>
    </View>
    <View style={{backgroundColor:"#fff",borderRadius:20,marginRight:15}}>
      <Text style={{color:"#000",padding:10,fontWeight:"700",borderRadius:20}}>LUNA</Text>
    </View>
    <View style={{backgroundColor:"#fff",borderRadius:20}}>
      <Text style={{color:"#000",padding:10,fontWeight:"700",borderRadius:20}}>CAD</Text>
    </View>
   </View>
</ScrollView>
   <ScrollView style={{marginBottom:100}}>
    {forumData && forumData.map((doc,key) => 
 <ForumCard title={doc.title} key={key} uid={doc.uid} id={doc.id} />)}
   </ScrollView>
    </View>
  )
}