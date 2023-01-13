import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import Card from "../UI/Card";
import TripPlanningCard from "./TripPlanningCard";
import TripNavCard from "./TripNavCard";
import { theme } from "../UI/Theme";
import { normalize } from "../Tool/FontSize";
import { tripnavActions } from "../store/tripnav-slice";

const TripCard = (props) => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const [showNotMyTrip, sShowNotMyTrip] = useState(false);

  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <React.Fragment>
      <View style={[styles.tripCard]}>
        <View style={styles.tripCardTitle}>
          <Text style={styles.titleText}>Your Trip</Text>

          {main.navStatus === "NAV" && (
            <Pressable
              style={styles.button}
              onPress={() => {
                sShowNotMyTrip(true);
              }}
            >
              <FontAwesome5
                name="question-circle"
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
                &nbsp;Not My Trip
              </Text>
            </Pressable>
          )}
        </View>

        {main.navStatus === "PLAN" && <TripPlanningCard />}

        {main.navStatus === "NAV" && <TripNavCard />}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showNotMyTrip}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          sShowNotMyTrip(!showNotMyTrip);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 0.25,
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: theme.colors.background,
              borderRadius: normalize(20),
              padding: normalize(20),
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: normalize((width * 2.5) / 3.5),
            }}
          >
            <Card
              style={{
                position: "absolute",
                top: -normalize(35),
                width: normalize(70),
                height: normalize(70),
                borderRadius: normalize(70 / 2),
              }}
              childrenStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: normalize(65),
                  height: normalize(65),
                  borderRadius: normalize(65 / 2),
                  backgroundColor: theme.colors.error,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5
                  name="question"
                  size={normalize(24)}
                  color={theme.colors.errorText}
                />
              </View>
            </Card>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: normalize(30),
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: normalize(20),
                  fontWeight: "bold",
                }}
              >
                Not Your Trip?
              </Text>
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: normalize(16),
                  marginTop: normalize(10),
                }}
              >
                Your trip won't be saved if you decide to stop the trip.
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: normalize(20),
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: "lightgrey",
                    position: "absolute",
                    left: normalize(10),
                    bottom: 0,
                  },
                ]}
                onPress={() => {
                  sShowNotMyTrip(false);
                }}
              >
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: normalize(16),
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: theme.colors.error,
                    position: "absolute",
                    right: normalize(10),
                    bottom: 0,
                  },
                ]}
                onPress={() => {
                  sShowNotMyTrip(false);
                  dispatch(tripnavActions.coldTerminate());
                }}
              >
                <Text
                  style={{
                    color: theme.colors.errorText,
                    fontSize: normalize(16),
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  Stop My Trip
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  tripCard: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: theme.colors.secondary,
    padding: normalize(10),
  },
  tripCardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: normalize(5),
  },
  titleText: {
    color: theme.colors.text,
    fontSize: normalize(18),
    textAlign: "left",
    textTransform: "uppercase",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: normalize(5),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(4),
    elevation: normalize(3),
    backgroundColor: theme.colors.third,
  },
});

export default TripCard;
