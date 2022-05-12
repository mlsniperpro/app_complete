import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Image, FlatList, Animated } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Iconicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import songs from '../model/data';
/*
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents
}from 'react-native-track-player';
*/
const {width, height} = Dimensions.get('window');
const MusicPlayer = ()=> {
    const scrollx = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);

    const songSlider = useRef(null);
    useEffect(()=>{
        scrollx.addListener(({value})=>{
            //console.log('scroll X', scrollx);
            //console.log('Device Width', width);
            const index = Math.round(value/width);
            setSongIndex(index);
            //console.log('Indx: ', index);
        });
        return () => {
            scrollx.removeAllListeners();
        }
    }, []);
    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        })
    }
    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        })
    }
    const renderSongs = ({index, item})=>{
        return(
       <Animated.View
       style={{
           width: width,
           justifyContent: 'center',
           alignItems: 'center',
       }}
       >
        <View style={styles.artworkWrapper}>
        <Image
        source={item.image}
        style={styles.artWorkImage}
        />
        </View>
       </Animated.View>
        );
    }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.mainContainer}> 
        <View style={{
            width: width
        }}>
        <Animated.FlatList
        ref={songSlider}
        data = {songs}
        renderItem={renderSongs}
        keyExtractor = {(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator = {false}
        scrollEventThrottle = {16}
        onScroll={Animated.event(
            [{nativeEvent: {
            contentOffset: {x:scrollx}
            }}],
            {useNativeDriver: true}
        )}
        />
        </View>
       
        <View>
            <Text style={styles.title}>{songs[songIndex].title}</Text>
            <Text style={styles.title}>{songs[songIndex].artist}</Text>
        </View>
        <View>
            <Slider
            style={styles.progressContainer}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor='#FFD369'
            maximumTrackTintColor='FFF'
            onSlidingComplete={()=>{}}
            />
            <View style={styles.progressLabelContainer}>
                <Text style={styles.progressLabelTxt}>0:00</Text>
                <Text style={styles.progressLabelTxt}>3.55</Text>
            </View>
            <View style={styles.MusicControlls}>
            <TouchableOpacity onPress={skipToNext}>
                <Iconicons name='play-skip-back-outline' size={35} color='#FFD369' style={{marginTop:25}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}}>
                <Iconicons name='ios-pause-circle' size={75} color='#FFD369'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToPrevious}>
                <Iconicons name='play-skip-forward-outline' size={35} color='#FFD369' style={{marginTop:25}}/>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    <View style={styles.bottomContainer}> 
    <View style={styles.bottomControls}>
        <TouchableOpacity onPress={()=>{}}>
        <Iconicons name='heart-outline' size={30} color='#777777'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}}>
        <Iconicons name='repeat' size={30} color='#777777'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}}>
        <Iconicons name='share-outline' size={30} color='#777777'/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}}>
        <Iconicons name='ellipsis-horizontal' size={30} color='#777777'/>
        </TouchableOpacity>
    </View>
    </View>
    </SafeAreaView>
  )
}
export default MusicPlayer;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#222831',
    },
    mainContainer: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    artworkWrapper: {
        width: 300,
        height: 340,
        marginBottom: 25,

        shadowColor: '#ccc',
        shadowOffset:{ 
        width: 5,
        height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5

    },
    artWorkImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,

    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE'

        
    },
    artist: {
        textAlign: 'center',
        color: '#EEEEEE',
        fontSize: 16,
        fontWeight: '200',
    },
    progressContainer:{
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer:{
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabelTxt: {
        color: '#fff',
    },
    MusicControlls: {
        flexDirection:'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 15
    },
    bottomContainer: {
        borderTopColor: '#393E46',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 15
    },
    bottomControls: {
        flexDirection: 
        'row', justifyContent: 
        'space-between', 
        width:'80%'
    },

})