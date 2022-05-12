import React from 'react';
import { ImageBackground, StyleSheet, View,Image } from 'react-native';
import Button from "../components/Button";
function Home(props) {
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
            />
            <Button
            title="Generate"
            color="secondary"
             style={styles.GenerateButton}/>

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