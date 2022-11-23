import { View, Text, Image,TextInput,ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import {db} from "../firebase"
import { collection, query, where, getDocs,addDoc,onSnapshot } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';

export default function Forums() {
  const [comments,setComments] = useState([])
  const[commentText,setCommentText] = useState("")
  const [feedInput, setFeedInput] = useState("");

  async function handleFeedIn () {
    setApiqu( feedInput )
    setFeedInput("")
  }
  const handleNewComment = async() =>{
    try {
      const docRef = await addDoc(collection(db, "comments"), {
        description: commentText
      });
    
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      alert(e)
    }
    
    setCommentText("")
  }
  useEffect(() => {
    const projectsref =  collection(db, "comments");

    async function getallComments () {
    try {
      const q = await query(projectsref)
      onSnapshot(q, (snapshot) => {
        let todos = []
        snapshot.forEach((doc) => {todos.push(doc.data())})
        setComments(todos)
      })
   }
   catch(e){
    alert(e)
   }
    
    }
     
     getallComments()
  }, [comments])
  return (
    <View style={{}}>
    <View style={{marginBottom: 4,padding:20}}>
    <Text style={{fontSize: 40, fontWeight: "700"}}>Forums</Text>
      <Text style={{fontSize: 25, fontWeight: "650", marginBottom: 10}}>Which Forum do You want to see?</Text>
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
<ScrollView horizontal={true} style={{marginBottom:20,marginLeft:20}}>
<View style={{flexDirection:"row",width:"100%",justifyContent:"space-around",alignItems:"center"}}>
    <View style={{backgroundColor:"#3A84EC",borderRadius:20,marginRight:15,paddingBottom:10}}>
      <Text style={{color:"#fff",padding:10,fontWeight:"700",borderRadius:20,paddingBottom:10}}>Bitcoin</Text>
    </View>
    <View style={{backgroundColor:"#fff",borderRadius:20,marginRight:15}}>
      <Text style={{color:"#000",padding:10,fontWeight:"700",borderRadius:20}}>ETH</Text>
    </View>
    <View style={{backgroundColor:"#fff",borderRadius:20,marginRight:15}}>
      <Text style={{color:"#000",padding:10,fontWeight:"700",borderRadius:20}}>LUNA</Text>
    </View>
    <View style={{backgroundColor:"#fff",borderRadius:20}}>
      <Text style={{color:"#000",padding:10,fontWeight:"700",borderRadius:20}}>CAD</Text>
    </View>
   </View>
</ScrollView>
   <ScrollView style={{marginBottom:100}}>
      <View style={{backgroundColor:"#D9D9D9",margin:20,borderRadius:20}}>
      <View style={{position:"relative",borderRadius:20}}>
    <Image source={{
      uri:"https://archive.org/download/wallstreetbets/dqqsn9rf8kw41.jpg"
    }} style={{width:"100%",height:200,borderTopLeftRadius:20,borderTopRightRadius:20}}/>
    <View style={{borderRadius:10,backgroundColor:"#fff",position:"absolute",bottom:0,left:0,marginLeft:10,marginBottom:10}}>
    <Text style={{color:"#000",fontWeight:"700",fontSize:20,padding:15}}>BTC PRICE PREDICTIONS:🔥</Text>
    </View>
       </View>
{/**
 * 
 *         <Text style={{color:"#3A84EC",fontSize:25,fontWeight:"600",marginBottom:14,marginLeft:20}}>Comments: </Text>
        <View style={{width:"100%",height:3,backgroundColor:"#000", borderRadius:20,marginBottom:10}}></View>

 */}
      {comments.map((doc,key) => 
      <ScrollView style={{paddingLeft:20,paddingRight:20,marginTop:20}}>
           <View key={key} style={{
              flexDirection:"row",
              alignItems:"center",
              backgroundColor:"#fff",
              padding:10,
              borderRadius:10,
              marginBottom:20,
              paddingBottom:40
            }}>
              <View style={{
                width:50,height:50,
                borderRadius:70,backgroundColor:"#000",marginRight:10,alignItems:"center",justifyContent:"center"
              }}><Text style={{color:"#fff",fontWeight:"650",fontSize:20}}>Y</Text></View>
              <View style={{borderRadius:20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0)',
              flex:1
                }}>
              <Text style={{borderRadius:10,color:"#000",fontWeight:"700",fontSize:16}}>{doc.description}</Text>
              <Text>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem</Text>
              </View>
              <View>
              <AntDesign name="heart" size={24} color="#FF717B" />
              </View>
            </View>
      </ScrollView>
          )}
             <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",paddingLeft:20,marginBottom:200}}>
              <TextInput
              placeholder='add comment'
                  style={{
                    backgroundColor: "#fff",
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
   </ScrollView>
    </View>
  )
}