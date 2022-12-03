import { View, Text, ScrollView,Image, Button, TextInput,Modal,Pressable } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import LessonCard from './LessonCard';
import { useState } from 'react';
export default function Learn() {
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
            uri:"https://thegivingblock.com/wp-content/uploads/2021/07/Learn-Crypto-The-Giving-Block.png"
           }} style={{width:"100%",height:300}} />
         <View style={{padding:10}}>
         <Text style={{marginTop:20,fontSize:26,fontWeight:"700",marginBottom:10}}>So...What is Web 3</Text>
           <Text>LOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREOLOREM LOREM LOREM LREO</Text> 
         </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={learnStyle.learncont}>
      <Text style={learnStyle.even}>EVVENNTI</Text>
      <Text style={learnStyle.learn}>Learn</Text>
      </View>
      <View style={{marginTop:20,flexDirection:"row", width:"100%",alignItems:"center",backgroundColor:"#F3F5F9",borderRadius:20,paddingLeft:15}}>
      <Feather name="search" size={24} color="#FF802C"style={{flex:0.1}} />
        <TextInput style={{padding:20,borderRadius:20,flex:0.9}} placeholder="type lesson keyword" placeholderTextColor="grey" color="#000"/>
      </View>
     <View style={{width:"100%",flexDirection:"row",marginTop:30,borderRadius:20,backgroundColor:"#CFECFE"}}>
      <View style={{flex:0.5,padding:20}}>
        <Text style={{fontSize:20,fontWeight:"700",marginBottom:20}}>What do you want to learn Today?</Text>
        <View style={{backgroundColor:"#FF7F2D",padding:8,borderRadius:20}}>
          <Button title='Get Started' color="#fff"/>
        </View>
      </View>
      <View style={{flex:0.5,marginLeft:10}}>
        <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1048439876741251072/Screen_Shot_2022-12-02_at_10.25.38_PM.png"}}  style={{width:"100%",height:200,borderRadius:20}}/>
      </View>
     </View>
          <View>
          <Text style={{fontSize:28,marginTop:20}}>Courses</Text>
         <ScrollView style={{paddingBottom:200}}>
         <LessonCard setModalVisible={setModalVisible} title="Intro to Web 3" desc="learn about blochain,currency,hashing, and more" img1="https://cdn.discordapp.com/attachments/783336191529320498/1048445958368808960/Screen_Shot_2022-12-02_at_10.49.52_PM.png" />
         <LessonCard setModalVisible={setModalVisible} title="Crypto Coins" desc="learn about blochain,currency,hashing, and more" img1="https://s2.coinmarketcap.com/static/img/coins/200x200/1.png" />
         <LessonCard setModalVisible={setModalVisible} title="Cold storage vs Hot storage" desc="learn about blochain,currency,hashing, and more" img1="https://wired.me/wp-content/uploads/2022/05/Lead-copy.jpg" />
         <LessonCard setModalVisible={setModalVisible} title="Should You Invest" desc="learn about blochain,currency,hashing, and more" img1="https://media.gq-magazine.co.uk/photos/5e25d00550c26e0008a9b030/master/pass/20200120-invest.jpg" />
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
