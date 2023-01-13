import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";
import { theme } from "../UI/Theme";
import { normalize } from "../Tool/FontSize";

const UserMileWindow = (props) => {
  const user = useSelector((state) => state.user);

  return (
    <View style={props.style}>
      <View style={styles.userMileCollection}>
        <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
          <Text style={styles.mileText}>
            {user.currentRank !== null ? user.currentRank : ""}
          </Text>
          <Text style={styles.normalText}>Rank</Text>
        </Card>
        <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
          <Text style={styles.mileText}>
            {user.monthlyMiles !== null ? user.monthlyMiles : ""}
          </Text>
          <Text style={styles.normalText}>Month</Text>
        </Card>
        <Card style={styles.mileCard} childrenStyle={styles.mileCardContent}>
          <Text style={styles.mileText}>
            {user.totalMiles !== null ? user.totalMiles : ""}
          </Text>
          <Text style={styles.normalText}>Total</Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userMileCollection: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: normalize(5),
  },
  mileCard: {
    backgroundColor: theme.colors.third,
    borderRadius: normalize(20),
  },
  mileCardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(15),
  },
  normalText: {
    fontSize: normalize(14),
    marginBottom: normalize(3),
    marginTop: normalize(2),
  },
  mileText: {
    fontSize: normalize(30),
    textAlign: "left",
    textTransform: "uppercase",
  },
});

export default UserMileWindow;
