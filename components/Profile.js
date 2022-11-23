// importing
import React from 'react'
import {useState, useEffect} from "react"
import { Text, View,ImageBackground, ScrollView, Button, Image, StyleSheet , TextInput,Pressable,Modal} from 'react-native'
import { func } from 'prop-types';
import { AntDesign } from '@expo/vector-icons'; 
{/**import Carousel from 'react-native-snap-carousel';
 */}
 import * as Linking from 'expo-linking';
 import { A } from '@expo/html-elements';
 import { Appearance, useColorScheme } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';


export const Profile = () => {
  //state
  const [profileData, setProfileData] = useState([]);
  const [apiQ,setApiQ] = useState("")
  const [nfttei,setNftTei] = useState("")
  const [comments,setComments] = useState([])
  const[commentText,setCommentText] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [pressed,setPressed] = useState(false)
 //functions 
 async  function getData () {
  try {
    const options = {method: 'GET', headers: {accept: 'application/json', 'X-API-Key': 'WYON0dXwg4zG3GSsaPb79ofaPTLAbDUpmt01OuTlZihmzoH1F059it3bdsXSou0t'}};
const data = await fetch(`https://deep-index.moralis.io/api/v2/nft/search?chain=eth&format=decimal&q=${apiQ}&filter=name&limit=10`, options)
const ddata = await data.json()
setProfileData(ddata.result)
  }
   catch(ee) {
    alert(ee)
   }
  }

  async function handleNftIn () {
   setApiQ(nfttei)
   setNftTei("")
  }
 
  useEffect(() => {
    getData();
    
  }, [apiQ]);
  function liked (id) {
    setPressed(true)
  }
  return (
    <View style={profileStyles.overallcont}>
    <Text style={profileStyles.mainheading}>NFTS</Text>
    <View style={profileStyles.lowerarea}>
    <Text style={profileStyles.lowerheading}>What kind of NFT?</Text>
   <View style={profileStyles.bottom}>
   <TextInput
   placeholder='type nft keyword'
      style={profileStyles.textin}
      onChangeText={(val) => setNftTei(val)}
      value={nfttei}
    />
<AntDesign name="rightcircle" size={30} color="#3A84EC"  onPress={handleNftIn}/>
   </View>
   </View>
    <ScrollView>
    {profileData ? <>
      {profileData.map((el, key,id) => 
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
      <View>
        <Image source={{
          uri:`https://blockworks.co/wp-content/uploads/2022/01/Bored-Ape-Yacht-Club_Ape_wide.jpg`
        }} style={{width:"100%",height:400}}></Image>
      </View>
       <View style={{backgroundColor:"#fff",height:"100%",padding:40}}>
        
        
           <Pressable
             onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor:"#3A84EC",padding:20,borderRadius:20}}
           >
             <Text style={{color:"#fff"}}>Hide Modal</Text>
           </Pressable>
       </View>
     </Modal>
        <Pressable   onPress={() => setModalVisible(true)} key={key}>
          <View style={{
          backgroundColor: "#fff",
          display: `${JSON.parse(el.metadata).image.includes("https") ? "block": "none"}`,
          borderRadius: 20,
          marginBottom: 20
        }} key={key}>
          <View style={{position: "relative"}}>
            <View style={profileStyles.liikebtn}>
            <AntDesign onPress={(id) => liked(id)} name="heart" size={24} color={pressed ? "#FF717B": "grey"} />
            </View>
          {JSON.parse(el.metadata).image.includes("https") ? <>
              <Image source={{
            uri: `${JSON.parse(el.metadata).image}`
          }} style={{width: "1005", height: 200, width: "100%",borderTopLeftRadius:20,borderTopRightRadius:20}}/> 
          </>: null}
          </View>
          <View style={profileStyles.lowercont}>
            <View style={profileStyles.lower1}>
              <Text style={profileStyles.lower2}>ID</Text>
              <View style={profileStyles.line}></View>
              <Text style={profileStyles.id}>{el.token_id}</Text>
            </View>
            <Text style={profileStyles.name} key={key}>{JSON.parse(el.metadata).name}</Text>
          <Text>{JSON.parse(el.metadata).description}</Text>
          <View style={profileStyles.lowerlowerco}>
            {el.token_uri.includes("https") ? <>
            <A style={profileStyles.link} href={el.token_uri}><Text>learn More</Text></A> 
            </> : <Text>Learn More</Text>} 
             </View>
          </View>
        </View>
        </Pressable>
      </>
      )} 
      
    </>: <>
    <Text style={{
      fontWeight:"700",
      color:"#000",
      fontSize:20,
      marginBottom:20
    }}>Try searching something! Anything!</Text>
    <Image source={{
    uri:"https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/50e513115094373.6047d1f4cf3f1.jpg"
    }} style={{
      width:"100%",
      borderRadius:20,
      height:500
    }}/>
    </>}
      </ScrollView>
      </View>
  )
}

const profileStyles = StyleSheet.create({
  overallcont:{padding: 20},
  mainheading:{fontSize: 40, fontWeight: "700"},
  lowerarea:{
    marginBottom: 20
  },
  lowerheading:{fontSize: 25, fontWeight: "650", marginBottom: 10},
  signout: {
    backgroundColor: '#3A84EC',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 10,
    fontSize: 20
  },
  bottom:{
    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  },
  textin:{backgroundColor: "#D1D1D1",
  borderRadius: 20,
  padding: 10,
  fontSize: 16,
  width: "60%"},
  liikebtn:{position: "absolute", zIndex: 10, right: 0, backgroundColor: "#fff", padding: 8,borderRadius: 30, marginRight: 20, marginTop: 10},
  lowercont:{marginTop: 20, padding:20},
  lower1:{flexDirection: "row", alignItems:"center"},
  lower2:{marginRight:10, color: "grey"},
  line:{width: 10,height:10,backgroundColor:"#000", borderRadius:50},
  id:{marginLeft: 10},
  name:{fontSize: 20, fontWeight: "700", marginBottom: 10},
  lowerlowerco:{backgroundColor: "#3A84EC", borderRadius: 10,padding:7,justifyContent: "center", alignItems: "center",marginTop:20},
  link:{color:"white", fontSize: 19}
})