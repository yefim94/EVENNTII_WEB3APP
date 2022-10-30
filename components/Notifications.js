import React, {useEffect, useState} from 'react'
import { ScrollView, Text,  View, StyleSheet ,Image} from 'react-native'
import {
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import { LineChart, Grid ,XAxis} from 'react-native-svg-charts'
import {auth} from "../firebase"
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';



export const Notifications = () => {
  

  const [historicData, setHistoricData] = useState();
  const [btcprice, setBtcPrice] = useState(null)
  const [ethPrice, setEthPrice] = useState(null)
  const [cardPrice, setCardPrice] = useState(null)
  const [hisbtcprice, setHisBtcPrice] = useState()
  const [hisethPrice, setHisEthPrice] = useState([])
  const [hiscardPrice, setHisCardPrice] = useState([])
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [loader, setLoader] = useState(false)
  const[moreBtc,setBtcMore] = useState()
  const [btcImage,setBtcImage] = useState("")
  const[moreEth,setEthMore] = useState()
  const [ethImage,setEthImage] = useState("")
  const[moreADA,setADAMore] = useState()
  const [adaImage,setADAImage] = useState("")
const [btclink,setBtcLink] =useState("")
const [btcpostive,setBtcPositive] =useState("")
const [btcnegative,setBtcNegative] =useState("")
const [btcdesc,setBtcDesc] =useState("")
const [btcvolume,setBtcVolume] =useState()
const [ethlink,setEthLink] =useState("")
const [ethpostive,setEthPositive] =useState("")
const [ethnegative,setEthNegative] =useState("")
const [ethdesc,setEthDesc] =useState("")
const [ethvolume,setEthVolume] =useState()
const [adalink,setAdaLink] =useState("")
const [adapostive,setAdaPositive] =useState("")
const [adanegative,setAdaNegative] =useState("")
const [adadesc,setAdaDesc] =useState("")
const [adavolume,setAdaVolume] =useState()
  async function getBtcPrice (){   
      const data = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(e => e.json())
      const marketData = await data.market_data.current_price.usd
      setBtcPrice(marketData)

      const hisdata = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=4&interval=daily`).then(e => e.json())
      setData1(hisdata.prices)

      const btcMoreData = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(e => e.json())
      setBtcMore(btcMoreData.market_data.price_change_percentage_24h.toFixed(2))
      setBtcImage(btcMoreData.image.small)
      setBtcDesc(btcMoreData.description.en)
      setBtcVolume(btcMoreData.market_data.total_volume.usd)
      setBtcLink(btcMoreData.links.homepage[0])
      setBtcNegative(btcMoreData.sentiment_votes_down_percentage)
      setBtcPositive(btcMoreData.sentiment_votes_up_percentage)
  }

  async function getEthPrice (ethereum){   
    const data = await fetch("https://api.coingecko.com/api/v3/coins/ethereum").then(e => e.json())
    const marketData = await data.market_data.current_price.usd
    setEthPrice(marketData)

    const hisdata = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=5&interval=daily`).then(e => e.json())
    setData2(hisdata.prices)

    const moreEth = await fetch("https://api.coingecko.com/api/v3/coins/ethereum").then(e => e.json())
    setEthMore(moreEth.market_data.price_change_percentage_24h.toFixed(2))
      setEthImage(moreEth.image.small)

      setEthImage(moreEth.image.small)
      setEthDesc(moreEth.description.en)
      setEthVolume(moreEth.market_data.total_volume.usd)
      setEthLink(moreEth.links.homepage[0])
      setEthNegative(moreEth.sentiment_votes_down_percentage)
      setEthPositive(moreEth.sentiment_votes_up_percentage)
}
async function cardPrice1 (cardano){   
  const data = await fetch("https://api.coingecko.com/api/v3/coins/cardano").then(e => e.json())
  const marketData = await data.market_data.current_price.usd
  setCardPrice(marketData)

  const hisdata = await fetch(`https://api.coingecko.com/api/v3/coins/cardano/market_chart?vs_currency=usd&days=5&interval=daily`).then(e => e.json()) 
  setData3(hisdata.prices)

  const moreADA = await fetch("https://api.coingecko.com/api/v3/coins/cardano").then(e => e.json())
      setADAMore(moreADA.market_data.price_change_percentage_24h.toFixed(2))
      setADAImage(moreADA.image.small)
      setAdaDesc(moreADA.description.en)
      setAdaVolume(moreADA.market_data.total_volume.usd)
      setAdaLink(moreADA.links.homepage[0])
      setAdaNegative(moreADA.sentiment_votes_down_percentage)
      setAdaPositive(moreADA.sentiment_votes_up_percentage)
}
  useEffect(() => {
    getBtcPrice()
    getEthPrice()
    cardPrice1()
    setLoader(false)
  }, [])
  const username = auth.currentUser.email.replace(/@gmail.com/, '').replace(/@yahoo.com/, '')
  
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientTo: "#fff",
    backgroundGradientFrom: "#fff",
    color: (opacity = 1) => `rgba(0,0,0,0.4)`,
  };
  return (
    <View style={{position: "relative",  flex: 1}}>
      <Text style={{fontSize: 40, fontWeight: "700", marginTop: 20,paddingLeft:16}}>Market Data</Text>
      <Text style={{fontSize: 20,paddingLeft:16}}>Market data for crypto</Text>
      <ScrollView style={{
        padding: 0, margin: 30
      }}>
        <Text style={{textDecorationLine:"underline",color:"grey",fontSize:10,marginBottom:20}}>**Chart measured weekly</Text>
      <View style={{flex:1,backgroundColor: "#fff",borderRadius: 20,padding:30,marginBottom:30}}>
        <View style={{flexDirection: "row",alignItems:"center",justifyContent:"space-between"}}>
       <View style={{flexDirection:"row",alignItems:"center"}}>
       <Image source={{uri: `${btcImage}`}} style={{width:40,height:40,marginRight:20}} />
        <Text style={{fontSize: 20, fontWeight: "700"}}>Bitcoin</Text>
       </View>
        <View>
        <Text style={{color : "green", fontSize: 20, fontWeight: "700"}}>$ {btcprice}</Text>
        <Text>+{moreBtc}%</Text>
        </View>
        </View>
        <View>
        <LineChart
          style={{height:126,padding:10,borderRadius:20 }}
          data={data1.map((coin) => coin[1])}
          svg={{ stroke: '#3A84EC', strokeWidth: 3 }}
          contentInset={{ top: 20, bottom: 20 }}
          numberOfTicks={4}
        
      >
        <Grid />
            </LineChart>
        </View>
        <View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
        <Text style={{color:"green",fontSize:20,alignItems:"center",marginRight:10}}>Postive Percentage:</Text><Text style={{fontWeight:"700"}}>{btcpostive}%</Text>
          <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1036089849213620304/Screen_Shot_2022-10-29_at_9.31.07_PM.png"}} style={{width:23,height:23,marginLeft:20}}/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
        <Text style={{color:"red",fontSize:20,marginRight:10}}>Negative Percentage:</Text><Text style={{fontWeight:"700"}}>{btcnegative}%</Text>
          <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1036089917178138694/Screen_Shot_2022-10-29_at_9.31.22_PM.png"}} style={{width:23,height:23,marginLeft:20}}/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
          <Text style={{fontSize:20}}>Volume: </Text><Text  style={{fontWeight:"700"}}>{btcvolume}</Text>
        </View>
        <View style={{backgroundColor:"#000",marginTop:10,padding:10,borderRadius:10,alignItems:"center"}}>
        <A style={{color:"#fff",fontSize:20}} href={btclink}>Learn More</A>
        </View>
        </View>
      </View>
      <View style={{flex:1,backgroundColor: "#fff",borderRadius: 20,padding:30,marginBottom:30}}>
        <View style={{flexDirection: "row",alignItems:"center",justifyContent:"space-between"}}>
       <View style={{flexDirection:"row",alignItems:"center"}}>
       <Image source={{uri: `${ethImage}`}} style={{width:40,height:40,marginRight:20}} />
        <Text style={{fontSize: 20, fontWeight: "700"}}>Ethereum</Text>
       </View>
        <View>
        <Text style={{color : "green", fontSize: 20, fontWeight: "700"}}>$ {ethPrice}</Text>
        <Text>+{moreEth}%</Text>
        </View>
        </View>
        <View>
        <LineChart
          style={{height:126,padding:10,borderRadius:20 }}
          data={data2.map((coin) => coin[1])}
          svg={{ stroke: '#3A84EC', strokeWidth: 3 }}
          contentInset={{ top: 20, bottom: 20 }}
          numberOfTicks={4}
        
      >
        <Grid />
            </LineChart>
        </View>
        <View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
        <Text style={{color:"green",fontSize:20,alignItems:"center",marginRight:10}}>Postive Percentage:</Text><Text style={{fontWeight:"700"}}>{ethpostive}%</Text>
          <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1036089849213620304/Screen_Shot_2022-10-29_at_9.31.07_PM.png"}} style={{width:23,height:23,marginLeft:20}}/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
        <Text style={{color:"red",fontSize:20,marginRight:10}}>Negative Percentage:</Text><Text style={{fontWeight:"700"}}>{ethnegative}%</Text>
          <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1036089917178138694/Screen_Shot_2022-10-29_at_9.31.22_PM.png"}} style={{width:23,height:23,marginLeft:20}}/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
          <Text style={{fontSize:20}}>Volume: </Text><Text  style={{fontWeight:"700"}}>{ethvolume}</Text>
        </View>
        <View style={{backgroundColor:"#000",marginTop:10,padding:10,borderRadius:10,alignItems:"center"}}>
        <A style={{color:"#fff",fontSize:20}} href={ethlink}>Learn More</A>
        </View>
        </View>
      </View>
      <View style={{flex:1,backgroundColor: "#fff",borderRadius: 20,padding:30,marginBottom:30}}>
        <View style={{flexDirection: "row",alignItems:"center",justifyContent:"space-between"}}>
       <View style={{flexDirection:"row",alignItems:"center"}}>
       <Image source={{uri: `${adaImage}`}} style={{width:40,height:40,marginRight:20}} />
        <Text style={{fontSize: 20, fontWeight: "700"}}>Cardano</Text>
       </View>
        <View>
        <Text style={{color : "green", fontSize: 20, fontWeight: "700"}}>$ {cardPrice}</Text>
        <Text>+{moreADA}%</Text>
        </View>
        </View>
        <View>
        <LineChart
          style={{height:126,padding:10,borderRadius:20 }}
          data={data3.map((coin) => coin[1])}
          svg={{ stroke: '#3A84EC', strokeWidth: 3 }}
          contentInset={{ top: 20, bottom: 20 }}
          numberOfTicks={4}
        
      >
        <Grid />
            </LineChart>
        </View>
        <View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
        <Text style={{color:"green",fontSize:20,alignItems:"center",marginRight:10}}>Postive Percentage:</Text><Text style={{fontWeight:"700"}}>{adapostive}%</Text>
          <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1036089849213620304/Screen_Shot_2022-10-29_at_9.31.07_PM.png"}} style={{width:23,height:23,marginLeft:20}}/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
        <Text style={{color:"red",fontSize:20,marginRight:10}}>Negative Percentage:</Text><Text style={{fontWeight:"700"}}>{adanegative}%</Text>
          <Image source={{uri:"https://cdn.discordapp.com/attachments/783336191529320498/1036089917178138694/Screen_Shot_2022-10-29_at_9.31.22_PM.png"}} style={{width:23,height:23,marginLeft:20}}/>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",marginTop:13}}>
          <Text style={{fontSize:20}}>Volume: </Text><Text  style={{fontWeight:"700"}}>{adavolume}</Text>
        </View>
        <View style={{backgroundColor:"#000",marginTop:10,padding:10,borderRadius:10,alignItems:"center"}}>
        <A style={{color:"#fff",fontSize:20}} href={adalink}>Learn More</A>
        </View>
        </View>
      </View>
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