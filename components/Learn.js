import { View, Text, ScrollView,Image, Button, TextInput,Modal,Pressable } from 'react-native'
import { collection, doc, getDocs } from "firebase/firestore";
import {db} from "../firebase"

import React from 'react'
import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import LessonCard from './LessonCard';
import { useState ,useEffect} from 'react';
export default function Learn() {
  const [modalVisible, setModalVisible] = useState(false);
  const [lessons,setLessons] = useState([])
  useEffect(() => {
    async function data() {
      try {
        let todos = []
        const querySnapshot = await getDocs(collection(db, "lessons"));
      querySnapshot.forEach((doc) => {
        todos.push(doc.data())
      });
      setLessons(todos)
console.log(lessons)
    }
      catch(E) {
        alert(E)
      }
    }

    data()
    
  }, [])
  const [searchinput,setSearchInput] = useState("")
  const [li,Sli] = useState(true)
  const [filterar,setFilterAr] = useState(lessons)
   function searchLessons (val) {
    setSearchInput(val)
   Sli(false)
  }
  return (
    <View style={learnStyle.maincont}>
      <View style={learnStyle.learncont}>
      <Text style={learnStyle.even}>EVVENNTI</Text>
      <Text style={learnStyle.learn}>Learn</Text>
      </View>
      <View style={{marginTop:20,flexDirection:"row", width:"100%",alignItems:"center",backgroundColor:"#F3F5F9",borderRadius:20,paddingLeft:15}}>
      <Feather name="search" size={24} color="#FF802C"style={{flex:0.1}} />
        <TextInput style={{padding:20,borderRadius:20,flex:0.9}} placeholder="type lesson keyword" placeholderTextColor="grey" color="#000"  value={searchinput} onChangeText={(val) => setSearchInput(val)}/>
      </View>
{li ?       <View style={{width:"100%",flexDirection:"row",marginTop:30,borderRadius:20,backgroundColor:"#CFECFE"}}>
      <View style={{flex:0.5,padding:20}}>
        <Text style={{fontSize:20,fontWeight:"700",marginBottom:20}}>What do you want to learn Today?</Text>
        <View style={{backgroundColor:"#FF7F2D",padding:8,borderRadius:20}}>
          <Button title='Get Started' color="#fff"/>
        </View>
      </View>
      <View style={{flex:0.5,marginLeft:10}}>
        <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1048439876741251072/Screen_Shot_2022-12-02_at_10.25.38_PM.png"}}  style={{width:"100%",height:200,borderRadius:20}}/>
      </View>
     </View> : null}
          <View>
          <Text style={{fontSize:28,marginTop:20}}>Courses</Text>
         <ScrollView style={{paddingBottom:200}}>
          {lessons && lessons.map((doc,key) => 
          <>
      <LessonCard key={key} setModalVisible={setModalVisible} title={doc.title} desc={doc.desc} img1={doc.imgURL} modalVisible={modalVisible} />
          </>
          )}
       {/**<LessonCard setModalVisible={setModalVisible} title={doc.title} desc={doc.desc} img1={doc.imgURL} /> */}
         <View style={{height:600,width:"100%"}}></View>
         </ScrollView>
          </View>
    </View>
  )
}

const learnStyle = StyleSheet.create({
  maincont: {
    padding:15,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:"#fff",
    flex:1
  },
  learncont: {
    flexDirection:"row",
    width:"100%",
  },
  even: {
    color:"#000",
    fontSize:34,
    marginRight:8,
    fontWeight:"700"
  },
  learn:{
    color:"#3A84EC",
    fontSize:34,
    fontWeight:"700",
    textDecorationColor:"#fff",
    textDecorationLine:"underline",
    fontStyle:"italic"
  }
})
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height:"100%",
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height:"100%",
    paddingTop:40,
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
  buttonClose: {
    backgroundColor: "#2196F3",
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
