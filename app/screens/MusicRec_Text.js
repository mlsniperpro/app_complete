import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
//import customTheme from "../components/customTheme"
import {Audio} from 'expo-av';
//import {NativeBaseProvider, Text, Box, Button, extendTheme} from 'native-base';
import {FileSystem, Permissions} from 'react-native-unimodules';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

const MusicRec_Test = () => {
  
  const [song_title, setTitle] = useState("Waiting...");
  const [artist_name, setName] = useState("Waiting...");
  const [year, setYear] = useState("Waiting...");
  const [genre, setGenre] = useState("Waiting...")

  async function _findSong() {
    // Audio.setAudioModeAsync()
    const {status} = await Audio.requestPermissionsAsync();
    //console.log('Current Status ' + status);
    const recording = new Audio.Recording();
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: true,
      });
      const recordOptions = {
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 8000,
          numberOfChannels: 1,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: true,
        },
      };
      await recording.prepareToRecordAsync(recordOptions);
      await recording.startAsync();
      //console.log('Recording');
      await timeout(8000);
      //console.log('Done recording');
      await recording.stopAndUnloadAsync();
      let recordingFile = recording.getURI();

      let result = await identify(recordingFile, defaultOptions);
      let name = JSON.parse(result)["metadata"]["music"][0]["artists"][0]["name"];
      setTitle(name);
      let name_artist = JSON.parse(result)["metadata"]["music"][0]["title"]
      setName(name_artist);
      let date_released = JSON.parse(result)["metadata"]["music"][0]["release_date"]
      setYear(date_released);
      let genres = JSON.parse(result)["metadata"]["music"][0]["genres"][0]["name"]
      setGenre(genres);
      console.log(name," ", name_artist, " ", date_released, " ", genres);
      
    } catch (error) {
      //console.log(error);
      //console.log('Error in this!!!!');
      console.log("Music Unrecognizable")
    }
  }
    return (
      < NativeBaseProvider theme={customTheme}>
        <View style={styles.container}>
        <Button shadow={2} onPress={_findSong}>Find Song</Button>
        <View >
        <Text >Song Title : {song_title}</Text>
        <Text>Song Genre : {genre}</Text>
        <Text>Artist Name: {artist_name}</Text>
        <Text>Release Date : {year}</Text>
        </View>
      </View>
      </NativeBaseProvider>
      
      
    );
  }

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const defaultOptions = {
  host: 'identify-eu-west-1.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type: 'audio',
  secure: true,
  access_key: '050cde87cb2ce09b319bdf0aaaaf832f',
  access_secret: 'rg54QSVAEs1L3haFr2TGeTYkIoG9KJFbsbRU7Ajp',
};
function buildStringToSign(
  method,
  uri,
  accessKey,
  dataType,
  signatureVersion,
  timestamp,
) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join(
    '\n',
  );
}
function signString(stringToSign, accessSecret) {
  return Base64.stringify(hmacSHA1(stringToSign, accessSecret));
}
async function identify(uri, options) {
  var current_data = new Date();
  var timestamp = current_data.getTime() / 1000;
  var stringToSign = buildStringToSign(
    'POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp,
  );
  let fileinfo = await FileSystem.getInfoAsync(uri, {size: true});
  var signature = signString(stringToSign, options.access_secret);
  var formData = {
    sample: {uri: uri, name: 'sample.wav', type: 'audio/wav'},
    access_key: options.access_key,
    data_type: options.data_type,
    signature_version: options.signature_version,
    signature: signature,
    sample_bytes: fileinfo.size,
    timestamp: timestamp,
  };
  var form = new FormData();
  for (let key in formData) {
    form.append(key, formData[key]);
  }

  let postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: form,
  };
  //console.log(postOptions.body);
  let response = await fetch(
    'http://' + options.host + options.endpoint,
    postOptions,
  );
  let result = await response.text();
  //console.log(result);
  return result;
}
export default MusicRec_Test;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});