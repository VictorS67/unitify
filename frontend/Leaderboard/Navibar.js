import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView
  } from "react-native"; 
import Homebutton from "./Homebutton";
import MainPage from '../Main/Main';
import Leaderboard from './Leaderboard';

const Tab = createMaterialTopTabNavigator();

function Navibar() {
  return (
    <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="7DAYS" component={Leaderboard}/>
            <Tab.Screen name="1MONTH" component={MainPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
    container:{
        flex:0.1
    }
});

export default Navibar;