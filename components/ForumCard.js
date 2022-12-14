import { Image,ScrollView,Share } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { doc } from 'firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState,useEffect } from 'react';
import { db } from '../firebase';
export default function ForumCard({title,uid,id}) {
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
          uri:`https://images.ctfassets.net/q5ulk4bp65r7/4sZT4Y1rKxu07bFTxvt6EF/f3de7aeda6e217cf6acebd2541ef3067/Learn_Illustration_Ultimate_Guide_Essential_Reading.png?fit=thumb&f=faces&w=369&h=271`
        }} style={{width:"100%",height:300}}/>
          <View style={styles.modalView}>
          
            <Text style={{fontWeight:"700",fontSize:30}}>{title}</Text>
            <Text style={{marginTop:20}}>LOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREMLOREM</Text>
          <ScrollView style={{paddingBottom:600}}>
          <View style={{width:"100%",padding:15,backgroundColor:"#fff",borderRadius:20}}>
              <Text style={{color:"#3A84EC",fontSize
            :20,fontWeight:"700"}}>Comments: </Text>
              <ScrollView style={{flexDirection:"column",flexWrap:"wrap"}}>
              {data1 && data1.map((doc) => <View style={{backgroundColor:"#000",padding:10,borderRadius:14,flex:"auto",marginTop:14,alignItems:"flex-start"}}>
                <Text style={{color:"#fff"}}>{doc.text}</Text>
              </View>)}
              </ScrollView>
            </View>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:"#3A84EC",borderRadius:20,padding:15,alignItems:"center",marginTop:15}}
            >
              <Text style={{color:"#fff",fontSize:20}} >Hide Modal</Text>
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
        <Text style={{color:"#000",fontSize:20,marginRight:10}}>By</Text>
        <Text style={{color:"#3A84EC",fontWeight:"700",fontSize:20}}>yefim94</Text>
      </View>
      <View>
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(title)} />
      </View>
     </View>
    </View>
    <View style={{padding:20}}>
      <Text style={{fontWeight:"700",fontSize:24}}>{title}</Text>
    </View>
    <Image source={{uri:"https://images.ctfassets.net/q5ulk4bp65r7/4sZT4Y1rKxu07bFTxvt6EF/f3de7aeda6e217cf6acebd2541ef3067/Learn_Illustration_Ultimate_Guide_Essential_Reading.png?fit=thumb&f=faces&w=369&h=271"}} style={{width:"100%",height:300,borderBottomLeftRadius:20,borderBottomRightRadius:20}}/>
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