import { Image,Share } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { doc } from 'firebase/firestore';

export default function ForumCard({title}) {
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
  };  const [modalVisible, setModalVisible] = useState(false);
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
          <View style={styles.modalView}>
            <Text>{title}</Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text >Hide Modal</Text>
            </Pressable>
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
      <FontAwesome name="share" size={24} color="#3A84EC" onPress={() => onShare(name,current_price)} />
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
    backgroundColor:"#fff"
  }
})