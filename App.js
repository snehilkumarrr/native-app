import { StatusBar } from 'expo-status-bar';
import React , {useEffect, useState}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { AppLoading } from 'expo';

const WEATHER_API_KEY='d4e1a24e7b1e0e460574e43eeded163d';
const BASE_WEATHER_URL='https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMsg,setErrorMsg]= useState(null);
  const [currentWeather, setCurrentWeather]= useState(null);

  useEffect(()=>{
    load()
  }, [])

  async function load(){
    try {
      let {status} = await Location.requestPermissionsAsync();
      if(status!='granted')
      {
        setErrorMsg('permission to accsess location denied')
      }
      const location = await Location.getCurrentPositionAsync()

      const {latitude, longitude} = location.coords

      const weatherUrl=`${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`

      const response= await fetch(weatherUrl)

      const result = await response.json()

      if(response.ok){
        setCurrentWeather(result)
      }else{
        setErrorMsg(result.message)
      }
        } catch (error) {
      
    }
  }

  if(currentWeather){
    const{
      main:{temp},
    }= currentWeather
  
  return (
    <View style={styles.container}>
      <Text>{temp}</Text>
      <StatusBar style="auto" />
    </View>
  )
}else{
  return (
    <View style={styles.container}>
      <Text>{errorMsg}</Text>
      <StatusBar style="auto" />
    </View>
  )
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
