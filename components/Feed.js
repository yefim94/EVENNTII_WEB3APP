import { Text, View, Image, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-svg';
import { auth } from '../firebase';
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';

export const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [feedData2, setFeedData2] = useState([]);
  const [feedInput, setFeedInput] = useState("");
  const [apiqu, setApiqu] =  useState("");
  async function handleFeedIn () {
    setApiqu( feedInput )
    setFeedInput("")
  }
  //will call provided function when items in array is updated
  useEffect(() => {
  }, [feedData]);
  // will call provided function once after first render
  useEffect(() => {

    getData();
  }, [apiqu]);
  async function getData() {
    // you may want to change your api key
    const API_URL = `https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=${apiqu}&language=en&category=business,technology`
    {/**
  https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=web3&language=en&category=business,technology 
    https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=${apiqu}&country=us&language=en  */}
    const response = await fetch(
      API_URL
    );
    const data = await response.json();
    const results = data.results;
    setFeedData(results);

    const API_URL2 = `https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=web3&language=en&category=business,technology`
    {/**
  https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=web3&language=en&category=business,technology 
    https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=${apiqu}&country=us&language=en  */}
    const response2 = await fetch(
      API_URL2
    );
    const data2 = await response2.json();
    const results2 = data2.results;
    setFeedData2(results2);
    console.log(feedData2)
  }
  
  return (
    <View style={{
      borderRadius: 20, 
      padding: 20
    }}>
      <Text style={{fontSize: 40, fontWeight: "700"}}>News Feed</Text>
     <View style={{marginBottom: 20}}>
      <Text style={{fontSize: 25, fontWeight: "650", marginBottom: 10}}>What do you want to read?</Text>
      <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
      />
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}>
        <Text>Sign in with Facebook</Text>
      </LinearGradient>
     <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
     <TextInput
     placeholder='type news keyword'
        style={{
          backgroundColor: "#D1D1D1",
          borderRadius: 20,
          padding: 10,
          fontSize: 16,
          width: "60%"
        }}
        onChangeText={(val) => setFeedInput(val)}
        value={feedInput}
      />
<AntDesign name="rightcircle" size={30} color="#3A84EC"  onPress={handleFeedIn}/>
     </View>
     </View>
      <ScrollView >
      {apiqu ? <>
        <Text style={{fontSize:27, marginLeft:15,marginBottom:15,color:"#3A84EC"}}>News for <Text>{apiqu}</Text></Text>

        {feedData.map((element, key) => (
        <View  key={key} style={{
          backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            height: "auto",
            marginBottom: 30
        }}>
         <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20, 
          flexWrap: "wrap",
         }}>
         {element.image_url ? <Image
            source={{
              uri: `${element.image_url}`,
            }}
            // provide width to element or it wont render
            style={{width:"100%",height:200, borderRadius: 15, marginRight: 20}}

          /> : null }
          <Text style={{
            fontSize: 20,
            fontWeight: "700"
          }}>{element.title}</Text>
           <View style={{width: "auto"}}>
           <View style={{
            backgroundColor: "#3A84EC",
            padding: 5,
            width: 60,
            borderRadius: 10,
            marginTop:20
          }}>
          <Text style={{color: "#fff"}}>{apiqu}</Text>
          </View>
          <A style={{color:"grey",textDecorationLine: "underline",marginTop:10}} href={element.link}>Link</A>
           </View>
         </View>
         <View>
          <Text>{element.description}</Text>
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
      )} 
      </>: <>
      <Text style={{fontSize:27, marginLeft:15,marginBottom:15}}>Trending Topics:</Text>
      {feedData2.map((element, key) => (
        <View  key={key} style={{
          backgroundColor: "#fff",
            borderRadius: 20,
            padding: 20,
            height: "auto",
            marginBottom: 30
        }}>
         <View style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20, 
          flexWrap: "wrap",
         }}>
         {element.image_url ? <Image
            source={{
              uri: `${element.image_url}`,
            }}
            // provide width to element or it wont render
            style={{width:"100%",height:200, borderRadius: 15, marginRight: 20}}

          /> : null }
          <Text style={{
            fontSize: 20,
            fontWeight: "700"
          }}>{element.title}</Text>
           <View style={{width: "auto"}}>
           <View style={{
            backgroundColor: "#3A84EC",
            padding: 5,
            width: 100,
            borderRadius: 10,
            marginTop:20
          }}>
          <Text style={{color: "#fff"}}>TRENDING</Text>
          </View>
          <A style={{color:"grey",textDecorationLine: "underline",marginTop:10}} href={element.link}>Link</A>
           </View>
         </View>
         <View>
          <Text>{element.description}</Text>
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
      )}
      </>}
      </ScrollView>
    </View>
  )
}
