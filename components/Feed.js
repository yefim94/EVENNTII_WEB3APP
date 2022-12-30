//imports
import { Text, View, Image, ScrollView, TextInput,StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-svg';
import { auth } from '../firebase';
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';
import { Appearance, useColorScheme ,Share,Pressable,Modal} from 'react-native';
import { func } from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import FeedCard from "./FeedCard"
export const Feed = () => {
  //state
  const [feedData, setFeedData] = useState([]);
  const [feedData2, setFeedData2] = useState([]);
  const [feedInput, setFeedInput] = useState("");
  const [apiqu, setApiqu] =  useState("");
  const [title2,setTitle2] = useState("")
  //functions
  async function handleFeedIn () {
    setApiqu( feedInput )
    setFeedInput("")
  }
  useEffect(() => {
  console.log(colorScheme);
  }, [])
  
  useEffect(() => {
    getData();
  }, [apiqu]);
  async function getData() {
  try {
   // you may want to change your api key
   const API_URL = `https://newsdata.io/api/1/news?apikey=pub_13280f1809c94d7b0f780691e151f809dbcd4&q=${apiqu}&language=en&category=business,technology`
   {/**
 https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=web3&language=en&category=business,technology 
   https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=${apiqu}&country=us&language=en  */}
   const response = await fetch(
     API_URL
   );
   const data = await response.json();
   const results = data.results;
   setFeedData(results);

   const API_URL2 = `https://newsdata.io/api/1/news?apikey=pub_13280f1809c94d7b0f780691e151f809dbcd4&q=web3&language=en&category=business,technology`
   {/**
 https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=web3&language=en&category=business,technology 
   https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=${apiqu}&country=us&language=en  */}
   const response2 = await fetch(
     API_URL2
   );
   const data2 = await response2.json();
   const results2 = data2.results;
   setFeedData2(results2);
  } catch(E) {
    alert(E)
  }
  }
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
  const colorScheme = useColorScheme();
  const mainhead = colorScheme === 'light' ? feedS.mainhead : feedS.mainheadDark;

  return (
    <View style={colorScheme === "light" ? {}:{backgroundColor:"#000"}}>
 <View style={{padding:20}}>
 <Text style={mainhead}>News Feed 📰</Text>
     <View style={feedS.lowermainc}>
      <Text style={{color:`${colorScheme==="light"?"#000":"#fff"}`,fontSize:20,marginBottom:10,marginTop:10}}>What do you want to read?</Text>
     <View style={feedS.teco}>
     <TextInput
     placeholder='type news keyword'
        style={{backgroundColor: `${colorScheme==="light"?"#D1D1D1":"#052451"}`,
        borderRadius: 20,
        padding: 10,
        fontSize: 16,
        width: "60%"}}
        onChangeText={(val) => setFeedInput(val)}
        value={feedInput}
      />
<AntDesign name="rightcircle" size={30} color="#3A84EC"  onPress={handleFeedIn}/>
     </View>
     </View>
 </View>
   {apiqu ?  <View style={{backgroundColor:"#fff",padding:10,borderRadius:20,marginBottom:16,marginLeft:15,marginRight:20}}>
    <Text style={feedS.apikey}>News for <Text style={feedS.apikey2}>{apiqu}</Text></Text>
    </View> : null}
      <ScrollView  showsHorizontalScrollIndicator={false}>
      {apiqu ? <>


        {feedData.map((element, key) => (
          <FeedCard element={element} key={key} apiqu={apiqu} image_url={element.image_url} title={element.title} description={element.description} link={element.link} creator={element.creator} language={element.language}/>
        )
      )} 
      </>: <>
      <Text style={{fontSize:27, marginLeft:15,marginBottom:15}}>Trending Topics:</Text>
          {feedData2 === undefined ? feedData2.map((element, key) => (
        <View  key={key} style={{
          backgroundColor: "#fff",
            margin:5,
            marginBottom: 30,
            flex:1,
            shadowColor: '#3A84EC',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 2,
            shadowOpacity: 1.0
        }}>
         <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 2, 
          flexWrap: "wrap",
         }}>
         {element.image_url ? <Image
            source={{
              uri: `${element.image_url}`,
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
          }}>{element.title}</Text>
         </View>
           <View style={{}}>
           <View style={{
            backgroundColor: "#3A84EC",
            padding: 5,
            borderRadius: 10,
            marginTop:20
          }}>
          <Text style={{color: "#fff"}}>TRENDING</Text>
          </View>
          <A style={{color:"grey",textDecorationLine: "underline",marginTop:10}} href={element.link}>Link</A>
          
           </View>
         </View>
         </View>
         <View style={{paddingBottom:20,paddingLeft:20,paddingRight:20}}>
          <Text>{element.description}</Text>
          <View style={{width:"100%",height:1,backgroundColor:"#000", borderRadius:20}}></View>

          <Text style={{marginTop: 20, color: "grey"}}>{element.creator}</Text>
         <View style={{flexDirection: "row",alignItems: "center"}}>
          <View style={{
            backgroundColor:"#000",
            width:10,
            height:10,
            borderRadius:100,
            marginRight: 10
          }}></View>
         <Text style={{color: "#000"}}>{element.language}</Text>
         </View>
         </View>
        </View>
      )
      ) : null}
      </>}
      </ScrollView>
    </View>
  )
}
const feedS = StyleSheet.create({
mainhead:{fontSize: 40, fontWeight: "700",color:"#000"},
mainheadDark:{fontSize: 40, fontWeight: "700",color:"#fff"},
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
apikey2:{color:"#3A84EC",fontWeight:"700", textShadowColor: '#86B2F1', textShadowOffset: { width: 0, height: 4.5 }, textShadowRadius: 3,
},
newscard:{ backgroundColor: "#fff",
borderRadius: 20,
marginBottom: 30,
flex:1},
imcont:{backgroundColor:"#fff",height:"100%",padding:40},
title:{color:"#000",fontSize:26,fontWeight:"700"},
linkss:{
  color:"grey",textDecorationLine: "underline",marginTop:10
}
})