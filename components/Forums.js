import { View, Text, Image,TextInput,ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import {db} from "../firebase"
import { collection, query, where, getDocs,addDoc,onSnapshot } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';

export default function Forums() {
  const [comments,setComments] = useState([])
  const[commentText,setCommentText] = useState("")
  const [feedInput, setFeedInput] = useState("");

  async function handleFeedIn () {
    setApiqu( feedInput )
    setFeedInput("")
  }
  const handleNewComment = async() =>{
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        description: commentText
      });
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      alert(e)
    }
    
    setCommentText("")
  }
  useEffect(() => {
    const projectsref =  collection(db, "comments");

    async function getallComments () {
    try {
      const q = await query(projectsref)
      onSnapshot(q, (snapshot) => {
        let todos = []
        snapshot.forEach((doc) => {todos.push(doc.data())})
        setComments(todos)
      })
   }
   catch(e){
    alert(e)
   }
    
    }
     
     getallComments()
  }, [comments])
  var HBRichTextEditor = require('react-native-richtext-editor');
var HBToolbar = require('react-native-richtext-editor/HBToolbar');

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
    <View style={{backgroundColor:"#3A84EC",borderRadius:20,marginRight:15,paddingBottom:10}}>
      <Text style={{color:"#fff",padding:10,fontWeight:"700",borderRadius:20,paddingBottom:10}}>Bitcoin</Text>
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
   <HBRichTextEditor
                ref="myEditor"
                initialHTML={bodyForDisplay}/>
<HBToolbar />
   </ScrollView>
    </View>
  )
}