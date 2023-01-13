import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { theme } from "../UI/Theme";
import { normalize } from "../Tool/FontSize";
import { getMonthlyLeaderboard } from "../store/leader-actions";

const ChampCard = (props) => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.colors.champBack,
        height: normalize(100),
        paddingVertical: normalize(10),
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: theme.colors.boardText,
          fontSize: normalize(15),
          textAlign: "center",
          width: "100%",
          // fontFamily: "monospace",
        }}
        numberOfLines={1}
      >
        {leaderboard.champion !== null
          ? leaderboard.champion.userName
          : "No one"}
        &nbsp;owns the champion now!
      </Text>
      <View
        style={{
          height: normalize(50),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.colors.boardText,
            fontSize: normalize(20),
            textAlign: "center",
            width: "100%",
            // fontFamily: "monospace",
            fontWeight: "bold",
          }}
          numberOfLines={2}
        >
          {leaderboard.champion !== null
            ? leaderboard.champion.championSignature
            : ""}
        </Text>
      </View>

      <Text
        style={{
          color: theme.colors.boardText,
          fontSize: normalize(15),
          textAlign: "center",
          width: "100%",
          // fontFamily: "monospace",
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
