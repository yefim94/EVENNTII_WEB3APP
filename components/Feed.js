import { Text, View, Image, ScrollView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'react-native-svg';
import { auth } from '../firebase';

export const Feed = () => {
  const [feedData, setFeedData] = useState([]);
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
    const API_URL = `https://newsdata.io/api/1/news?apikey=pub_11306c8c5e2932eab7155edacbc6339247174&q=${apiqu}&country=us&language=en `
    const response = await fetch(
      API_URL
    );
    const data = await response.json();
    const results = data.results;
    setFeedData(results);
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
         </View>
         <View>
          <Text>{element.description}</Text>
          <Text style={{marginTop: 20, color: "grey"}}>{element.creator}</Text>
          <Text style={{color: "grey"}}>{element.language}</Text>
         </View>
        </View>
      )
      )}
      </ScrollView>
    </View>
  )
}
