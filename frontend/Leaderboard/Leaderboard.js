// import React from "react";
// import { View } from "react-native-web";
import Navibar from "./Navibar";
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
  ViewPropTypes,
  Button,
  SafeAreaView
} from "react-native";

const oddRowColor = "white";
const evenRowColor = "#f2f5f7";

function Leaderboard(){
 
    return (
        <View style={styles.background}>
          <ChampCard style = {styles.championcard}>
          </ChampCard>
          <Navibar>ygh9 5</Navibar>
          <RankList style = {styles.ranklist}></RankList>
        </View>)
        
}
const styles = StyleSheet.create({
  background:{
    height:'100%',
    width:'100%',
    flexDirection:'column',
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