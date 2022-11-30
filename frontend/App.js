import React from "react";
import { MaskedViewComponent, View, StyleSheet } from 'react-native';
import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import { PROVIDER_GOOGLE, MapView } from "react-native-maps";


function App() {
    return (
        <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE}/>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },

  });
export default App;
