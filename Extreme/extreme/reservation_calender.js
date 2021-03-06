import React, { Component, useEffect, useState } from 'react'
import { Dimensions, FlatList, Alert, DatePickerAndroid, Settings } from "react-native"
import {
  NativeBaseProvider,
  Box,
  HStack,
  Text,
  Image,
  flex,
  Button
} from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity, ScrollView, TextInput, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';



import IconA from 'react-native-vector-icons/AntDesign';
import Loading from './test';

import IconM from 'react-native-vector-icons/MaterialIcons';
import purchase from './purchase';
export default function reservation_calender({ navigation }) {
  const [calenderdata, setCalenderData] = useState(navigation.state.params.calender_data);
  const [data, setData] = useState();
  const [outputText, setoutputText] = useState('');
  const [outputactivity, setoutputactivity] = useState('');
  const [filterdate, setFilterdate] = useState();
  const [selecttime, setSelectTime] = useState();
  const [selecthour, setSelectHour] = useState();
  const [time_id,setTime_id]=useState();
  const [activity_id,setActivity_id]=useState(125);
  const [people,setPeople]=useState(1);
  const [user_id,setUser_id]=useState();
  let calender = new Map();
  let timeoption = []
  const getData = async () => {
    const response = await fetch(`https://extreme-kor.herokuapp.com/activity/times?id=${calenderdata.id}`);
    const json = await response.json();
    setData(json.data);
    console.log(json.data)
    dateee = json.data
    let me=(await AsyncStorage.getItem('user_id'));
    setUser_id(me)
  }
  useEffect(() => {
    getData();
  }, [])



  const dayss = (day) => {
    let a
    setSelectTime()
    setoutputText(day.dateString)
    if (day.day < 10) {
      setoutputactivity(`${day.year}${day.month}0${day.day}`)
      a = data.filter((data) => data.date == `${day.year}${day.month}0${day.day}`)
    }
    else {
      setoutputactivity(`${day.year}${day.month}${day.day}`)
      a = data.filter((data) => data.date == `${day.year}${day.month}${day.day}`)
    }
    a.sort((a, b) => (a.hour > b.hour ? 1 : -1))
    console.log(a)
    console.log(data)
    setFilterdate(a)
  }
  const selecttimefunctino=(item, index)=>{
    setSelectTime(index)
    setSelectHour(item.hour)
    setTime_id(item.id)
  }
  

  const renderActivity = ({ item, index }) => (
    <Box style={{ flexDirection: 'row' }}>
      {item.reservation == true &&
      <Button style={{ backgroundColor: 'darkgray', margin: 10 ,borderWidth:1,borderColor:'darkgray'}} onPress={()=> Alert.alert( "","이미 예약된 시간입니다.",[{text:"확인"}])}><Text>{item.hour}</Text></Button>
      }
      {(item.reservation != true&&selecttime!=index) &&
      <Button style={{ backgroundColor: 'white', margin: 10  ,borderWidth:1,borderColor:'darkgray'}} onPress={()=>selecttimefunctino(item, index)}><Text>{item.hour}</Text></Button>
      }
      {selecttime==index &&
      <Button style={{ backgroundColor: 'powderblue', margin: 10 ,borderWidth:1,borderColor:'darkgray' }}><Text>{item.hour}</Text></Button>
      }

    </Box>
  )

  const purchasing=()=>{
    if(selecthour)
    console.log(data)
    let payment=calenderdata.activity_price*people
    let aa={purchase_Data:[{Activity:
      {Activity_images:[{image_url:calenderdata.Activity_images[0].image_url}], 
      Company:{company_name:calenderdata.Company.company_name}, 
      activity_name:calenderdata.activity_name, activity_price:calenderdata.activity_price, id:calenderdata.id}, 
      Activity_time:{date:outputactivity, hour:selecthour,id:time_id}, payment:payment, people:people}]}
      navigation.navigate('purchase',{purchase_Data:aa.purchase_Data  })
    // navigation.navigate('purchase', {purchase_Data:{Activity:{Activity_images:[], Company:{company_name:calenderdata.company.company_name}}}})
    // else Alert.alert( "","시간을 선택해주세요.",[{text:"확인"}])
  }
  
  if (data) {
    return (
      <NativeBaseProvider>  
        <Box style={{ backgroundColor: 'white', flexDirection: 'row', paddingTop: '5%', paddingBottom:'5%', paddingLeft: '5%', height: '10%', alignContent: 'center', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <IconM name="navigate-before" size={25} style={{}}></IconM>
        </TouchableOpacity>
          <Box style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>
            <Text marginLeft={'3%'} fontSize={20}>{calenderdata.activity_name} 예약하기</Text>
          </Box>        
        </Box>
        <Box style={{backgroundColor:'white',marginTop:10}}>

          {/* const setoutputText = () */}

          <Calendar
            current={Date()}
            minDate={'2021-01-01'}
            maxDate={'2022-12-31'}
            onDayPress={(day) => { dayss(day) }}
            onDayLongPress={(day) => { setoutputText(day.dateString) }}
            monthFormat={'yyyy MM dd'}
            onMonthChange={(month) => { console.log('month changed', month) }}
            hideArrows={true}
            renderArrow={(direction) => direction === "left" ? (
              <IconA name="left" size={20} color="#50cebb"></IconA>
            ) : (
              <IconA name="right" size={20} color="#50cebb"></IconA>
            )
            }
            hideExtraDays={false}
            disableMonthChange={true}
            firstDay={7}
            hideDayNames={false}
            showWeekNumbers={false}
            onPressArrowLeft={substractMonth => substractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableArrowLeft={false}
            disableArrowRight={false}
            disableAllTouchEventsForDisabledDays={true}
          />
        </Box>
        <ScrollView backgroundColor={'white'}>
        <Box backgroundColor={'white'}marginTop={'3%'} marginBottom={'5%'} borderWidth={0.5} borderColor={'#acacac'}>
          <Box style={{padding:5,paddingTop:9,paddingBottom:9,  borderColor:'darkgray',borderBottomWidth:1,flexDirection:'row'}}>
            <Text style={{ fontSize: 16, }}>선택된 날짜</Text>
              {outputactivity && <Text style={{ borderWidth: 1, borderRadius: 5, borderColor: 'white', backgroundColor: 'white', marginLeft: 4, fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{outputactivity.slice(0, 4)}.{outputactivity.slice(4, 6)}.{outputactivity.slice(6, 8)}</Text>}
          </Box>
          <Box style={{padding:5 ,  borderColor:'darkgray',borderBottomWidth:1}}>
            <Text style={{ fontSize: 16, }}>이용가능한 시간</Text>
            <FlatList
              data={filterdate}
              renderItem={renderActivity}
              // keyExtractor={(Activity) => Activity.activity_name}
              extraData={data}
              alt={"Dd"}
              numColumns={5} />
           </Box>
           <Box style={{paddingLeft:5,paddingTop:5 , flexDirection:'row'}}>
            <Text style={{ fontSize: 16, }}>인원수</Text>
          </Box>
          <Box style={{ flexDirection: 'row' }}>
            
          <Box style={{marginLeft:5,flexDirection:'row', justifyContent:'center',paddingBottom:10}}>
           <Button style={{marginTop:10,height:43,width:43,backgroundColor:'white',borderWidth:1,borderColor:'darkgray',borderRadius:20}}onPress={()=>setPeople((people)=>people+1)}><Text>+</Text></Button>
           <Text style={{padding:15}}>{people}</Text>
           <Button style={{marginTop:10,height:43,width:43,backgroundColor:'white',borderWidth:1,borderColor:'darkgray',borderRadius:20}}onPress={()=>people>1?setPeople((people)=>people-1):null}><Text>-</Text></Button>
           </Box>
            
          </Box>

         
        </Box>
        </ScrollView>
        <Box style={{ width:Width,flexDirection:'row', backgroundColor:'white', padding:'3%'}}>
            <Button style={{height:Height/12,width:(Width/2)-10,backgroundColor:'#2CE0BC',borderColor:'white',borderRightWidth:1, borderRadius:10}}>
                <Text style={{color:'white', fontWeight:'bold'}}>장바구니</Text>
            </Button>
            <Button onPress={purchasing} style={{width:(Width/2)-10,backgroundColor:'#2CE0BC', borderRadius:10}}>
                <Text style={{color:'white', fontWeight:'bold'}}>바로구매</Text>
            </Button>
          </Box>
      </NativeBaseProvider>
    );
  }
  else {
    return (<Loading />)
  }
}