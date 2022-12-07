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
   <View style={{borderRadius:20,margin:20,backgroundColor:"#fff",padding:10,justifyContent:"flex-start"}}>
    <View>
     <View style={{flexDirection:"row",alignItems:"center",marginBottom:10}}>
     <View style={{}}>
        <Text style={{color:"#000",fontSize:20,marginRight:10}}>By</Text>
      </View>
      <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>yefim94</Text>
      <View>

      </View>
     </View>
    </View>
    <View>
      <Text style={{fontWeight:"700",fontSize:24,marginBottom:14}}>Will crypto and Nft's ever go back up - my analysis</Text>
    </View>
    <Image source={{uri:"https://images.ctfassets.net/q5ulk4bp65r7/image-fb02e59b-3f25-509a-96b8-d73c8bd1a7c9/108ac3303cdeca4b4c2d04e3b1351457/news_article_image_despite_strong_on_chain_metrics_macro_headwinds_remain_image?fit=thumb&f=faces&w=369&h=271"}} style={{width:"100%",height:400,borderRadius:20}}/>
   </View>
   </ScrollView>
    </View>
  )
}