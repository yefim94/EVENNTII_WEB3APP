import { View, Text,StyleSheet,Modal,Image, ScrollView } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-svg';
import { auth } from '../firebase';
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';
import { Appearance, useColorScheme ,Share,Pressable} from 'react-native';
import { func } from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

export default function FeedCard({apiqu,image_url,title,description,link,language,creator,element}) {
  const [modalVisible, setModalVisible] = useState(false);   
   const onShare = async (title,link) => {
      try {
        const result = await Share.share({
          message:
            `EVENNTII NEWS :  ${title}`,
            url:`${link}`
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
    useEffect(() => {
    }, [])
    
  const upvote = () => {
    alert("upvoted")
  }
  const downvote = () => {
    alert("downvoted")
  }
  
  const handleFeedScreen = (image_url,title,description,link) => {
    setTitle2(title)
    setModalVisible(true) 
  }
  const colorScheme = useColorScheme()
  const newsCard = colorScheme ==="light"? feedS.newscard : feedS.newscardDark
  return (
    <View   style={newsCard}>
    <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
  }}
>
  <View style={{
    width:"100%",
    height:"100%",
    backgroundColor:`${colorScheme==="light"?"#fff":"#000"}`
  }}>
   
{image_url ? <View style={{width:"100%"}}>
    <Image source={{uri:image_url}} style={{height:400,width:"100%"}}/>
</View> : null}
    <ScrollView style={{padding:30,marginTop:30}}>
      <Text style={{
        color:`${colorScheme==="light"?"#000":"#fff"}`,
        fontSize:30,
        fontWeight:"700"
      }} >{title}</Text>
      <Text   style={{
        color:`${colorScheme==="light"?"#000":"#fff"}`,marginTop:18,fontSize:18
      }}>{description}</Text>
      <A style={feedS.linkss} href={link}>Link</A>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:"#3A84EC",borderRadius:20,padding:15,marginTop:20,marginBottom:50}}
      >
        <Text style={{color:"#fff",fontSize:17,textAlign:"center"}}>Back to News Articles</Text>
      </Pressable>
    </ScrollView>
  </View>
</Modal>
<Pressable
      onPress={() => setModalVisible(true)}
    >
   <View style={{
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20, 
    flexWrap: "wrap",
   }}>
   {image_url ? <Image
      source={{
        uri: image_url,
      }}
      // provide width to element or it wont render
      style={{width:"100%",height:200, marginRight: 20}}

    /> : null }
   <View style={{
     alignItems: 'baseline',
     padding:20
   }}>
   <View style={{
     alignItems: 'baseline'
   }}>
   <Text style={{
      fontSize: 20,
      fontWeight: "700",
      color:`${colorScheme==="light"?"#000":"#fff"}`
    }}>{title}</Text>
   </View>
     <View style={{}}>
    {apiqu ===""?"": <View style={{
      backgroundColor: "#3A84EC",
      padding: 5,
      borderRadius: 10,
      marginTop:20
    }}>
    <Text style={{color: "#fff"}}>{apiqu} {element.keywords ? `, ${element.keywords[0]}` : null}</Text>
    </View>}
    <A style={{color:"grey",textDecorationLine: "underline",marginTop:10}} href={link}>Link</A>
    
     </View>
   </View>
   </View>
    </Pressable>
   <View style={{paddingBottom:20,paddingLeft:20,paddingRight:20}}>
    <Text style={{
       color:`${colorScheme==="light"?"#000":"#fff"}`
    }}>{description}</Text>
    <View style={{width:"100%",height:1,borderRadius:20,marginTop:10, backgroundColor:`${colorScheme==="light"?"#000":"#fff"}`,marginTop:20}}></View>

    <Text style={{marginTop: 20, color: "grey"}}>{creator}</Text>
   <View style={{flexDirection: "row",alignItems: "center",marginTop:10}}>
    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
    <View style={{flexDirection:"row",alignItems:"center"}}>
    <View style={{
      backgroundColor:`${colorScheme==="light"?"#000":"#fff"}`,
      width:10,
      height:10,
      borderRadius:100,
      marginRight: 10
    }}></View>
    <Text style={{ color:`${colorScheme==="light"?"#000":"#fff"}`}}>{language}</Text>
    </View>
    <View style={{backgroundColor:"#3A84EC",padding:5,borderRadius:16,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
   
   <View style={{flexDirection:"row",alignItems:"center",marginLeft:10,marginRight:10}} >
   <FontAwesome name="share" size={24} color="white" onPress={() => onShare(title,link)} />
             <Text style={{color:"#fff",marginLeft:10}}>Share</Text>
   </View>
    </View>
   </View>
   </View>
   </View>
  </View>
  )
}
const feedS = StyleSheet.create({
  maincont:{
    borderRadius: 20, 
        padding: 20
  },
  mainhead:{fontSize: 40, fontWeight: "700"},
  lowermainc:{
    marginBottom: 20
  },
  smallhead:{fontSize: 25, fontWeight: "650", marginBottom: 10},
  teco:{flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
  teinput:{backgroundColor: "#D1D1D1",
  borderRadius: 20,
  padding: 10,
  fontSize: 16,
  width: "60%"},
  apikey:{fontSize:27},
  apikey2:{color:"#3A84EC",fontWeight:"700"},
  newscard:{ backgroundColor: "#fff",
  borderRadius: 0,
  marginBottom: 30,
  flex:1},
  newscardDark:{ backgroundColor: "#052451",
  borderRadius: 0,
  marginBottom: 30,
  flex:1},
  imcont:{backgroundColor:"#fff",height:"100%",width:"100%",paddingBottom:60},
  title:{color:"#000",fontSize:26,fontWeight:"700"},
  linkss:{
    color:"grey",textDecorationLine: "underline",marginTop:10
  }
  })