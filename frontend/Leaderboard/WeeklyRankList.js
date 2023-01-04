import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity
  } from "react-native"; 

import { useSelector, useDispatch } from "react-redux";
import LikeButton from "./Likeheart";
import { normalize } from "../Tool/FontSize";
const trialData = [
    { name: 'Joe Roddy', score: 69, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png' },
    { name: 'Ericka Johannesburg', score: 101, iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz' },
    { name: 'Tim Thomas', score: 41, iconUrl: 'http://conserveindia.org/wp-content/uploads/2017/07/teamMember4.png' },
]
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function MonthlyRankList(props){
  const dispatch = useDispatch();
  // const leaderboard = useSelector((state) => state.leaderboard);
  const leaderboard = useSelector((state) => state.leaderboard);
  console.log(leaderboard.weeklyusers);
  const renderItem = ({ item, index }) => (
    <SafeAreaView>
      <TouchableOpacity style={styles.listcontainer}>
        <SafeAreaView style={styles.left}>
          <View style = {styles.rankcontainer}>
            <Text style={styles.rank}>{index + 2}</Text>
          </View>
          {/* <Image style={styles.avatar} source={{uri: item.iconUrl}}></Image> */}
          <View style = {styles.topChoiceTransInfoRow}>
            <Text style={styles.name} numberOfLines ={1}>
              {item.userName}
            </Text>
          </View>
          
          {/* <Item title={item.name}></Item> */}
          <View style= {styles.scorecontainer}>
            <Text style = {styles.score}>{item.monthlyMiles}</Text>
          </View>
          <View style = {styles.likecontainer}>
            <LikeButton></LikeButton>
          </View>
        </SafeAreaView>
      {/* <Item title={item.name} /> */}
      </TouchableOpacity>
    </SafeAreaView>
    
  );
  // console.log(leaderboard.users);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={leaderboard.weeklyusers}
        renderItem={renderItem}
        keyExtractor={item => item.userId}
      />
    </SafeAreaView>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rankcontainer:{
    flex:0.25,
    marginLeft: '5%'
  },
  scorecontainer:{
    flex:0.25,
    flexDirection:'row',
    alignItems:'start',
    justifyContent:"space-between"
  },
  namecontainer:{
    flexDirection:"center",
    flex:1,
    height: 50,
    width: 50,
    // borderRadius: 30 / 2,
    // marginRight: 10,
  },
  likecontainer:{
    flex:0.25,
    marginLeft: '5%',
  },
  listcontainer:{
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "start",
    // justifyContent: "space-between",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#d6d7da"
  },
  topChoiceTransInfoRow: {
    paddingHorizontal: normalize(5),
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%"
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rank: {
    fontSize: 30,
    fontWeight: "bold",
    // marginRight: 5,
    // flex: 1,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
    // flex:2
  },
  name:{
    // fontSize: 25,
    width:'50%',
    fontWeight: "bold",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  score: {
    // fontSize: 35,
    fontWeight: "bold",
    // position: "absolute",
    // right: 15,
    // paddingLeft: 100
  },
  title: {
    fontSize: 32,
  },
});
export default MonthlyRankList;