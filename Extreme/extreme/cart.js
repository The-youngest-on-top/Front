import React, {useState, Component, useEffect } from "react";
import { Dimensions, FlatList, Alert} from "react-native"

import {
    Checkbox,
    Box,
    HStack,
    Text,
    VStack,
    Image,
    NativeBaseProvider,
  Button,
    View
} from 'native-base';
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Loading from "./test";
import Under from "./under";

const IMAGES = {
  image1: require('./images/cloud.png'),
  image2: require('./images/snow.png'),
  image3: require('./images/그림7.png'),
  image4: require('./images/그림8.png'),
  image5: require('./images/partlyClear.png'),
  image6: require('./images/snowAndRaindy.png'),
};
export default function cart({ navigation }) {



  let [cart,setCart]=useState()
  let [checkindex,setCheckIndex]=useState()

  var send_index=[]
  let today="눈";
  let zz=async()=>{
    let me=(await AsyncStorage.getItem('user_id'));
    const response = await fetch(`https://extreme-kor.herokuapp.com/cart?id=${me}`);
    const json = await response.json();
    setCart(json.data);
    console.log(json.data)
    for (i=0;i<json.data.length;i++){
      send_index.push(i)
    }
    console.log(send_index)
    setCheckIndex(send_index)
}     
useEffect(() => {
  zz();
}, []);



  const checkbox_data=(index)=>{
    console.log("체크")
    console.log(send_index)
    if(checkindex.includes(index)){
      setCheckIndex(checkindex.filter((element)=>element!==index))
    }
    else{
      setCheckIndex(element=> [...element, index])
    }
  }
  const go_purchase=()=>{
    let value=checkindex.sort()
    setCheckIndex(value)
    console.log(checkindex)

    let send_purchase=[]
    for (i=0;i<checkindex.length;i++){
      send_purchase.push(cart[checkindex[i]])
      console.log("ddld"+send_purchase)
    }
    if (send_purchase.length==0){
      Alert.alert( "","구매하실 상품을 선택해주세요",[{text:"확인"}])
    }
    else{
      console.log(send_purchase)
      navigation.navigate('purchase', {purchase_Data:send_purchase})
    }
  }
  const go_purchase2=(index)=>{
    console.log(cart[index])
    navigation.navigate('purchase', {purchase_Data:[cart[index]]})
  }

  const delete_item = async(reservation_id)=>{
    const sample={
        id : reservation_id
    }

    const response= await fetch('https://extreme-kor.herokuapp.com/cart/del', {
        method:'POST',
        headers:{
        'Content-Type':'application/json',
    },
        body:JSON.stringify(sample)
    })
    console.log(sample)
    const json=await response.json();       
    console.log(json);
    zz();

}
const delete_cart=(reservation_id)=>{
    Alert.alert( "","정말 삭제하시겠습니까?",[{text:"네", onPress:()=>delete_item(reservation_id)},{text:"아니요"}])

  }


  const renderActivity = ({ item, index }) => (
    <Box style={{ backgroundColor:'white', marginTop: '3%', borderWidth:1}}>
    <Box style={{flexDirection:'row-reverse',}}>
    <TouchableOpacity onPress={()=>delete_cart(item.id)}>
      <IconA margin={'7%'} name="close" size={25}></IconA>
      </TouchableOpacity>
    </Box>
    <Box style={{flexDirection:'row', }}>
      <Box style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
        <Checkbox borderWidth={2} fontSize={5} style={{   marginRight:"5%", borderRadius:10 ,}}onCheckColor='#2CE0BC' defaultIsChecked={true} onPress={()=>checkbox_data(index)}></Checkbox>
        <Image
          source={{
              uri: item.Activity.Activity_images[0].image_url
          }}
          style={{borderRadius:10, marginLeft:'5%', width:70, height:70}}
          alt="trans_1" />
      </Box>
      
      <Box style={{height:70, flexDirection:'column', marginLeft:'4%', justifyContent:'space-between'}}>
        <Text style={{fontSize:14, fontWeight:'bold',}}>{item.Activity.activity_name}</Text>
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

    <Box marginTop='5%' borderWidth={0.5}></Box>

    <Box>
      <HStack marginLeft={'5%'} marginTop={'5%'}>
        <Box marginLeft={'5%'} flexDirection={'row'}>
            <Text style={{fontWeight:'bold'}} >총 결제 금액</Text>
            <Text style={{fontWeight:'bold', marginLeft:'3%'}} >{item.payment}원</Text>
        </Box>
      </HStack>
    </Box>

    <Box style={{marginTop:'5%',marginBottom:'5%', justifyContent: 'space-around', flexDirection:'row'}}>
      <Button style={{ width: 100, height: 40, borderWidth: 1, justifyContent: 'center', backgroundColor: 'white' }} >
        <Text style={{ fontSize: 14, }}>날짜변경</Text>
      </Button>
      <Button style={{ fontSize: 14, width: 100, height: 40, borderWidth: 1, justifyContent: 'center', backgroundColor: 'white' }}  onPress={()=>go_purchase2(index)}>
          <Text style={{ fontSize: 14, }}>바로구매</Text>
      </Button>
    </Box>

  </Box>
    )

  return (
    <NativeBaseProvider>
      
        <Box style={{ backgroundColor: 'white', flexDirection: 'row', paddingTop: '5%', paddingBottom:'5%', paddingLeft: '5%', height: '10%', alignContent: 'center', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <IconM name="navigate-before" size={25} style={{}}></IconM>
          </TouchableOpacity>
            <Image
                source={require('./images/cart-outline.png')}
                style={{width: 40, height: 40, }}
                alt="trans_1"
            />
          <Text marginLeft={'3%'} fontSize={20}>장바구니</Text>
        </Box>
      <ScrollView>
        <FlatList
          data={cart}
          renderItem={renderActivity}
          keyExtractor={(Activity) => Activity.activity_name}
          extraData={cart}
          alt={"Dd"}
          numColumns={1} />
    </ScrollView>
        <Box style={{backgroundColor:'white', paddingTop:'3%', paddingBottom:'3%', paddingLeft:'5%', paddingRight:'5%', height: '11%',}}>
          <Button style={{borderRadius:10,   height: '100%',alignItems:'center' , justifyContent: 'center', backgroundColor: '#2CE0BC', }} onPress={go_purchase}>
            <Text style={{fontSize:20, color:'white'}}>구매하기</Text>
          </Button>
        </Box>
          </NativeBaseProvider>
  )}





