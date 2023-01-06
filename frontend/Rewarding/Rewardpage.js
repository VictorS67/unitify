
import React, { Component, useEffect, useState } from "react";
import { normalize } from "../Tool/FontSize";
import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView
} from "react-native";
import CircularProgress from "./CircularProgress";
import { useSelector, useDispatch } from "react-redux";
// import {BottomChart} from "./BottomChart";
import BottomChart from "./BottomChart";
const BACKEND_URL = "https://unitify-api.chenpan.ca";


function RewardPage(props){
    const user = useSelector((state) => state.user);
    const percent = Math.floor(user.monthlyMiles / 3000);
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
                <CircularProgress percent={percent}></CircularProgress>
                {/* <Text>{"Goal of this month is caculated by 1.1 * average miles"}</Text> */}
            </SafeAreaView>
            
            <SafeAreaView style={styes.notecntainer}>
                <Text>{"Goal of this month is caculated by 1.1 * average miles"}</Text>
            </SafeAreaView>
            {/* <Text>{"Happy"}</Text> */}
          
            <SafeAreaView style ={styes.diagramcontainer}>
                <BottomChart></BottomChart>
            </SafeAreaView>

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
    }, 
    diagramcontainer:{
        margiinTop:'5%',
        flex: 0.8,
        justifyContent: "center",
    },
    diagram:{
        width: '100%',
        height:220
    }

})

export default RewardPage;