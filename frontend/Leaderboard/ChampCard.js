
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView
  } from "react-native"; 
import { normalize } from "../Tool/FontSize";
import { useSelector, useDispatch } from "react-redux";
import { getMonthlyLeaderboard } from "../store/leader-actions";
const newData = {
    rank:"10th",
    name: "John 12312313123123131",
    score: Math.floor(Math.random() * 100).toString(),
    iconUrl:
      "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png",
    signature:"I am king of the world!"
};
function ChampCard() {
    const dispatch = useDispatch();
    const leaderboard = useSelector((state) => state.leaderboard);
    // dispatch(getMonthlyLeaderboard);
    // console.log(leaderboard.users);
    return (
        <SafeAreaView style={styles.container}>
            {/* <Homebutton style={styles.homeButton}></Homebutton> */}
            <SafeAreaView style={styles.infocontainer}>
                {/* <Homebutton style = {styles.homeButton}></Homebutton> */}
                <View style = {styles.topChoiceTransInfoRow}>
                    <Text style={styles.rank}>{leaderboard.champion.rankNumber}</Text>
                </View>

                <View style = {styles.topChoiceTransInfoRow}
                      >
                    {/* <Image source={{uri:"https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"}} style = {styles.avatar}></Image> */}
                    {/* <Text >{newData.signature}</Text> */}
                    <Text style={styles.score} numberOfLines = {1}>{leaderboard.champion.userName}</Text>
                </View>

                <View style={styles.topChoiceTransInfoRow}>
                    <Text style={styles.score} numberOfLines = {1}>{leaderboard.champion.monthlyMiles}</Text>
                </View>
                {/* <View style = {styles.topChoiceTransInfoRow}>
                    <Text >{newData.signature}</Text>
                </View> */} 
            </SafeAreaView>
            <SafeAreaView style = {styles.sigcontainer}>
              <Text style= {styles.signature} numberOfLines = {2}>{leaderboard.champion.championSignature}</Text>
            </SafeAreaView>
            
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        flexDirection:'column'
    },
    infocontainer:{
      width:'100%',
      marginTop:'5%',
      // height:'100%',
      marginRight:'80%',
      flexDirection:  'row',
    //   alignContent:'center',
      justifyContent:'space-evenly'
    },
    topChoiceTransInfoRow: {
      paddingHorizontal: normalize(5),
      flex: 1,
      flexDirection: "row",
      // alignItems: "center",
      justifyContent: "center",
      width: "100%"
    },
    avatarcontainer:{
      flex:1,
      flexDirection:'column',
      alignItems: "center",
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
      height: 60,
      width: 60,
    //   borderRadius: 30 / 2,
    //   marginRight: 10,
    //   flex: 0.33,
    //   position: "absolute",
    // marginLeft:'5%'
    },
    sigcontainer:{
      width:'90%',
      marginTop:'5%',
      // height:'100%',
      marginRight:'80%',
      flexDirection:  'row',
    //   alignContent:'center',
      justifyContent:'space-evenly'
    },
    signature:{
      // marginTop:'10%',
      
      fontSize: 20,
      // fontWeight: "bold",
    }
  });

export default ChampCard;