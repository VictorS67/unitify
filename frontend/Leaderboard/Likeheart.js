import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { getLatestUserStatus } from "../store/user-actions";
import { normalize } from "../Tool/FontSize";

const LikeButton = (props) => {
  const dispatch = useDispatch();

  const [liked, sLiked] = useState(false);
  const [likeNumber, sLikeNumber] = useState(0);

  useEffect(() => {
    sLiked(props.isLiked);
    sLikeNumber(props.likeNumber);
  }, [props.isLiked, props.likeNumber]);

  const pressHandler = () => {
    sLiked((isLiked) => !isLiked);
    if (liked) {
      sLikeNumber((counter) => counter - 1);
    } else {
      sLikeNumber((counter) => counter + 1);
    }
    console.log(likeNumber);
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
          color={liked ? "red" : "black"}
        />
      </Pressable>
      <Text
        style={{
          fontSize: normalize(12),
        }}
      >
        {likeNumber}
      </Text>
    </SafeAreaView>
  );
};

export default LikeButton;
