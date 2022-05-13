import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, StyleSheet, View,Image } from 'react-native';
import Button from "../components/Button";
const Home = ({navigation})=> {
    return (
       <ImageBackground
       blurRadius={10}
       style={styles.background}
        source={require('../assets/background.jpg')}
        >   
            <View style={styles.logoContainer}>
            <Image style={styles.logo} source={  require('../assets/logo.gif')} />
            </View>

            <View style={styles.buttonsContainer}>
            <Button
            title={"Recognize"}
            style={styles.RecognizeButton}
            onPress={()=>{
                navigation.navigate('Recognition', {name: 'Recognize'})
            }}
            />
            <Button
            title="Generate"
            color="secondary"
             style={styles.GenerateButton}
             onPress={()=>{
                navigation.navigate('MusicPlayer', {name: 'MusicPlayer'})
            }}
             />

            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex:1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    logo: {
        top: 70,
        position: 'absolute'

    },
    logoContainer:{
        position:'absolute',
        top:70,
        alignItems:'center'
    },
    buttonsContainer:{
        padding: 20,
        width: "100%",

    },

})

export default Home;