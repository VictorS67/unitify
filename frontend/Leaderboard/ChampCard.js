
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
const newData = {
    rank:"1000",
    name: "John",
    score: Math.floor(Math.random() * 100).toString(),
    iconUrl:
      "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"
};
function ChampCard() {
    return (
        <SafeAreaView style={styles.container}>
            {/* <Homebutton style={styles.homeButton}></Homebutton> */}
            <SafeAreaView style={styles.infocontainer}>
                {/* <Homebutton style = {styles.homeButton}></Homebutton> */}
                <Text style={styles.rank}>{newData.rank}</Text>
                <Image source={{uri:"https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"}} style = {styles.avatar}></Image>
                <Text style={styles.score}>{newData.score}</Text>
            </SafeAreaView>
            
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        flexDirection:'row'
    },
    infocontainer:{
      width:'100%',
      marginTop:'5%',
    height:'100%',
    marginRight:'80%',
      flexDirection:  'row',
    //   alignContent:'center',
      justifyContent:'space-around'
    },
    homeButton:{
    //   marginTop:'15%',
    //   fontSize: 40,
    //   marginLeft: '30%',
      fontWeight: "bold",
    //   position: "absolute",
    },
    rank: {
      marginTop:'10%',
      fontSize: 30,
      fontWeight: "bold",
    //   position: "absolute",
    //   marginLeft: '10%',
    //   flex: 0.33
    },
    score: {
      marginTop:'10%',
      fontSize: 30,
      fontWeight: "bold",
    //   position: "absolute",
    //   right: 15,
    //   paddingLeft: 30,
    //   marginLeft:'5%',
    //   flex: 0.33
    },
    avatar: {
      marginTop:'10%',
      height: '40%',
      width: '20%',
    //   borderRadius: 30 / 2,
    //   marginRight: 10,
    //   flex: 0.33,
    //   position: "absolute",
    // marginLeft:'5%'
    }
  });

export default ChampCard;