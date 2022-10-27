import React, {useEffect, useState} from 'react'
import { ScrollView, Text,  View, StyleSheet } from 'react-native'
import {
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'


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

  async function getBtcPrice (){   
      const data = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(e => e.json())
      const marketData = await data.market_data.current_price.usd
      setBtcPrice(marketData)

      const hisdata = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=4&interval=daily`).then(e => e.json())
      setData1(hisdata.prices)
  }
  async function getEthPrice (ethereum){   
    const data = await fetch("https://api.coingecko.com/api/v3/coins/ethereum").then(e => e.json())
    const marketData = await data.market_data.current_price.usd
    setEthPrice(marketData)

    const hisdata = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=5&interval=daily`).then(e => e.json())
    setData2(hisdata.prices)
}
async function cardPrice1 (cardano){   
  const data = await fetch("https://api.coingecko.com/api/v3/coins/cardano").then(e => e.json())
  const marketData = await data.market_data.current_price.usd
  setCardPrice(marketData)

  const hisdata = await fetch(`https://api.coingecko.com/api/v3/coins/cardano/market_chart?vs_currency=usd&days=5&interval=daily`).then(e => e.json()) 
  setData3(hisdata.prices)
}
  useEffect(() => {
    getBtcPrice()
    getEthPrice()
    cardPrice1()
    setLoader(false)
  }, [])
  
  const data_1 = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        data: data1.map((coin) => coin[1]),
        color: (opacity = 1) => "#3F8DFD", // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["CryptoPrice for 2022"] // optional
  };
  const data_2 = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        data: data2.map((coin) => coin[1]),
        color: (opacity = 1) => "#3F8DFD", // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["CryptoPrice for 2022"] // optional
  };
  const data_3 = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        data: data3.map((coin) => coin[1]),
        color: (opacity = 1) => "#3F8DFD", // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["CryptoPrice for 2022"] // optional
  };
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientTo: "#fff",
    backgroundGradientFrom: "#fff",
    color: (opacity = 1) => `rgba(0,0,0,0.4)`,
  };
  return (
    <View style={{position: "relative", padding: 20}}>
      <Text style={{fontSize: 40, fontWeight: "700", marginTop: 20}}>Market Data</Text>
      <View style={{position:"absolute", top: 20, zIndex: 100, backgroundColor: "#fff", padding: 20, width: "100%", flexDirection: "column"}}>
        <View style={{flexDirection: "row"}}>
        <Text style={{fontSize: 20, fontWeight: "700"}}>BTC PRICE:  </Text><Text style={{color : "#FF0202", fontSize: 20, fontWeight: "700"}}>$ {btcprice}</Text>
        </View>
        <View style={{flexDirection: "row"}}>
        <Text style={{fontSize: 20, fontWeight: "700"}}>ETH PRICE:  </Text><Text style={{color : "#FF0202", fontSize: 20, fontWeight: "700"}}>$ {ethPrice}</Text>
        </View>
        <View style={{flexDirection: "row"}}>
        <Text style={{fontSize: 20, fontWeight: "700"}}>CAD PRICE:  </Text><Text style={{color : "#FF0202", fontSize: 20, fontWeight: "700"}}>$ {cardPrice}</Text>
        </View>
      </View>
      <ScrollView style={{
        padding: 20, margin: 30
      }}>
            <Text style={styles.textno}>Bitcoin</Text>

      <LineChart
          style={{ height: 200,width: 200 }}
          data={data1.map((coin) => coin[1])}
          svg={{ stroke: '#3A84EC', strokeWidth: 3 }}
          contentInset={{ top: 20, bottom: 20 }}
          numberOfTicks={5}
        
      >
        <Grid />
            </LineChart>
      
      <Text style={styles.textno}>Cardano</Text>
    <LineChart
       style={{ height: 200,width: 200 }}
       data={data2.map((coin) => coin[1])}
       svg={{ stroke: '#3A84EC', strokeWidth: 3 }}
       contentInset={{ top: 20, bottom: 20 }}
       numberOfTicks={5}>
         <Grid />

       </LineChart>
       <Text style={styles.textno}>Ethereum</Text>
    <LineChart
       style={{ height: 200,width: 200 }}
       data={data3.map((coin) => coin[1])}
       svg={{ stroke: '#3A84EC', strokeWidth: 3 }}
       contentInset={{ top: 20, bottom: 20 }}
       numberOfTicks={5}>
           <Grid />
        </LineChart> 
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