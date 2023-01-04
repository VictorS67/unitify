import React from "react";
import {
   
    StyleSheet,
    Text,
    View,
    SafeAreaView
  } from "react-native";
import { userActions } from "../store/user-slice";
import { normalize } from "../Tool/FontSize";
const userData = {
    rank:"1st",
    name: "Leo Messi",
    score: Math.floor(Math.random() * 100).toString(),
    iconUrl:
      "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png",
    signature:"The GOAT!"
};
function UserInfoCard(){
    
    return (
        <SafeAreaView>
            <SafeAreaView style={styles.infocontainer}>
                {/* <Homebutton style = {styles.homeButton}></Homebutton> */}
                <View style = {styles.topChoiceTransInfoRow}>
                    <Text style={styles.rank}>{userData.rank}</Text>
                </View>

                <View style = {styles.topChoiceTransInfoRow}
                      >
                    {/* <Image source={{uri:"https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png"}} style = {styles.avatar}></Image> */}
                    {/* <Text >{newData.signature}</Text> */}
                    <Text style={styles.score} numberOfLines = {1}>{userData.name}</Text>
                </View>

                <View style={styles.topChoiceTransInfoRow}>
                    <Text style={styles.score}>{userData.score}</Text>
                </View>
                {/* <View style = {styles.topChoiceTransInfoRow}>
                    <Text >{newData.signature}</Text>
                </View> */} 
            </SafeAreaView>
        </SafeAreaView>
    );

};
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-evenly'
    },
    infocontainer:{
        width:'100%',
        marginTop:'5%',
        // height:'100%',
        // marginRight:'80%',
        flexDirection:  'row',
        alignContent:'center',
        justifyContent:'space-evenly'
      },
      topChoiceTransInfoRow: {
        paddingHorizontal: normalize(5),
        flex: 1,
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom:'5%'
      },
      
      rank: {
        marginTop:'10%',
        fontSize: 20,
        fontWeight: "bold",
      //   position: "absolute",
      //   marginLeft: '10%',
      //   flex: 0.33
      },
      score: {
        marginTop:'10%',
        fontSize: 20,
        fontWeight: "bold",
      //   position: "absolute",
      //   right: 15,
      //   paddingLeft: 30,
      //   marginLeft:'5%',
      //   flex: 0.33
      },
      
    
})

export default UserInfoCard;