import {StyleSheet, View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import Button from "../components/Button";
import {Audio} from 'expo-av';

async function startRecording(){
  try {
    const permission = await Audio.requestPermissionsAsync();
    if (permission.status=="granted"){
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
    } else {
      setMessage("Please grant the microphone permission to proceed")
    }
    
  }catch(err){
    console.error("Failed to initiate recognition", err)
  }
}
async function stopRecording(){
  setRecording(undefined);
  await recording.stopUnloadAsync();

  let updateRcordings = [...recordings];
  const {sound, status} = await recording.createNewLoadedSoundAsync();
  }
export default function RecognizeMusic() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState();
  const [message, setMessage] = React.useState("");
  return (
    <View>
       <View style={styles.buttonsContainer}>
       <Button
       title={recording? "Print Details":"Initiate Recognition"}
       onPress={recording ? stopRecording : startRecording}

       />
       <StatusBar style='auto'/>
       </View>
       <Text>{message}</Text>
       
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer:{
    padding: 20,
    width: "100%",

},

})