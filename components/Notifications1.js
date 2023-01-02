import React, {useEffect, useState} from 'react'
import { ScrollView, Text,  View, StyleSheet ,Image,TextInput,Animated,Button} from 'react-native'
import {
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import {auth} from "../firebase"
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';
import { Appearance, useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import NotifcationCard from "./NotifcationCard"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/**
 * const [search,setSearch] = useState = ()
 *const [query,setQuery] = usesState("")
 const ddata = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then((e) => e.json).then((e) => setSearch(e.coins))
 */

export const Notifications1 = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
        useNativeDriver: true, // <-- Add this
    }).start();
  }, []);


  useEffect(() => {
    getData()
  }, [])
  const [data,setData] = useState()
  const [defi,setDefi] = useState()
  const [company,setCompany] = useState()
  const [trending,setTrending] = useState()
  async function getData() {
   try {
    const dete = await fetch("https://api.coingecko.com/api/v3/search/trending").then((e) => e.json()).then((e) => setTrending(e.coins))
    const we = await fetch("https://api.coingecko.com/api/v3/global/decentralized_finance_defi")
    const se= await we.json()
    setDefi(se.data)
    {/**
  https://api.coingecko.com/api/v3/search/trending
https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true

  */}
  const rawData = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false")
  const d = await rawData.json()
  setData(d)

  const rawCompany = await fetch("https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin")
  const e = await rawCompany.json()
  setCompany(e.companies)

  const ew = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily  ").then((e)=>e.json()).then((e)=>setHistorical(e))
}
   catch(err) {
    alert(err)
   }
  }
  const [historical,setHistorical] = useState()
  const username = auth.currentUser.email.replace(/@gmail.com/, '').replace(/@yahoo.com/, '')
  
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientTo: "#fff",
    backgroundGradientFrom: "#fff",
    color: (opacity = 1) => `rgba(0,0,0,0.4)`,
  };
  const colorScheme = useColorScheme();
  const data22 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

  return (
    <Animated.View
    style={{
      opacity: fadeAnim,
    }}>
    <View style={colorScheme === "light" ? {backgroundColor:"#F5F5F5"}: {backgroundColor:"#000"}}>
      
      <Text style={{fontSize: 40, fontWeight: "700", marginTop: 20,paddingLeft:16,color:`${colorScheme === "light" ? "#000":"#fff"}`}}>Market Data 📈</Text>
      <Text style={{fontSize: 20,paddingLeft:16,color:`${colorScheme === "light" ? "#000":"#fff"}`,marginBottom:30}}>Market data for crypto</Text>
<ScrollView>
<LineChart width={600} height={300} data={data22}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
<Text style={{marginLeft:20,fontWeight:"700",fontSize:30,color:`${colorScheme==="light"?"#000":"#fff"}`}}>Top Ranked Coins</Text>
{trending ? trending.map((doc,key) => <View  key={key}style={{flexDirection:"row",backgroundColor:`${colorScheme==="light"?"#fff":"#052451"}`,borderRadius:20,padding:10,marginTop:20}}>
<View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
<Image source={{
    uri: doc.item.large
  }} style={{width:50,height:50,borderRadius:400}}/>
</View>
  <View style={{flex:4,marginLeft:10}}>
    <Text style={{fontWeight:"700",fontSize:20,color:`${colorScheme ==="light"?"#000":"#3A84EC"}`}}>{doc.item.name}</Text>
   <View style={{flexDirection:"row",alignItems:"center",marginTop:15}}>
   <Text style={{color:`${colorScheme==="light"?"#000":"#fff"}`}}>Market Cap Rank</Text>
    <Text style={{color:"#3A84EC",marginLeft:15}}>{doc.item.market_cap_rank}</Text>
   </View>
 <View style={{flexDirection:"row",alignItems:"center",marginTop:15}}>
 <Text style={{color:`${colorScheme==="light"?"#000":"#fff"}`}}>BTC price</Text>
    <Text style={{color:`${colorScheme ==="light"?"#000":"#3A84EC"}`,marginLeft:15}}>${doc.item.price_btc.toFixed(10)}</Text>
 </View>
  </View>
  <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Text style={{marginBottom:10,color:`${colorScheme==="light"?"#000":"#fff"}`}}>RANK</Text>
    <Text style={{fontWeight:"700",color:`${colorScheme==="light"?"#000":"#3A84EC"}`,fontWeight:"700"}}>{doc.item.score}</Text>
  </View>
</View>):null}
     <Text style={{fontSize:30,fontWeight:"700",color:`${colorScheme==="light"?"#000":"#fff"}`,marginBottom:10,marginLeft:20,marginTop:20}}>Top Companies</Text>
     <Text style={{textDecorationLine:"underline",color:"grey",fontSize:10,marginBottom:20,marginLeft:20}}>**public companies bitcoin</Text>
     <ScrollView style={{backgroundColor:`${colorScheme==="light"?"#3772FF":"#052451"}`,padding:10,borderRadius:20,marginBottom:16}}>
<View style={{height:300}}>
{company && company.map((doc) => <View style={{padding:10,borderRadius:10,backgroundColor:"#fff",color:"#3772FF",marginBottom:15,flexDirection:"row",justifyContent:"space-between"}}>
  <Text style={{fontWeight:"700"}}>{doc.name}</Text>
  <Text>{doc.country}</Text>
</View>)}
</View>
     </ScrollView>
     <Text style={{color:`${colorScheme==="light"?"#000":"#fff"}`,fontWeight:"700",fontSize:30,marginLeft:20}}>Currency Price</Text>
      <ScrollView style={{
        padding: 0, margin: 0
      }}>
        <Text style={{textDecorationLine:"underline",color:"grey",fontSize:10,marginBottom:20,marginLeft:20}}>**Data measured daily</Text>
        {data && data.map((doc) => <>
       <NotifcationCard name={doc.name} image={doc.image} symbol={doc.symbol} price_change_24h={doc.price_change_24h} current_price={doc.current_price} />
        </>)}
      </ScrollView>
</ScrollView>
    </View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  textno: {
    fontSize: 20,
    fontWeight: "700"
  }
})