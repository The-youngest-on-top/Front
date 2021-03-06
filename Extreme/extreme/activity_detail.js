import React, { Component, useEffect, useState } from 'react'
import { Dimensions, Alert} from "react-native"
import {
    NativeBaseProvider,
    Box,
    HStack,
    Text,
    Image,
    View,
    flex,
    Button,
    InfoIcon,
} from 'native-base';
import { TouchableOpacity, ScrollView, TextInput, StyleSheet } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import IconM from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

var window_width = Dimensions.get('window').width;
var window_height = Dimensions.get('window').height;

import IconF from 'react-native-vector-icons/Feather';
import IconA from 'react-native-vector-icons/AntDesign';

import { flexDirection } from 'styled-system';
import Loading from './test';
import heart from './heart';


export default function Order_list_detail({ navigation }) {
    let [review, setReview] = useState();
    const [info, setInfo] = useState();


    const [activity_id, setActivityID] = useState(navigation.state.params.activity_id);


    const pressHandler = () => {
        navigation.navigate('home_region');
    }

    const get_activity_info = async () => {
        console.log("로딩"+activity_id)
        try {
            const response = await fetch(`https://extreme-kor.herokuapp.com/activity?id=${activity_id}`);
            const json = await response.json();
            if (json.success) {
                console.log("로딩 성공1")
                setInfo(json.data);
                console.log("ss"+JSON.stringify(info))
            }
            else{
                console.log("실패")
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    const heart=async(activity_id)=>{
        let me = (await AsyncStorage.getItem('user_id'));
        if(me){
        const sample={
            user_id:me,
            activity_id : activity_id
        }
        console.log(me)

        const response= await fetch('https://extreme-kor.herokuapp.com/heart', {
            method:'POST',
            headers:{
            'Content-Type':'application/json',
        },
            body:JSON.stringify(sample)
        })
        console.log(sample)
        const json=await response.json();       
        console.log(json);
        Alert.alert( "","찜이 되었습니다",[{text:"확인"}])

    }
        else{
            Alert.alert( "","로그인이 필요한 기능입니다",[{text:"확인"}])

        }

    }
    const get_review = async () => {
        console.log("로딩"+activity_id)
        try {
            const response = await fetch(`https://extreme-kor.herokuapp.com/review?activity_id=${activity_id}`);
            const json = await response.json();
            if (json.success) {
                console.log("로딩 성공")
                setReview(json.data);
                console.log(json.data);
            }
            else{
                console.log("실패")
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get_activity_info();
        get_review();
    }, []);
    {if(info!=null){
    return(
        <NativeBaseProvider>
            <Box style={{ backgroundColor: 'white', flexDirection: 'row', paddingTop: '5%', paddingBottom:'5%', paddingLeft: '5%', height: '10%', alignContent: 'center', alignItems:'center'}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <IconM name="navigate-before" size={25} style={{}}></IconM>
                </TouchableOpacity>
                <Text marginLeft={'3%'} fontSize={20}>{info.activity_name}</Text>
            </Box>
            <ScrollView> 
                <Box>
                    <Carousel
                        layout='default'
                        data={info.Activity_images}
                        sliderWidth={window_width}
                        itemWidth={window_width}
                        inactiveSlideScale={1} //슬라이드들 크기 같게
                        inactiveSlideOpacity={1} //슬라이드 투명도
                        activeSlideAlignment={'start'} //슬라이드 맨앞에서 시작
                        contentContainerCustomStyle={{ overflow: 'hidden' }} //마지막 7은 원소의 개수
                        renderItem={({ item}) => (
                            <View>
                                <View style={{width: '100%', height: window_width,}}> 
                                    <Image
                                            key={item.activity_name}
                                            style={{ width: '100%', height: '100%', borderRadius:10 }}
                                            resizeMode='contain'
                                            source={{uri:item.image_url}}
                                            alt="profile"
                                    />
                                </View>
                            </View>
                        )}
                    />      
                </Box>
                    
                <Box style={{ backgroundColor: 'white' }}>
                
                    <Box>
                        <Box style={{paddingTop:'5%', marginLeft:'3%', marginRight:'3%', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{info.activity_name}</Text>
                            <Box style={{flexDirection:'row'}}><IconA name="star" color={'#f1ec6f'} size={20} ></IconA>
                            <Text style={{marginLeft:3}}>{info.star}점</Text>
                            </Box>
                        </Box>
                    </Box>


                    <Box style={{ marginTop:'5%', marginBottom:'5%', marginLeft:'3%', marginRight:'3%',}}>
                        <Button onPress={()=>navigation.navigate('reservation_calender', {activity_id:info.activity_id})} onPress={()=>navigation.navigate('reservation_calender', {calender_data:info})} style={{ borderRadius:10, width: '100%', height: 60, borderWidth: 1, justifyContent: 'center', borderColor:'#2CE0BC',backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold',  color:'#2CE0BC' }}>날짜 및 시간 선택</Text>
                        </Button>
                    </Box>
                </Box>
                    
                <Box marginTop='3%'></Box>

                <Box style={{ paddingTop:'5%', paddingBottom:'5%', backgroundColor: 'white' }}>
                    <Box style={{ marginLeft: '3%', marginRight: '3%', }}>
                        <Box style={{flexDirection:'row', justifyContent:'space-between', marginRight:'30%'}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{info.activity_price}원</Text>
                            
                        </Box>
                        <Text style={{ marginTop:'3%', fontWeight: 'bold', fontSize: 16 }}>상품 정보</Text>
                    </Box>

                    <Box marginTop='3%' marginLeft='3%' marginRight='3%' borderWidth={0.5}></Box>

                    <Box style={{marginTop:'3%', marginLeft:'3%', marginRight:'10%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'#acacac'}}>업체명</Text>
                        <Text>{info.Company.company_name}</Text>
                    </Box>

                    <Box style={{marginLeft:'3%', marginRight:'10%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'#acacac'}}>주소</Text>
                        <Text>{info.address}</Text>
                    </Box>

                </Box>

                <Box marginTop='3%'></Box>
                                <Box style={{ paddingTop:'5%', paddingBottom:'5%', backgroundColor: 'white' }}>
                                    <Image
                        style={{ width: '100%', height: 300 }}
                                                                    resizeMode='contain'

                                            source={{uri:info.Activity_images[1].image_url}}
                                            alt="profile"
                                    />
                </Box>


                <Box onPress={console.log(review)} style={{ paddingTop:'5%',  backgroundColor: 'white' }}>
                    <Box style={{marginLeft: '5%', marginRight:'5%',}}>
                        <Text style={{ marginTop:'3%', fontWeight: 'bold', fontSize: 16 }}>고객 리뷰</Text>
                    </Box>
                
                    
                </Box> 

                {(review)&&review.map((review)=>{
                    return(
                        
                    <View  backgroundColor={'white'} >
                        <Box marginTop='5%' marginLeft='5%' marginRight='5%' borderWidth={0.5} ></Box>
                        <Box style={{marginTop:'3%', marginLeft:'5%', marginRight:'40%', flexDirection:'column', }}>
                            <Box  style={{flexDirection:'row',}}>
                                <Image
                                source={{
                                    uri:review.User.profile_image,
                                }}
                                style={{width:50, height:50, borderRadius:50}}
                                alt="trans_1" />
                                <Box style={{flexDirection:'column', marginLeft:'5%'}}>
                                        <Text style={{ fontSize: 12 }}>{review.User.nickname}</Text>
                                        <Box style={{flexDirection:'row', marginTop:"2%"}}>
                                            <Text>
                                                {
                                                    review.star == 1
                                                        ? <Box style={{flexDirection:'row'}}><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25}></IconA><IconA name="star" color={'#d0d0d0'}  size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25}></IconA></Box>
                                                        : (
                                                            review.star == 2
                                                                ? <Box style={{flexDirection:'row'}}><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25}></IconA></Box>
                                                                : (
                                                                    review.star == 3
                                                                    ? <Box style={{flexDirection:'row'}}><IconA name="star" size={25} color={'#f1ec6f'}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25} color={'#d0d0d0'} ></IconA><IconA name="star" size={25} color={'#d0d0d0'} ></IconA></Box>
                                                                        : (
                                                                            review.star == 4
                                                                                ? <Box style={{ flexDirection: 'row' }}><IconA name="star" size={25} color={'#f1ec6f'} borderWidth={1}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#d0d0d0'} size={25}></IconA></Box>
                                                                                : <Box style={{flexDirection:'row'}}><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA><IconA name="star" color={'#f1ec6f'} size={25}></IconA></Box>
                                                                                        
                                                                                
                                                                        )
                                                                )
                                                        )

                                                }
                                               
                                            </Text>
                                            <Text style={{marginLeft:'3%', fontSize:10, color:'#898989'}}>{review.created_at}</Text>
                                        </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box style={{ marginTop: '3%', marginLeft: '5%', marginRight: '3%' }}>
                            <Text>{review.content}</Text>
                        </Box>
                        </View>);
                    
                })}
                            
            </ScrollView >

            <Box style={{ paddingLeft:'3%', paddingRight:'3%', height: '12%', borderWidth: 1, backgroundColor:'white', paddingBottom:'3%', paddingTop:'3%', justifyContent: 'space-around', flexDirection:'row'}}>
                <Box style={{ borderRadius:10, width : '16%', borderWidth: 1, borderColor:'darkgray',justifyContent: 'center', backgroundColor: 'white', alignContent:'center', alignItems:'center', marginRight:10}}>
                    <TouchableOpacity onPress={() => heart(info.id)}>
                        <IconA name="heart" size={25} color='#FF6666'></IconA>
                    </TouchableOpacity>
                </Box>
                <Button style={{ borderRadius:10, width: '80%', justifyContent: 'center', backgroundColor: '#2CE0BC',  }} onPress={()=>navigation.navigate('reservation_calender', {calender_data:info})}>
                    <Text style={{ fontSize: 17, fontWeight:'bold', color:'white'}}>날짜 및 시간 선택</Text>
                </Button>
            </Box>
        </NativeBaseProvider>
    );}
    else 
    return(
     
        <Loading/>
        
        )
    }
    
  
 
}