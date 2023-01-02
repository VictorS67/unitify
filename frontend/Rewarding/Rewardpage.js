
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
import CircularProgress from "./CircularProgress";
import { LineChart} from 'react-native-chart-kit'
function RewardPage(props){
    return(
        
        <SafeAreaView style={styes.container}>
            <Pressable 
              style={styes.button}
              onPress={() => {props.navigation.navigate('Home');}}
          ></Pressable>
            <SafeAreaView style={styes.titlecontainer}>
                <Text style={styes.title}>{"Goal of this month"}</Text>
            </SafeAreaView>
            
            <SafeAreaView style = {styes.circlecontainer}>
                <CircularProgress percent={70}></CircularProgress>
                {/* <Text>{"Goal of this month is caculated by 1.1 * average miles"}</Text> */}
            </SafeAreaView>
            
            <SafeAreaView style={styes.notecntainer}>
                <Text>{"Goal of this month is caculated by 1.1 * average miles"}</Text>
            </SafeAreaView>
            {/* <Text>{"Happy"}</Text> */}
        </SafeAreaView>
    
        
    );
}

const styes = StyleSheet.create({
    container:{
        // flex: 1,
        // justifyContent: "space-between",
        alignItems: "center",
        height:'100%',
        width:'100%'
    },
    titlecontainer:{
        marginTop: '5%',
        flex:0.2,
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        // marginTop:'10%',
        // flex: 0.1,
        fontSize:30
     },
    circlecontainer:{
        // marginTop:'5%',
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "start",
        flex:0.8
    },
    notecntainer:{
        flex:1,
        // justifyContent: "center",
    }

})

export default RewardPage;