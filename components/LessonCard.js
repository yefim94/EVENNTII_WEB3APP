import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { Pressable } from 'react-native';
export default function LessonCard({img1,title,desc,setModalVisible}) {
  return (
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

  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    padding:10,
    borderRadius:10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
