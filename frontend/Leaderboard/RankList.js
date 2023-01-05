import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "react-native-paper";

import LikeButton from "./Likeheart";
import { normalize } from "../Tool/FontSize";

const RankList = (props) => {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);
  const user = useSelector((state) => state.user);

  const renderItem = ({ item, index }) => {
    console.log("RANK LIST ITEM: ", item);

    return (
      <React.Fragment>
        <SafeAreaView
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: normalize(50),
          }}
          key={item.userId}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: normalize(24),
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {index + 1}
            </Text>
          </View>

          <View
            style={{
              flex: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: "bold",
              }}
              numberOfLines={1}
            >
              {item.userName}
            </Text>

            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: "bold",
              }}
            >
              {item.monthlyMiles}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <LikeButton likeNumber={item.likeNumber} isLiked={item.isLiked} />
          </View>
        </SafeAreaView>
        <Divider style={{ width: "100%" }} />
      </React.Fragment>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={leaderboard.leaderBoard}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return item.userId;
        }}
        contentContainerStyle={{
          paddingBottom: normalize(100),
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RankList;
