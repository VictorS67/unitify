import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Pressable, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ChampCard from "./ChampCard";
import RankList from "./RankList";
import UserInfoCard from "./Userinfocard";
import { normalize } from "../Tool/FontSize";
import {
  getMonthlyLeaderboard,
  getWeeklyLeaderboard,
} from "../store/leader-actions";

const Tab = createMaterialTopTabNavigator();

const Sevenboard = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(getWeeklyLeaderboard(user));
    });
    return unsubscribe;
  }, [props.navigation, dispatch]);

  return (
    <View style={styles.background}>
      <ChampCard style={styles.championcard} />
      <RankList style={styles.ranklist} userid={user.id} />
      <Pressable
        style={styles.userinfocontainer}
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
      >
        <UserInfoCard userid={user.id} />
      </Pressable>
    </View>
  );
};

const Monthboard = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(getMonthlyLeaderboard(user));
    });
    return unsubscribe;
  }, [props.navigation, dispatch]);

  return (
    <View style={styles.background}>
      <ChampCard style={styles.championcard} />
      <RankList style={styles.ranklist} userId={user.id} />
      <Pressable
        style={styles.userinfocontainer}
        onPress={() => props.navigation.navigate("Profile")}
      >
        <UserInfoCard userid={user.id}></UserInfoCard>
      </Pressable>
    </View>
  );
};

const Leaderboard = (props) => {
  const leaderboard = useSelector((state) => state.leaderboard);

  return (
    <SafeAreaView style={styles.background}>
      <Pressable
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      ></Pressable>
      <Tab.Navigator
        initialRouteName={leaderboard.ismonthly ? "MONTH" : "WEEK"}
      >
        <Tab.Screen name="WEEK" component={Sevenboard} />
        <Tab.Screen name="MONTH" component={Monthboard} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userinfocontainer: {
    position: "absolute",
    bottom: 0,
    height: 100,
    backgroundColor: "transparent",
    padding: normalize(5),
  },
  background: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
  },
  container: {
    flex: 0.1,
    marginTop: 10,
  },
  championcard: {
    flex: 0.4,
    flexDirection: "row",
    backgroundColor: "green",
  },
  ranklist: {
    flex: 3,
    backgroundColor: "red",
  },
  rankcontainer: {
    paddingTop: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "green",
    backgroundColor: "red",
  },
  boardcard: {
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.0,
    borderRadius: 5,
    borderColor: "#d6d7da",
    backgroundColor: "yellow",
  },
  homebutton: {
    width: normalize(500),
    height: normalize(40),
    paddingTop: 0,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  rank: {
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 5,
  },
  singleDidget: {
    paddingLeft: 16,
    paddingRight: 6,
  },
  doubleDidget: {
    paddingLeft: 10,
    paddingRight: 2,
  },
  label: {
    fontSize: 17,
    flex: 1,
    paddingRight: 80,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
    right: 15,
    paddingLeft: 15,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
});

export default Leaderboard;
