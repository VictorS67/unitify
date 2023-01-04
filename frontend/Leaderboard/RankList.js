import React, {useState} from "react";
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
// import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import LikeButton from "./Likeheart";
import { normalize } from "../Tool/FontSize";
const trialData = [
  { name: 'We Tu Lo', score: 1000,rank: 1, iconUrl: 'https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094043-stock-illustration-profile-icon-male-avatar.jpg' },
  { name: 'Adam Savage', score: 12, rank: 2, iconUrl: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png' },
  { name: 'Derek Black', score: 244, rank: 3, iconUrl: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
  { name: 'Erika White', score: 0, rank: 4, iconUrl: 'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-eskimo-girl.png' },
  { name: 'Atony Davis', score: 20, rank: 5, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
  { name: 'Jimmy Ba', score: 20, rank: 5, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
  { name: 'Magjic Johnson abasdsdawe123456789434242424242', score: 20, rank: 6, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
  { name: 'Happy 1', score: 200, rank: 7, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
  { name: 'Happy 2', score: 202, rank: 9, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
  { name: 'Happy 3', score: 23, rank: 21, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
  { name: 'Happy 4', score: 28, rank: 44, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
  { name: 'Happy 5', score: 60, rank: 111, iconUrl: 'https://static.witei.com/static/img/profile_pics/avatar4.png' },
]
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function RankList(props){

  // const [data, setdata] = useState(trialData);
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);
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
            <LikeButton userid = {props.userId} likeduserid = {item.userId}></LikeButton>
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
        data={leaderboard.users}
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
export default RankList;