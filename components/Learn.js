import { View, Text, ScrollView,Image, Button, TextInput,Modal,Pressable } from 'react-native'
import { collection, doc, getDocs } from "firebase/firestore";
import {db} from "../firebase"

import React from 'react'
import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import LessonCard from './LessonCard';
import { useState ,useEffect} from 'react';
export default function Learn() {
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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={learnStyle.maincont}>
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
              uri:"https://published-assets.coinbase.com/processed/84/b8/84b81925-b03e-4b4a-95e7-20301ec75f48"
            }} style={{width:"100%",height:350}} />
           <View style={{padding:20}}>
           <Text style={{fontWeight:"700",fontSize:30,marginBottom:13}}>Learn Web 3 the Right Away</Text>
            <Text style={{marginBottom:15}}>Lorem LOrem Lorem Lorem LOrem Lorem LOrem Lorem Lorem LOrem Lorem LOrem Lorem Lorem LOrem Lorem LOrem Lorem Lorem LOrem</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Go back</Text>
            </Pressable>
           </View>
          </View>
        </View>
      </Modal>
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
        <Pressable
        style={{backgroundColor:"#FF7F2D",padding:8,borderRadius:20}}
        onPress={() => setModalVisible(true)}
      >
          <Button title='Get Started' color="#fff"/>
      </Pressable>
      </View>
      <View style={{flex:0.5,marginLeft:10}}>
        <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1048439876741251072/Screen_Shot_2022-12-02_at_10.25.38_PM.png"}}  style={{width:"100%",height:200,borderRadius:20}}/>
      </View>
     </View> : null}
          <View>
          <Text style={{fontSize:28,marginTop:20}}>Courses</Text>
         <ScrollView style={{paddingBottom:200}}>
         {
  searchinput === "" ?  
    lessons.map((lesson, key) => 
      <LessonCard key={key} title={lesson.title} desc={lesson.desc} img1={lesson.imgURL} fulldesc={lesson.fulldesc}/>
    )
  : 
    lessons.filter((lesson) => searchinput.toLocaleLowerCase().includes(lesson.title) ? 1 : -1).map((lesson) => {
      if(searchinput.toLocaleLowerCase().includes(lesson.title)) {
        return <LessonCard key={key} title={lesson.title} desc={lesson.desc} img1={lesson.imgURL}  />;
      } else {
        return null;
      }
    })
}
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
    backgroundColor: "#FF802C",
    padding:10,
    borderRadius:15
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