import { View, Text,Image,StyleSheet,Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Pressable } from 'react-native';
import { useEffect } from 'react';
export default function LessonCard({img1,title,desc,key,fulldesc}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View key={key}>
    <Modal 
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <Image source={{
        uri:img1
      }} style={{height:400,width:"100%"}}/>
<View style={{paddingLeft:30,paddingRight:30,paddingTop:30}}>
    <Text style={{fontSize:34,fontWeight:"700",color:"#3A84EC"}}>{title}</Text>
    <Text style={{fontSize:19,fontWeight:"650",marginTop:7,color:"grey",marginBottom:10}}>{desc}</Text>
<ScrollView>
<Text style={{fontSize:20,fontWeight:"700"}}>{fulldesc}</Text>
<Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Go Back to Lessons</Text>
        </Pressable>
</ScrollView>
</View>
      </View>
    </View>
  </Modal>
    <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
         <View  style={{width:"100%",flexDirection:"row",backgroundColor:"#F5FAF4",padding:5,borderRadius:20,marginTop:20}}>
     <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
      <Image source={{
        uri:img1
      }} style={{borderRadius:20,height:50,width:50}}/>
     </View>
     <View style={{flex:0.6,flexDirection:"column",padding:15}}>
      <Text style={{fontSize:17,fontWeight:"700"}}>{title}</Text>
      <Text style={{fontSize:14,fontWeight:"600",color:"grey"}}>{desc}</Text>
     </View>
     <View style={{flex:0.2}}>
    <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
    <AntDesign name="play" size={30} color="#FF802C"  style={{}}/>
    </View>
     </View>
    </View>
      </Pressable>
    </View>

  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height:"100%"
  },
  modalView: {
    height:"100%",
    width:"100%",
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    color:"black",
    marginTop:10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    color:"black",
    padding:10,
    borderRadius:10
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
