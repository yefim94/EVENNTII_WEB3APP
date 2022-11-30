import { View, Text, ScrollView,Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
export default function Learn() {
  return (
    <View style={learnStyle.maincont}>
      <View style={learnStyle.learncont}>
      <Text style={learnStyle.even}>EVVENNTI</Text>
      <Text style={learnStyle.learn}>Learn</Text>
      </View>
      <ScrollView style={{marginTop:20}}>
        <View style={{backgroundColor:"#fff",borderRadius:20}}>
          <View style={{flexDirection:"row",alignItems:"center",paddingLeft:10,paddingTop:15}}>
            <Text style={{fontSize:20,marginRight:10}}>Lesson:</Text>
            <View style={{backgroundColor:"#3A84EC",borderRadius:100,paddingLeft:6,paddingRight:8,paddingTop:2,paddingBottom:1}}>
            <Text style={{color:"#fff",fontSize:20}}>1</Text>
            </View>
          </View>
          <Text style={{
            fontWeight:"700",
            fontSize:30,padding:10
          }}>What is WEB 3.?</Text>
          <View style={{marginTop:10}}>
            <Image source={{
            uri:"https://images.ctfassets.net/q5ulk4bp65r7/5FbQ4oiMCnZMZZ1udW3jYZ/fd738c69fc6508d3286163661713f684/Learn_Illustration_What_is_a_Crypto_Wallet.png"
            }} style={{width:"100%",height:200}}/>
            <View style={{padding:20}}>
              <Text style={{
            fontWeight:"700",
            fontSize:24,
            marginTop:15
          }}>How does it differ from web 2</Text>
              <Text>
              At its core, cryptocurrency is typically decentralized digital money designed to be used over the internet. Bitcoin, which launched in 2008, was the first cryptocurrency, and it remains by far the biggest, most influential, and best-known. In the decade since, Bitcoin and other cryptocurrencies like Ethereum have grown as digital alternatives to money issued by governments.
              </Text>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:"#fff",borderRadius:20,marginTop:40}}>
          <View style={{flexDirection:"row",alignItems:"center",paddingLeft:10,paddingTop:15}}>
            <Text style={{fontSize:20,marginRight:10}}>Lesson:</Text>
            <View style={{backgroundColor:"#3A84EC",borderRadius:100,paddingLeft:6,paddingRight:8,paddingTop:2,paddingBottom:1}}>
            <Text style={{color:"#fff",fontSize:20}}>2</Text>
            </View>
          </View>
          <Text style={{
            fontWeight:"700",
            fontSize:30,padding:10
          }}>What are market movers?</Text>
          <View style={{marginTop:10}}>
            <Image source={{
            uri:"https://images.ctfassets.net/q5ulk4bp65r7/image-99bb20ed-b923-543d-b198-731e1a7f70e1/457f213ff51f6ed1b6f0a1fccce97310/news_article_image_bitcoin_ether_tick_higher_as_silvergate_stock_dips_gbtc_discount_widens_image"
            }} style={{width:"100%",height:200}}/>
            <View style={{padding:20}}>
              <Text style={{
            fontWeight:"700",
            fontSize:24,
            marginTop:15
          }}>crypto whales</Text>
              <Text>
              Cryptocurrency whales, or crypto whales, are individuals or entities that own large quantities of a specific cryptocurrency. Generally speaking, a crypto whale is an entity that holds enough digital currency to significantly influence market prices by trading significant amounts of coins and tokens.
              </Text>
            </View>
          </View>
        </View>
        <View style={{backgroundColor:"#fff",borderRadius:20,marginTop:40}}>
          <View style={{flexDirection:"row",alignItems:"center",paddingLeft:10,paddingTop:15}}>
            <Text style={{fontSize:20,marginRight:10}}>Lesson:</Text>
            <View style={{backgroundColor:"#3A84EC",borderRadius:100,paddingLeft:6,paddingRight:8,paddingTop:2,paddingBottom:1}}>
            <Text style={{color:"#fff",fontSize:20}}>3</Text>
            </View>
          </View>
          <Text style={{
            fontWeight:"700",
            fontSize:30,padding:10
          }}>RED FLAGS</Text>
          <View style={{marginTop:10}}>
            <Image source={{
            uri:"https://images.ctfassets.net/q5ulk4bp65r7/image-51593e8f-a39a-5019-ae8b-7c17fb5fde15/d31c3471aea5ba17686a35d60b3a168d/news_article_image_makerdao_is_voting_on_increasing_yield_for_the_dai_stablecoin_image"
            }} style={{width:"100%",height:200}}/>
            <View style={{padding:20}}>
              <Text style={{
            fontWeight:"700",
            fontSize:24,
            marginTop:15
          }}>FTX COLLAPSE</Text>
              <Text>
              A run on deposits left the company owing customers $8 billion, setting off a chain of events that has shaken the crypto world and driven investigations by the Securities and Exchange Commission and the Justice Department.

This time last month, the $32 billion cryptocurrency company managed billions of dollars’ worth of customer assets; now, FTX could owe money to more than a million people and organizations.

              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const learnStyle = StyleSheet.create({
  maincont: {
    padding:15,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:"#F5E4AF",
    flex:1
  },
  learncont: {
    flexDirection:"row",
    width:"100%",
  },
  even: {
    color:"#000",
    fontSize:34,
    marginRight:8,
    fontWeight:"700"
  },
  learn:{
    color:"#fff",
    fontSize:34,
    fontWeight:"700",
    textDecorationColor:"#fff",
    textDecorationLine:"underline"
  }
})