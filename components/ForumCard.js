import { Image,ScrollView,Share } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput,Button } from "react-native";
import { doc } from 'firebase/firestore';
import { collection, query, where, getDocs,addDoc } from "firebase/firestore";
import { useState,useEffect } from 'react';
import {auth} from "../firebase.js"
import { db } from '../firebase';
export default function ForumCard({title,id,by,desc,photo,postImage,doc}) {
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
        by: auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))
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
  return (
    <>
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Image source={{
          uri:doc.postImage
        }} style={{width:"100%",height:300}}/>
          <View style={styles.modalView}>
          <View style={{flexDirection:"row",alignItems:"center",marginBottom:20}}>
            <Image source={{
              uri:photo
            }} style={{width:25,height:25,borderRadius:500}} />
            <Text style={{fontWeight:"700",fontSize:19,marginLeft:10}}>{by}</Text>
          </View>
            <Text style={{fontWeight:"700",fontSize:30}}>{title}</Text>
            <Text style={{marginTop:20}}>{desc}</Text>
          <ScrollView style={{paddingBottom:600}}>
          <View style={{backgroundColor:"grey",width:"100%",height:2,marginBottom:10,marginTop:15}}></View>
          <View style={{width:"100%",backgroundColor:"#fff",borderRadius:20}}>
              <Text style={{color:"#3A84EC",fontSize
            :20,fontWeight:"700"}}>Comments: </Text>
            <View style={{backgroundColor:"#3A84EC",padding:20,borderRadius:20,margin:20}}>
          <TextInput style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:10}} placeholder="type post description..." placeholderTextColor="#000" value={desc1}    onChangeText={(val) => setDesc1(val)}
        />
          <Pressable style={{marginTop:20}} onPress={submitComment}>
              <Text style={{color:"#fff"}}>Submit Comment</Text>
            </Pressable>
        </View>
              <ScrollView style={{flexDirection:"column",flexWrap:"wrap"}}>
              {data1 && data1.map((doc,key) => <View key={key} style={{backgroundColor:"#E3E3E3",padding:10,borderRadius:14,flex:"auto",marginTop:14,alignItems:"flex-start",flexDirection:"column"}}>
               <View style={{flexDirection:"row"}}>
               <Text>by: </Text><Text style={{color:"#3A84EC"}}>{doc.by}</Text>
               </View>
                <Text style={{color:"#fff",fontSize:20}}>{doc.desc}</Text>
              </View>)}
              </ScrollView>
            </View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:"#3A84EC",borderRadius:20,padding:15,alignItems:"center",marginTop:15}}
            >
              <Text style={{color:"#fff",fontSize:20}} >Hide Post</Text>
            </Pressable>
          </ScrollView>
          </View>
      </Modal>
    <Pressable
        onPress={() => setModalVisible(true)}
      >
         <View style={{borderRadius:20,margin:20,backgroundColor:"#fff",justifyContent:"flex-start"}}>
    <View style={{paddingLeft:20,paddingRight:20,paddingTop:20}}>
     <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
     <View style={{flexDirection:"row"}}>
     <Image source={{
              uri:photo
            }} style={{width:30,height:30,marginRight:10,borderRadius:500}} />
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>{by}</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(title)} />
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24}}>{title}</Text>
    </View>
    <Image source={{uri:doc.postImage}} style={{width:"100%",height:300,borderBottomLeftRadius:20,borderBottomRightRadius:20}}/>
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