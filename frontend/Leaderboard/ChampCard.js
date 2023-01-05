import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { normalize } from "../Tool/FontSize";
import { getMonthlyLeaderboard } from "../store/leader-actions";

const ChampCard = (props) => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);

  return (
    <SafeAreaView
      style={{
        height: normalize(100),
        paddingTop: normalize(5),
      }}
    >
      <Text
        style={{
          fontSize: normalize(15),
          textAlign: "center",
          width: "100%",
        }}
        numberOfLines={1}
      >
        {leaderboard.champion !== null ? leaderboard.champion.userName : ""}
        &nbsp;owns the champion now!
      </Text>
      <View
        style={{
          height: normalize(60),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: normalize(25),
            textAlign: "center",
            width: "100%",
          }}
          numberOfLines={2}
        >
          {leaderboard.champion !== null
            ? leaderboard.champion.championSignature
            : ""}
          {/* Winner is me :D */}
        </Text>
      </View>

      <Text
        style={{
          fontSize: normalize(15),
          textAlign: "center",
          width: "100%",
        }}
        numberOfLines={1}
      >
        champion signature
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ChampCard;
