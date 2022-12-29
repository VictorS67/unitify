// import React from "react";
// import { View } from "react-native-web";
// import Navibar from "./Navibar";
import ChampCard from "./ChampCard";
import RankList from "./RankList";
import Homebutton from "./Homebutton";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { normalize } from "../Tool/FontSize";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  SafeAreaView
} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MonthlyRankList from "./MonthlyRankList";
const oddRowColor = "white";
const evenRowColor = "#f2f5f7";
function Sevenboard(){
  return (
    <View style={styles.background}>
      <ChampCard style = {styles.championcard}>
      </ChampCard>
      {/* <Navibar>ygh9 5</Navibar> */}
      <RankList style = {styles.ranklist}></RankList>
    </View>)
}

function Monthboard(){
  return (
    <View style={styles.background}>
      <ChampCard style = {styles.championcard}>
      </ChampCard>
      {/* <Navibar>ygh9 5</Navibar> */}
      <MonthlyRankList style = {styles.ranklist}></MonthlyRankList>
    </View>)
}
const Tab = createMaterialTopTabNavigator();

function Navibar() {
  return (
    <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator>
          <Tab.Screen name="7DAYS" component={Sevenboard}/>
          <Tab.Screen name="1MONTH" component={Monthboard} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    
  );
}

// const styles = StyleSheet.create({
//     container:{
//         flex:0.1
//     }
// });

function Leaderboard(props){
 
    return (
        <SafeAreaView style={styles.background}>
        {/* //   <ChampCard style = {styles.championcard}>
        //   </ChampCard> */}
          <Pressable 
              style={styles.button}
              onPress={() => {props.navigation.navigate('Home');}}
          ></Pressable>
          {/* <NavigationContainer style={styles.container}> */}
            <Tab.Navigator>
            <Tab.Screen name="7DAYS" component={Sevenboard}/>
            <Tab.Screen name="1MONTH" component={Monthboard} />
            </Tab.Navigator>
          {/* </NavigationContainer> */}
        {/* //   <RankList style = {styles.ranklist}></RankList> */}
        </SafeAreaView>)

        
}
const styles = StyleSheet.create({
  background:{
    height:'100%',
    width:'100%',
    flexDirection:'column',
  },
  container:{
    flex:0.1,
    marginTop:10
  },
  championcard:{
    flex:0.4,
    flexDirection:'row',
    backgroundColor:'green'
  },
  ranklist:{
    flex:3,
    backgroundColor:'red'
  },
  rankcontainer: {
    paddingTop: 300,
    // paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "green",
    backgroundColor: "red"
  },
  boardcard: {
    paddingTop: 15,
    // paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.0,
    borderRadius: 5,
    borderColor: "#d6d7da",
    backgroundColor: "yellow"
  },
  homebutton: {
        width: normalize(500),
        height: normalize(40),
        // marginHorizontal: normalize(200),
        // marginVertical: normalize(20),
        paddingTop:0,
  },
  
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  rank: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 5
  },
  singleDidget: {
    paddingLeft: 16,
    paddingRight: 6
  },
  doubleDidget: {
    paddingLeft: 10,
    paddingRight: 2
  },
  label: {
    fontSize: 17,
    flex: 1,
    paddingRight: 80
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    right: 15,
    paddingLeft: 15
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10
  }
});

export default Leaderboard;