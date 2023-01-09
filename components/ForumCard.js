import { Image,LogBox,ScrollView,Share } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput,Button } from "react-native";
import { doc } from 'firebase/firestore';
import { collection, query, where, getDocs,addDoc,updateDoc } from "firebase/firestore";
import { useState,useEffect } from 'react';
import {auth} from "../firebase.js"
import { db } from '../firebase';
import { Appearance, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

export default function ForumCard({title,id,by,desc,photo,postImage,doc,uid}) {
  const onShare = async (name) => {
    try {
      const result = await Share.share({
        message:
          `EVENNTII FORUMS :  ${name}`,
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
  };  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
   async function ddd() {
    let todos = []

      try {
        const citiesRef = collection(db, "forums",id,"comments");
       const querySnapshot = await getDocs(citiesRef);
       querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         todos.push(doc.data())
       });
      }
      catch(E){
        alert(E)
      }
      setData1(todos)
   }
   ddd()
  }, [])
  const [data1, setData1] = useState()
  const [desc1,setDesc1] = useState("")
  async function submitComment () {
    try {
      const docRef = await addDoc(collection(db, "forums",id,"comments"), {
        desc: desc1,
        by: auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@')),
        img: `${auth.currentUser.photoURL? auth.currentUser.photoURL: url1.photoUrl}`
      });
      setDesc1("")
    }
    catch(e){
      alert(e)
    }
  }
  async function postImage() {
    alert("image pcked")
  }
  const colorScheme = useColorScheme();
  useEffect(() => {
    console.log(doc.upvotes);

  }, [doc.upvotes])
  
  async function upVote (){
    try {
      Alert.alert(
        "upvoted",
        "upvote succesfull will momentarily update",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK",}
        ]
      );
      const url = collection(db, "forums");
      const q = query(url, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((flow) => {
        try {
          updateDoc(flow.ref, { // 👈
            upvotes: doc.upvotes++
           })
        }
        catch(e) {
          alert(e)
        }
      })
    }
    catch(e) {
      alert(e)
    }
  } 
  async function downVote (){
    try {
      Alert.alert(
        "downvoted",
        "your downvote was successfull will momentarily update",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK" }
        ]
      );
      const url = collection(db, "forums");
      const q = query(url, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((flow) => {
        try {
          updateDoc(flow.ref, { // 👈
            upvotes: doc.upvotes--
           })
        }
        catch(e) {
          alert(e)
        }
      })
    }
    catch(e) {
      alert(e)
    }
  }
  return (
    <>
     <Modal
     transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
  <View style={{}}>
    {doc.postImage ? <Image source={{
          uri:doc.postImage
        }} style={{width:"100%",height:300}}/>:null}
          <View style={{backgroundColor:`${colorScheme==="light"?"#fff":"#000"}`, height:"100%",
    width:"100%",
    padding:40,
    flexDirection:"column",}}>
          <View style={{flexDirection:"row",alignItems:"center",marginBottom:20}}>
            <Image source={{
              uri:photo
            }} style={{width:25,height:25,borderRadius:500}} />
            <Text style={{fontWeight:"700",fontSize:19,marginLeft:10,color:`${colorScheme==="light"?"#000":"#fff"}`}}>{by}</Text>
          </View>
            <Text style={{fontWeight:"700",fontSize:30,color:`${colorScheme==="light"?"#000":"#fff"}`}}>{title}</Text>
            <Text style={{marginTop:20,color:`${colorScheme==="light"?"#000":"#fff"}`}}>{desc}</Text>
          <ScrollView style={{paddingBottom:600}}>
          <View style={{backgroundColor:"#fff",width:"100%",height:2,marginBottom:10,marginTop:15}}></View>
          <View style={{backgroundColor:`${colorScheme==="light"?"#fff":"rgba(0,0,0,0)"}`,borderRadius:20,padding:10}}>
              <Text style={{color:"#3A84EC",fontSize
            :20,fontWeight:"700"}}>Comments: </Text>
            {data1 && data1.map((doc,key) => <View key={key} style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:14,marginTop:14,alignItems:"stretch",flexDirection:"column"}}>
               <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <Image source={{
                  uri:doc.img
                }} style={{width:30,height:30,borderRadius:400}}/>
              <View style={{flexDirection:"row"}}>
              <Text>by: </Text><Text style={{color:"#3A84EC",fontWeight:"700"}}>{doc.by}</Text>
              </View>
               </View>
                <Text style={{color:`${colorScheme==="light"?"#000":"#000"}`,fontSize:19,marginTop:10}}>{doc.desc}</Text>
              </View>)}
            <View style={{backgroundColor:"#052451",padding:20,borderRadius:20,marginTop:70}}>
          <TextInput style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:10}} placeholder="type comment description..." placeholderTextColor="#000" value={desc1}    onChangeText={(val) => setDesc1(val)}
        />
          <Pressable style={{marginTop:20,flexDirection:"row",justifyContent:"center"}} onPress={submitComment}>
              <Text style={{color:"#fff",textAlign:"center",width:"100%"}}>Submit Comment</Text>
            </Pressable>
        </View>
              <ScrollView style={{flexDirection:"column",flexWrap:"wrap"}}>
        
              </ScrollView>
            </View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:"#3A84EC",borderRadius:20,padding:15,alignItems:"center",marginTop:15}}
            >
              <Text style={{color:"#fff",fontSize:20}} >Hide Post</Text>
            </Pressable>
          </ScrollView>
          </View>
  </View>
      </Modal>
    <Pressable
        onPress={() => setModalVisible(true)}
      >
         <View style={{marginBottom:20,backgroundColor:`${colorScheme === "light" ? "#fff" : "#052451"}`,justifyContent:"flex-start"}}>
    <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>
     <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(title)} style={{marginRight:15}}/>
     <Image source={{
              uri:photo
            }} style={{width:30,height:30,marginRight:10,borderRadius:500}} />
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>{by}</Text>
      </View>
      <View style={{flexDirection:"row",alignItems:"center"}}>
     
      <Entypo name="arrow-up" size={24} color="#3A84EC" onPress={upVote} />
      <Text style={{color:`${colorScheme==="light"?"#000":"#fff"}`}}>{doc.upvotes}</Text>
      <Entypo name="arrow-down" size={24} color="#3A84EC"  onPress={downVote}/>
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24,color:`${colorScheme === "light" ? "#000":"#fff"}`}}>{title}</Text>
    </View>
    {doc.postImage && <Image source={{uri:doc.postImage}} style={{width:"100%",height:300}}/>}
   </View>
      </Pressable>
    </>
  )
}
const styles = StyleSheet.create({
  modalView:{
    height:"100%",
    width:"100%",
    padding:40,
    flexDirection:"column",
    backgroundColor:"#fff"
  }
})