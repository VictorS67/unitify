import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Animated,
  PanResponder,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";
import Map from "../Map/Map";
import MapTool from "../Map/MapTool";
import MapNav from "../Map/MapNav";
import TripCard from "./TripCard";
import UsageCard from "./UsageCard";
import MileCard from "./MileCard";
import { theme } from "../UI/Theme";
import { normalize } from "../Tool/FontSize";
import { mainActions } from "../store/main-slice";
import { getLatestUserStatus } from "../store/user-actions";

const MainPage = (props) => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const user = useSelector((state) => state.user);

  const [toTop, sToTop] = useState(false);
  const position = useRef(new Animated.Value(150)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      dispatch(mainActions.sKeyboardStatus(true));
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      dispatch(mainActions.sKeyboardStatus(false));
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      dispatch(getLatestUserStatus(user.id));
    }, 5 * 6000);

    return () => clearInterval(updateInterval);
  }, [dispatch]);

  useEffect(() => {
    if (main.navStatus === "INIT") {
      snapToHeight(150);
    } else if (main.navStatus === "PLAN") {
      snapToHeight(400);
    } else if (main.navStatus === "NAV") {
      snapToHeight(350);
    }
  }, [main.navStatus]);

  const parentResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (e, gestureState) => {
      return false;
    },
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (e, gestureState) => {
      if (toTop) {
        return gestureState.dy > 6;
      } else {
        return gestureState.dy < -6;
      }
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (evt, gestureState) => {},
    onPanResponderRelease: (evt, gestureState) => {
      if (toTop) {
        if (gestureState.dy > 50) {
          snapToBottom();
        } else {
          snapToTop();
        }
      } else {
        if (gestureState.dy < -90) {
          snapToTop();
        } else {
          snapToBottom();
        }
      }
    },
  });

  const snapToTop = () => {
    Animated.timing(position, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {});
    sToTop(true);
  };

  const snapToBottom = () => {
    Animated.timing(position, {
      toValue: 200,
      duration: 150,
      useNativeDriver: false,
    }).start(() => {});
    sToTop(false);
  };

  const snapToHeight = (height) => {
    Animated.timing(position, {
      toValue: height,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {});
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={[{ flexGrow: 1 }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Map />

        <Card style={styles.userCard} childrenStyle={styles.userCardContent}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          >
            <FontAwesome5
              name="user"
              size={normalize(22)}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </Card>

        <Card
          style={styles.mapToolCard}
          childrenStyle={styles.mapToolCardContent}
        >
          {main.navStatus !== "NAV" && (
            <MapTool style={{ flex: 1 }} keyboardStatus={main.keyboardStatus} />
          )}
          {main.navStatus === "NAV" && <MapNav />}
        </Card>
      </KeyboardAvoidingView>
      {main.keyboardStatus === false && (
        <Animated.View
          style={{ maxHeight: position }}
          {...parentResponder.panHandlers}
        >
          <ScrollView
            style={{ maxHeight: `100%`, width: "100%" }}
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {main.navStatus !== "INIT" && (
              <View style={[styles.container]}>
                <TripCard />
              </View>
            )}

            {main.navStatus !== "PLAN" && (
              <View style={[styles.container, styles.mileCard]}>
                <MileCard navigation={props.navigation} />
              </View>
            )}
            {/* {
              (main.navStatus === "NAV") &&
              <View style={[styles.container, styles.usageCard]}>
                  <UsageCard />
              </View>
          } */}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ecf0f1",
  },
  mapToolContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  userCard: {
    position: "absolute",
    top: normalize(35),
    right: normalize(20),
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(50 / 2),
    backgroundColor: theme.colors.background,
  },
  mapToolCard: {
    position: "absolute",
    bottom: normalize(5),
    alignSelf: "center",
    width: "95%",
    borderRadius: normalize(10),
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    paddingVertical: normalize(7),
    maxHeight: "100%",
  },
  userCardContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapToolCardContent: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  mileCard: {
    maxHeight: normalize(120),
    minHeight: normalize(120),
  },
  usageCard: {
    maxHeight: normalize(150),
    minHeight: normalize(150),
  },
});

export default MainPage;
