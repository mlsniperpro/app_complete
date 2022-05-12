import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './app/screens/Home';
import RecognizeMusic from './app/screens/RecognizeMusic';
import MusicPlayer from './app/screens/MusicPlayer';
export default function App() {
  return (
    <MusicPlayer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
