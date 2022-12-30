import React, {useEffect, useState} from 'react'
import { ScrollView, Text,  View, StyleSheet ,Image,TextInput} from 'react-native'
import {
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import {auth} from "../firebase"
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';
import { Appearance, useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import NotifcationCard from "./NotifcationCard"

/**
 * const [search,setSearch] = useState = ()
 *const [query,setQuery] = usesState("")
 const ddata = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`).then((e) => e.json).then((e) => setSearch(e.coins))
 */

export const Notifications1 = () => {
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
}
   catch(err) {
    alert(err)
   }
  }
  const username = auth.currentUser.email.replace(/@gmail.com/, '').replace(/@yahoo.com/, '')
  
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientTo: "#fff",
    backgroundGradientFrom: "#fff",
    color: (opacity = 1) => `rgba(0,0,0,0.4)`,
  };
  const colorScheme = useColorScheme();
  return (
    <View style={colorScheme === "light" ? {backgroundColor:"#F5F5F5"}: {backgroundColor:"#000"}}>
      
      <Text style={{fontSize: 40, fontWeight: "700", marginTop: 20,paddingLeft:16,color:`${colorScheme === "light" ? "#000":"#fff"}`}}>Market Data 📈</Text>
      <Text style={{fontSize: 20,paddingLeft:16,color:`${colorScheme === "light" ? "#000":"#fff"}`}}>Market data for crypto</Text>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center",margin:20}}>
     <TextInput
     placeholder='type cryptocurrency'
        style={{
          backgroundColor: `${colorScheme==="light"?"#D1D1D1":"#052451"}`,
          borderRadius: 20,
          padding: 10,
          fontSize: 16,
          width: "60%"
        }}
      />
<AntDesign name="rightcircle" size={30} color="#3A84EC" />
     </View>
<ScrollView>
<Text style={{marginLeft:20,fontWeight:"700",fontSize:30}}>Top Trending Coins</Text>
{trending && trending.map((doc) => <View style={{flexDirection:"row",backgroundColor:`${colorScheme==="light"?"#fff":"#052451"}`,borderRadius:20,padding:10,margin:10,}}>
<View style={{flex:1}}>
<Image source={{
    uri: doc.item.large
  }} style={{width:50,height:50,borderRadius:400}}/>
</View>
  <View style={{flex:4,marginLeft:10}}>
    <Text style={{fontWeight:"700",fontSize:20,color:`${colorScheme ==="light"?"#000":"#fff"}`}}>{doc.item.name}</Text>
    <Text style={{color:"#3A84EC",marginTop:15}}>{doc.item.market_cap_rank}</Text>
    <Text style={{color:`${colorScheme ==="light"?"#000":"#fff"}`,marginTop:15}}>${doc.item.price_btc}</Text>
  </View>
  <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Text style={{fontWeight:"700",color:`${colorScheme==="light"?"#000":"#fff"}`}}>{doc.item.score}</Text>
  </View>
</View>)}
  <Text style={{marginLeft:20,fontWeight:"700",fontSize:30}}>Global defi</Text>
       <View style={{padding:20}}>
       {defi && <View>
          <Text>{defi.defi_market_cap}</Text>
          <Text>{defi.eth_market_cap}</Text>
          <Text>{defi.defi_to_eth_ratio}</Text>
          <Text>{defi.trading_volume_24h}</Text>
          <Text>{defi.top_coin_name}</Text>

          </View>}
       </View>
  <Text style={{marginLeft:20,fontWeight:"700",fontSize:30,color:`${colorScheme==="light"?"#000":"#fff"}`}}>Wallet</Text>
<View style={{padding:20,backgroundColor:`${colorScheme==="light"?"#000":"#052451"}`,margin:20,borderRadius:20}}>
      <Text style={{color:"grey",fontSize:20}}>Profile Balance: </Text>
      <Text style={{color:"white",fontSize:30,fontWeight:"700"}}>$45,000</Text>
     </View>
     <View style={{marginLeft:20}} >
      <Text style={{color:"grey",textDecorationLine:"underline"}}>Tap to connect wallet.</Text>
     </View>
     <Text style={{fontSize:30,fontWeight:"700",color:"#000",marginBottom:10,marginLeft:20,marginTop:20}}>Top Companies</Text>
     <ScrollView style={{margin:20,backgroundColor:"#3772FF",padding:10,borderRadius:20}}>
<View style={{height:200}}>
{company && company.map((doc) => <View style={{padding:10,borderRadius:10,backgroundColor:"#fff",color:"#3772FF",marginBottom:15}}>
  <Text style={{fontWeight:"700"}}>{doc.name}</Text>
</View>)}
</View>
     </ScrollView>
     <Text style={{color:"#000",fontWeight:"700",fontSize:30,marginLeft:20}}>Currency Basic Data</Text>
      <ScrollView style={{
        padding: 0, margin: 30
      }}>
        <Text style={{textDecorationLine:"underline",color:"grey",fontSize:10,marginBottom:20}}>**Chart measured weekly</Text>
        {data && data.map((doc) => <>
       <NotifcationCard name={doc.name} image={doc.image} symbol={doc.symbol} price_change_24h={doc.price_change_24h} current_price={doc.current_price} />
        </>)}
      </ScrollView>
</ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  textno: {
    fontSize: 20,
    fontWeight: "700"
  }
})