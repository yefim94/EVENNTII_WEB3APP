import { View, Text,Image } from 'react-native'
import React from 'react'
import { LineChart, Grid ,XAxis} from 'react-native-svg-charts'
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';

export default function NotifcationCard({moreBtc,btcImage,data1,btcpostive,btcnegative,btcvolume,btcprice,btclink}) {
  return (
    <View style={{flex:1,backgroundColor: "#fff",borderRadius: 10,padding:30,marginBottom:30}}>
        <View style={{flexDirection: "row",alignItems:"center",justifyContent:"space-between"}}>
       <View style={{flexDirection:"row",alignItems:"center"}}>
       <Image source={{uri: `${btcImage}`}} style={{width:40,height:40,marginRight:20}} />
        <Text style={{fontSize: 20, fontWeight: "700"}}>Bitcoin</Text>
       </View>
        <View>
        <Text style={{color : `${moreBtc < 0 ? "red": "green"}`, fontSize: 20, fontWeight: "700"}}>$ {btcprice}</Text>
        <Text>{moreBtc}%</Text>
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
            <View style={{flexDirection:"row",justifyContent:"space-between",overflow:"hidden"}}> 
              <Text style={{fontSize:10}}>Monday</Text>
              <Text style={{fontSize:10}}>Tuesday</Text>
              <Text style={{fontSize:10}}>Wensday</Text>
              <Text style={{fontSize:10}}>Thursday</Text>
              <Text style={{fontSize:10}}>Friday</Text>
              <Text style={{fontSize:10}}>Saturady</Text>
              <Text style={{fontSize:10}}>Sunday</Text>
            </View>
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
        <View style={{backgroundColor:"#3A84EC",marginTop:10,padding:10,borderRadius:10,alignItems:"center"}}>
        <A style={{color:"#fff",fontSize:20}} href={btclink}>Home Page</A>
        </View>
        </View>
      </View>
  )
}