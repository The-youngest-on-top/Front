import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Alert} from "react-native"
import {
    NativeBaseProvider,
    Box,
    HStack,
    Text,
    VStack,
    Image,
    Button
} from 'native-base';
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
let today="눈";
export default function purchase({ navigation }) {
    const [purchaseData, setPurchaseData] = useState(navigation.state.params.purchase_Data);
    var payment=0;
    const coupon = () => {
        navigation.navigate('coupon');
    }
    for(let i=0;i<purchaseData.length;i++){
        payment = payment + purchaseData[i].payment
        console.log(payment)

    }
    useEffect(() => {

    }, []);
    const renderActivity = ({ item, index }) => (
        <Box style={{ backgroundColor:'white', marginTop: '3%', paddingTop:'5%', paddingBottom:'5%', paddingLeft:'5%', paddingRight:'5%', borderWidth:1}}>
        <Box style={{flexDirection:'row', marginTop:'3%'}}>
        <Box style={{flexDirection:'row',}}>
            <Box style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
              <Image
                source={{
                    uri: item.Activity.Activity_images[0].image_url
                }}
                style={{borderRadius:10, marginLeft:'3%', width:70, height:70}}
                alt="trans_1" />
            </Box>
        </Box>
        
        <Box style={{height:70, flexDirection:'column', marginLeft:'5%', justifyContent:'space-between'}}>
          <Text style={{fontSize:14}}>{item.Activity.activity_name}</Text>
          <Text style={{fontSize:14}}>{item.Activity.activity_price}원</Text>
          <Text style={{fontSize:14}}>{item.people}인</Text>
        </Box>
  
        <Box style={{height:70, flexDirection:'column', marginLeft:'20%', justifyContent:'space-between'}}>
          <Text style={{fontSize:14}}>{item.Activity_time.date.slice(0,4)}.{item.Activity_time.date.slice(4,6)}.{item.Activity_time.date.slice(6,8)}</Text>
          <Text style={{fontSize:14}}>{item.Activity_time.hour}</Text>
  
          {today=="맑음"&&<Image
        source={ require('./images/그림8.png')}
        style={{borderRadius:10, marginLeft:'3%', width:40, height:40}}
        alt="trans_1" />}

        {today=="구름많음"&&<Image
        source={ require('./images/cloud.png')}
        style={{borderRadius:10, marginLeft:'3%', width:40, height:40}}
        alt="trans_1" />}

        {today=="눈"&&<Image
        source={ require('./images/snow.png')}
        style={{borderRadius:10, marginLeft:'3%', width:40, height:40}}
        alt="trans_1" />}

        {today=="비"&&<Image
        source={ require('./images/그림7.png')}
        style={{borderRadius:10, marginLeft:'3%', width:40, height:40}}
        alt="trans_1" />}
      
        {today=="흐림"&&<Image
        source={ require('./images/cloud.png')}
        style={{borderRadius:10, marginLeft:'3%', width:40, height:40}}
        alt="trans_1" />}

        {today=="눈/비"&&<Image
        source={ require('./images/snow.png')}
        style={{borderRadius:10, marginLeft:'3%', width:40, height:40}}
        alt="trans_1" />}
        </Box>
        </Box>
            <Box>
            <HStack marginLeft={'5%'} marginTop={'5%'}>
              <Box marginLeft={'5%'} flexDirection={'row'}>
                  <Text style={{fontWeight:'bold'}} >총 결제 금액</Text>
                  <Text style={{fontWeight:'bold', marginLeft:'3%'}} >{item.payment}원</Text>
              </Box>
            </HStack>
          </Box>
          </Box>

          )
        const zz=()=>{
            console.log(purchaseData[0])
        }
        const buy=async()=>{
            let me=(await AsyncStorage.getItem('user_id'));
            let sample={
                'activity_id': purchaseData[0].Activity.id,
                'activity_time_id':purchaseData[0].Activity_time.id,
                'user_id': me,
                'payment': purchaseData[0].payment,
                'people': purchaseData[0].people 
            }
            let response1= await fetch('https://extreme-kor.herokuapp.com/reservation', {
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type':"application/json",
            },
                body:JSON.stringify(sample)
            }) 
            const json=await response1.json();
            console.log(JSON.stringify(json));
        }
    return (
        <NativeBaseProvider>
            <Box style={{backgroundColor:'white', flexDirection: 'row', paddingTop: '5%', paddingLeft:'5%'}} >
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <IconM name="navigate-before" size={25} style={{}}></IconM>
                </TouchableOpacity>
                <Text marginLeft={'3%'} fontSize={20}>구매하기</Text>
            </Box>

            <Box style={{backgroundColor:'white', padding:'5%'}}>
            <FlatList
                data={purchaseData}
                renderItem={renderActivity}
                keyExtractor={(Activity) => Activity.activity_name}
                extraData={purchaseData}
                alt={"Dd"}
                numColumns={1} />
            </Box>
            <ScrollView>
                <Box style={{backgroundColor:'white',}}>
                    <Box marginTop='5%' borderWidth={3} borderColor={'#eeeeee'}></Box>
                    <Box style={{ flexDirection: 'row', marginTop: '5%', borderWidth:0.5, justifyContent:'space-between' }}>
                        <Text fontSize={20}>총 결제 금액</Text>
                        <Text fontSize={18} style={{ fontWeight: 'bold' }} >{payment}원</Text>
                    </Box>

                    <Box marginTop='5%' borderWidth={3} borderColor={'#eeeeee'}></Box>

                    <Box style={{ flexDirection: 'column', }}>
                        <Text fontSize={20} stwyle={{textAlign:'center'}}>결제 방식</Text>

                        <Box style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:'3%'}}>
                            <Box>
                                <Button style={{backgroundColor:'#a9a9a9', borderRadius:20 }}>
                                    <Text style={{fontSize:20, color:'white'}}>현장 결제</Text>
                                </Button>
                            </Box>
                            <Box>
                            <Button style={{backgroundColor:'#a9a9a9', borderRadius:20 }}>
                                <Text style={{fontSize:20, color:'white'}}>무통장 입금</Text>
                            </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ScrollView>

            <Box style={{backgroundColor:'white', paddingTop:'3%', paddingBottom:'3%', paddingLeft:'5%', paddingRight:'5%',}}>
                <Button onPress={buy}style={{backgroundColor:'#4f8bc2', }}>
                    <Text style={{fontSize:20, color:'white'}}>구매 완료</Text>
                </Button>
            </Box>
        </NativeBaseProvider>
    )
}