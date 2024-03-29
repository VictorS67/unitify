import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { likeUser, unlikeUser } from "../store/user-actions";
import { normalize } from "../Tool/FontSize";
import { leaderActions } from "../store/leader-slice";
import { userActions } from "../store/user-slice";
import { getLatestUserStatus } from "../store/user-actions";

const LikeButton = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [liked, sLiked] = useState(false);
  const [likeNumber, sLikeNumber] = useState(0);

  useEffect(() => {
    sLiked(props.isLiked);
    sLikeNumber(props.likeNumber);
  }, [props.isLiked, props.likeNumber]);

  const pressHandler = () => {
    console.log("LIKE PRESSED! ", props.userId);

    if (liked) {
      dispatch(unlikeUser(user.id, props.userId)).then((resolve) => {
        const result = JSON.parse(resolve);
        if (result.status === 200) {
          dispatch(leaderActions.unlikeUserInLeaderBoard(props.userId));
          dispatch(getLatestUserStatus(user.id));
          sLikeNumber((counter) => counter - 1);
          sLiked(false);
        } else {
          console.log("result message: ", result["message"]);
          Alert.alert("Ah no", result.message, [
            {
              text: "Try Again",
              onPress: () => console.log("Try Again"),
            },
          ]);
        }
      });
    } else {
      dispatch(likeUser(user.id, props.userId)).then((resolve) => {
        const result = JSON.parse(resolve);
        if (result.status === 200) {
          dispatch(leaderActions.likeUserInLeaderBoard(props.userId));
          dispatch(getLatestUserStatus(user.id));
          sLikeNumber((counter) => counter + 1);
          sLiked(true);
        } else {
          console.log("result message: ", result["message"]);
          Alert.alert("Ah no", result.message, [
            {
              text: "Try Again",
              onPress: () => console.log("Try Again"),
            },
          ]);
        }
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        alignItems: "center",
      }}
    >
      <Pressable onPress={pressHandler}>
        <MaterialCommunityIcons
          name={liked ? "heart" : "heart-outline"}
          size={normalize(20)}
          color={liked ? "red" : props.textColor}
        />
      </Pressable>
      <Text
        style={{
          fontSize: normalize(12),
          color: props.textColor,
        }}
      >
        {likeNumber}
      </Text>
    </SafeAreaView>
  );
};

export default LikeButton;
