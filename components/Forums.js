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
  return (
    <View style={{padding:20}}>
    <View style={{marginBottom: 20}}>
    <Text style={{fontSize: 40, fontWeight: "700"}}>News Feed</Text>
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
   <ScrollView>
   <View style={{position:"relative"}}>
    <Image source={{
      uri:"https://archive.org/download/wallstreetbets/dqqsn9rf8kw41.jpg"
    }} style={{width:"100%",height:200,borderTopLeftRadius:20,borderTopRightRadius:20}}/>
    <View style={{borderRadius:10,backgroundColor:"#fff",position:"absolute",bottom:0,left:0,marginLeft:10,marginBottom:10}}>
    <Text style={{color:"#000",fontWeight:"700",fontSize:20,padding:15}}>r/BTC PRICE PREDICTIONS:🔥</Text>
    </View>
       </View>
      <View style={{marginTop:20,backgroundColor:"#D9D9D9",padding:10,borderRadius:20}}>
        <Text style={{color:"grey",fontSize:25,fontWeight:"600",marginBottom:14}}>Comments: </Text>
        <View style={{width:"100%",height:3,backgroundColor:"#000", borderRadius:20,marginBottom:10}}></View>

      {comments.map((doc,key) => 
            <View key={key} style={{
              flexDirection:"row",
              alignItems:"center",
              borderRadius:30,
              marginBottom:20
            }}>
              <View style={{
                width:50,height:50,
                borderRadius:70,backgroundColor:"#000",marginRight:10,alignItems:"center",justifyContent:"center"
              }}><Text style={{color:"#fff",fontWeight:"650",fontSize:20}}>Y</Text></View>
              <View style={{borderRadius:20,backgroundColor: '#3A84EC',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0)',
              flex:1
                }}>
              <Text style={{padding:10,borderRadius:10,color:"#fff"}}>{doc.description}</Text>
              </View>
            </View>
          )}
      </View>
   </ScrollView>
    </View>
  )
}