import React, { Component, useState } from 'react'
import { Dimensions, FlatList, Alert} from "react-native"
import{
    NativeBaseProvider,
    Box,
    HStack,
    Text,
    Image,
    flex,
    Button
}from 'native-base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity, ScrollView, TextInput, } from "react-native";

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일', '월','화','수','목','금','토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';



import IconA from 'react-native-vector-icons/AntDesign';

export default function reservation_calender({ navigation }) {
  
  const [outputText, setoutputText] = useState('');
  const [outputactivity, setoutputactivity] = useState('');
  const [time,setTime]=useState([
    {when:"09:00",handler:Handler,status:'white'},
    {when:"10:00",handler:Handler,status:'white'},
    {when:"11:00",handler:Handler,status:'white'},
    {when:"12:00",handler:Handler,status:'white'},
    {when:"13:00",handler:Handler,status:'powderblue'},
    
]);
const [time2,setTime2]=useState([
    {when:"14:00",handler:Handler,status:'white'},
    {when:"15:00",handler:Handler,status:'white'},
    {when:"16:00",handler:Handler,status:'white'},
    {when:"17:00",handler:Handler,status:'white'},
    {when:"18:00",handler:Handler,status:'white'},
]);

  const Handler=()=>{

  }
  return (
  <NativeBaseProvider>
      <Box style={{ paddingTop: 50 }}>

      {/* const setoutputText = () */}

      <Calendar
        current={Date()}
        minDate={'2021-01-01'}
        maxDate={'2022-12-31'}
        onDayPress={(day) => { setoutputText(day.dateString), setoutputactivity(day.day) }}
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
      <Box marginTop={'5%'} marginBottom={'5%'}>
        <Text>선택된 날짜 : {outputText}</Text>
        <Box style={{alignItems:'center'}}>
         <Text style={{fontWeight:'bold'}}>이용 가능 시간</Text>
        </Box>
          <Box style={{ flexDirection: 'row'}}>
          {time.map((time)=>{
            return( <Button style={{backgroundColor:time.status,margin:10, borderWidth:1}} onPress={time.handler}><Text>{time.when}</Text></Button>)
           
          })}
          </Box>
          
          <Box style={{ flexDirection: 'row'}}>
          {time2.map((time2)=>{
            return( <Button style={{backgroundColor:time.status,margin:10, borderWidth:1}} onPress={time2.handler}><Text>{time2.when}</Text></Button>)
           
          })}
          
          </Box>
        
      </Box>
  </NativeBaseProvider> 
  );
}