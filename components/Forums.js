import { View, Text, Image,TextInput,ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import {db} from "../firebase"
import { collection, query, where, getDocs,addDoc,onSnapshot } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { func } from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

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
   <View style={{borderRadius:20,margin:20,backgroundColor:"#fff",justifyContent:"flex-start"}}>
    <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>
        <Text style={{color:"#000",fontSize:20,marginRight:10}}>By</Text>
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>yefim94</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(name,current_price)} />
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24}}>Will crypto and Nft's ever go back up - my analysis</Text>
    </View>
    <Image source={{uri:"https://images.ctfassets.net/q5ulk4bp65r7/4sZT4Y1rKxu07bFTxvt6EF/f3de7aeda6e217cf6acebd2541ef3067/Learn_Illustration_Ultimate_Guide_Essential_Reading.png?fit=thumb&f=faces&w=369&h=271"}} style={{width:"100%",height:300,borderBottomLeftRadius:20,borderBottomRightRadius:20}}/>
   </View>
   <View style={{borderRadius:20,margin:20,backgroundColor:"#fff",justifyContent:"flex-start"}}>
    <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>
        <Text style={{color:"#000",fontSize:20,marginRight:10}}>By</Text>
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>yefim94</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(name,current_price)} />
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24}}>Will crypto and Nft's ever go back up - my analysis</Text>
    </View>
    <Image source={{uri:"https://images.ctfassets.net/q5ulk4bp65r7/4sZT4Y1rKxu07bFTxvt6EF/f3de7aeda6e217cf6acebd2541ef3067/Learn_Illustration_Ultimate_Guide_Essential_Reading.png?fit=thumb&f=faces&w=369&h=271"}} style={{width:"100%",height:300,borderBottomLeftRadius:20,borderBottomRightRadius:20}}/>
   </View>
   <View style={{borderRadius:20,margin:20,backgroundColor:"#fff",justifyContent:"flex-start"}}>
    <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>
        <Text style={{color:"#000",fontSize:20,marginRight:10}}>By</Text>
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>yefim94</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(name,current_price)} />
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24}}>Will crypto and Nft's ever go back up - my analysis</Text>
    </View>
    <Image source={{uri:"https://images.ctfassets.net/q5ulk4bp65r7/4sZT4Y1rKxu07bFTxvt6EF/f3de7aeda6e217cf6acebd2541ef3067/Learn_Illustration_Ultimate_Guide_Essential_Reading.png?fit=thumb&f=faces&w=369&h=271"}} style={{width:"100%",height:300,borderBottomLeftRadius:20,borderBottomRightRadius:20}}/>
   </View>
   <View style={{borderRadius:20,margin:20,backgroundColor:"#fff",justifyContent:"flex-start"}}>
    <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>
        <Text style={{color:"#000",fontSize:20,marginRight:10}}>By</Text>
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>yefim94</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(name,current_price)} />
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24}}>Will crypto and Nft's ever go back up - my analysis</Text>
    </View>
    <Image source={{uri:"https://images.ctfassets.net/q5ulk4bp65r7/4sZT4Y1rKxu07bFTxvt6EF/f3de7aeda6e217cf6acebd2541ef3067/Learn_Illustration_Ultimate_Guide_Essential_Reading.png?fit=thumb&f=faces&w=369&h=271"}} style={{width:"100%",height:300,borderBottomLeftRadius:20,borderBottomRightRadius:20}}/>
   </View>
   <View style={{borderRadius:20,margin:20,backgroundColor:"#fff",justifyContent:"flex-start"}}>
    <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>
        <Text style={{color:"#000",fontSize:20,marginRight:10}}>By</Text>
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>yefim94</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(name,current_price)} />
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24}}>Will crypto and Nft's ever go back up - my analysis</Text>
    </View>
    <Image source={{uri:"https://images.ctfassets.net/q5ulk4bp65r7/4sZT4Y1rKxu07bFTxvt6EF/f3de7aeda6e217cf6acebd2541ef3067/Learn_Illustration_Ultimate_Guide_Essential_Reading.png?fit=thumb&f=faces&w=369&h=271"}} style={{width:"100%",height:300,borderBottomLeftRadius:20,borderBottomRightRadius:20}}/>
   </View>
   </ScrollView>
    </View>
  )
}