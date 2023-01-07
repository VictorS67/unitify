import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card";
import BottomChart from "./BottomChart";
// import CircularProgress from "./CircularProgress";
import CircularProgress from "./CircularProgress";
import { normalize } from "../Tool/FontSize";
import { theme } from "../UI/Theme";

function RewardPage(props) {
  const user = useSelector((state) => state.user);
  const percent = Math.floor(user.monthlyMiles / 3000);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: normalize(10),
          marginVertical: normalize(5),
        }}
      >
        <Card
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: theme.colors.secondary,
          }}
          childrenStyle={{
            flexDirection: "row",
            paddingVertical: normalize(10),
            height: "100%",
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: normalize(20),
                marginBottom: normalize(5),
              }}
            >
              Month Miles
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
              }}
            >
              {user.monthlyMiles !== null ? user.monthlyMiles : ""}
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontSize: normalize(20),
                marginBottom: normalize(5),
              }}
            >
              Total Miles
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
              }}
            >
              {user.totalMiles !== null ? user.totalMiles : ""}
            </Text>
          </View>
        </Card>
      </View>

      <View
        style={{
          flex: 3,
          marginHorizontal: normalize(10),
          marginVertical: normalize(5),
        }}
      >
        <View
          style={{
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            percentage={user.totalMiles !== null ? user.totalMiles : 0}
            radius={140}
            strokeWidth={25}
            duration={500}
            color={theme.colors.primary}
            delay={500}
            textColor={theme.colors.primary}
            max={3000}
          />
        </View>
      </View>

      <View
        style={{
          flex: 4,
          marginHorizontal: normalize(10),
          marginVertical: normalize(5),
        }}
      >
        <Card
          style={{
            flex: 1,
            backgroundColor: theme.colors.secondary,
          }}
          childrenStyle={{
            alignItems: "center",
            paddingVertical: normalize(10),
            paddingHorizontal: normalize(5),
          }}
        >
          <Text
            style={{
              fontSize: normalize(18),
              marginBottom: normalize(10),
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Earn more miles to help creating a cleaner environment
          </Text>
          <Text
            style={{
              fontSize: normalize(14),
              marginBottom: normalize(5),
              textAlign: "center",
            }}
          >
            What is Miles? How to earn Miles?
          </Text>
          <Text
            style={{
              fontSize: normalize(12),
              marginBottom: normalize(5),
              textAlign: "center",
            }}
          >
            Miles is a metric to measure how environmentally friendly a user's
            transit mode is. Different transportation modes are assigned various
            weights, depending on their emission levels.
          </Text>
          <Text
            style={{
              fontSize: normalize(12),
              marginBottom: normalize(5),
              textAlign: "center",
            }}
          >
            For example, 1 Subway mile = 1 Shuttle Bus mile = 1.2 Bicycling mile
            = 6 Walking mile.
          </Text>
          <Text
            style={{
              fontSize: normalize(12),
              marginBottom: normalize(5),
              textAlign: "center",
            }}
          >
            Users can choose different traval mode and start trips to earn
            miles!
          </Text>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              marginVertical: normalize(10),
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: normalize(10),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.third,
                paddingVertical: normalize(10),
                borderRadius: normalize(5),
                elevation: 3,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "#333",
                shadowOpacity: 0.3,
                shadowRadius: normalize(2),
              }}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            >
              <Text
                style={{
                  fontSize: normalize(18),
                  color: theme.colors.text,
                }}
              >
                Start A Trip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: normalize(10),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.third,
                paddingVertical: normalize(10),
                borderRadius: normalize(5),
                elevation: 3,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "#333",
                shadowOpacity: 0.3,
                shadowRadius: normalize(2),
              }}
              onPress={() => {
                props.navigation.navigate("Leaderboard");
              }}
            >
              <Text
                style={{
                  fontSize: normalize(18),
                  color: theme.colors.text,
                }}
              >
                Leaderboard
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styes = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  titlecontainer: {
    marginTop: "5%",
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
  circlecontainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    flex: 0.8,
  },
  notecntainer: {
    flex: 1,
  },
  diagramcontainer: {
    margiinTop: "5%",
    flex: 0.8,
    justifyContent: "center",
  },
  diagram: {
    width: "100%",
    height: 220,
  },
});

export default RewardPage;
