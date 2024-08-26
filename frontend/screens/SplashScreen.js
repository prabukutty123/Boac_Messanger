import { ImageBackground, Text,StyleSheet,Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SplashScreen = () => {
    const navigation=useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
            checkLogin()
        },2000)
       
    },[])
    const checkLogin=async()=>{
const id =await AsyncStorage.getItem("USERID")
if(id!==null){
    navigation.navigate('Main')
}else{
    navigation.navigate('SendOtp')
}
    }
  return (
    <ImageBackground
      source={require('../assets/login_bgm.png')} // Replace with your image URL
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ffff',
      }}
    >
       <Text style={styles.headerText}>BOAC</Text>
       <Image
        height={"159px"} width={"200px"} style={styles.image} source={require('../assets/splash.png')}
      />
      <Text style={styles.splashText}>Let's Go</Text>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    splashText: {
      position: 'absolute',
      fontSize: 30,
      fontFamily: 'Roboto',
      paddingBottom: 10,
      color: '#FFFFFF',
      paddingTop:30,
    },
    headerText: {
      position: 'absolute',
      top: 30,  // Distance from the top
      left: 20, // Distance from the left
      fontSize: 30,
      fontWeight: '700',
      color: "#1B408C",
      fontFamily:'Roboto'
    },
    image: {
      position: 'absolute',
      top: 30,   // Distance from the top
      right: 18, // Distance from the right
      width: 100,
      height: 80,
    
    },
   
  });
export default SplashScreen