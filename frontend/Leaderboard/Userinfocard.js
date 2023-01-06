import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card";
import LikeButton from "./Likeheart";
import { normalize } from "../Tool/FontSize";
import { userActions } from "../store/user-slice";
import { getLatestUserStatus } from "../store/user-actions";

const UserInfoCard = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  console.log("User Info Card: ", userData.whoILiked);

  return (
    <Card
      style={{ margin: 0, padding: 0 }}
      childrenStyle={{ margin: 0, padding: 0 }}
    >
      <SafeAreaView
        style={{
          height: "100%",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flexShrink: 1,
            paddingHorizontal: normalize(10),
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
            {userData.currentRank > 99 ? "99+" : userData.currentRank}
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
            {userData.userName}
          </Text>

          <Text
            style={{
              fontSize: normalize(18),
              fontWeight: "bold",
            }}
          >
            {userData.monthlyMiles}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <LikeButton
            likeNumber={userData.likeNumber}
            isLiked={userData.whoILiked.includes(userData.id)}
          />
        </View>
      </SafeAreaView>
    </Card>
  );
};

const styles = StyleSheet.create({});

export default UserInfoCard;
