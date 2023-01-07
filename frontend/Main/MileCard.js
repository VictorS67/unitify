import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "../UI/Theme";
import { normalize } from "../Tool/FontSize";
import {
  getDailyLeaderboard,
  getMonthlyLeaderboard,
} from "../store/leader-actions";

const MileCard = (props) => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const user = useSelector((state) => state.user);
  const leaderboard = useSelector((state) => state.leaderboard);

  return (
    <TouchableOpacity
      style={[
        styles.mileCard,
        main.navStatus === "NAV" ? { backgroundColor: theme.colors.third } : {},
      ]}
      onPress={() => {
        if (leaderboard.ismonthly) {
          dispatch(getMonthlyLeaderboard(user));
        } else {
          dispatch(getDailyLeaderboard(user));
        }
        props.navigation.navigate("Miles");
      }}
    >
      <View style={styles.mileCardTitle}>
        <Text style={styles.titleText}>Miles</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Leaderboard");
          }}
        >
          <MaterialIcons
            name="leaderboard"
            size={normalize(14)}
            color={theme.colors.text}
          />
          <Text
            style={{
              fontSize: normalize(12),
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            &nbsp;Leaderboard
          </Text>
        </Pressable>
      </View>
      <View style={styles.mileCardContent}>
        <View style={styles.statCard}>
          <Text style={styles.mileText}>
            {user.currentRank !== null ? user.currentRank : ""}
          </Text>
          <Text style={styles.normalText}>Rank</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.mileText}>
            {user.monthlyMiles !== null ? user.monthlyMiles : ""}
          </Text>
          <Text style={styles.normalText}>Month</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.mileText}>
            {user.totalMiles !== null ? user.totalMiles : ""}
          </Text>
          <Text style={styles.normalText}>Total</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mileCard: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    padding: normalize(10),
  },
  mileCardTitle: {
    color: theme.colors.text,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: normalize(5),
  },
  mileCardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexGrow: 1,
  },
  titleText: {
    color: theme.colors.text,
    fontSize: normalize(18),
    textAlign: "left",
    textTransform: "uppercase",
  },
  mileText: {
    color: theme.colors.text,
    fontSize: normalize(30),
    textAlign: "left",
    textTransform: "uppercase",
  },
  normalText: {
    color: theme.colors.text,
    fontSize: normalize(14),
    textAlign: "left",
    textTransform: "uppercase",
    marginBottom: normalize(3),
    marginTop: normalize(2),
  },
  statCard: {
    alignItems: "center",
    paddingHorizontal: normalize(5),
  },
  button: {
    color: theme.colors.text,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(4),
    elevation: normalize(3),
  },
});

export default MileCard;
