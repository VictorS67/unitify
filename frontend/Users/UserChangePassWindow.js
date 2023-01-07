import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { changePassword } from "../store/user-actions";

const renderChangeColumn = (title, content, event) => {
  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: "row",
          padding: normalize(5),
          height: normalize(50),
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            paddingLeft: normalize(10),
          }}
        >
          <Text
            style={{
              fontSize: normalize(14),
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </View>
        <TextInput
          value={content}
          onChangeText={event}
          placeholder={"Write it here..."}
          secureTextEntry={true}
          style={styles.input}
        />
      </View>
      <Divider style={{ width: "100%" }} />
    </React.Fragment>
  );
};

const UserChangePassWindow = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [oldPass, sOldPass] = useState("");
  const [newPass, sNewPass] = useState("");
  const [newPassAgain, sNewPassAgain] = useState("");

  const resetPassword = () => {
    sOldPass("");
    sNewPass("");
    sNewPassAgain("");
  };

  const changePasswordHandler = (event) => {
    event.preventDefault();

    if (oldPass !== "" && newPass !== "" && newPassAgain !== "") {
      dispatch(changePassword(user.id, oldPass, newPass, newPassAgain)).then(
        (resolve) => {
          resetPassword();
          const result = JSON.parse(resolve);
          if (result.status === 200) {
            Alert.alert("Success", "You have changed your password.", [
              {
                text: "OK",
                onPress: () => console.log("OK"),
              },
            ]);
          } else {
            console.log("result message: ", result["message"]);
            Alert.alert("Ah no", result.message, [
              {
                text: "Try Again",
                onPress: () => console.log("Try Again"),
              },
            ]);
          }
        }
      );
    }
  };

  return (
    <View style={props.style}>
      {renderChangeColumn("Old Password", oldPass, (oldPassChange) => {
        sOldPass(oldPassChange);
      })}
      {renderChangeColumn("New Password", newPass, (newPassChange) => {
        sNewPass(newPassChange);
      })}
      {renderChangeColumn(
        "Password Again",
        newPassAgain,
        (newPassAgainChange) => {
          sNewPassAgain(newPassAgainChange);
        }
      )}
      <Text style={styles.passwordHint}>Your Password Should...</Text>
      <View style={{ marginBottom: normalize(2) }}>
        <Text
          style={styles.normalText}
        >{`\u2022 Start with any character (e.g. a-z).`}</Text>
      </View>
      <View style={{ marginBottom: normalize(2) }}>
        <Text
          style={styles.normalText}
        >{`\u2022 Total length between 8 to 15.`}</Text>
      </View>
      <TouchableOpacity
        style={{
          marginHorizontal: normalize(10),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "dodgerblue",
          marginTop: normalize(20),
          paddingVertical: normalize(10),
          borderRadius: normalize(5),
          elevation: 3,
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: normalize(2),
        }}
        onPress={changePasswordHandler}
      >
        <Text
          style={{
            fontSize: normalize(18),
            color: "white",
          }}
        >
          SUBMIT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 2,
    padding: normalize(5),
    fontSize: normalize(14),
  },
  normalText: {
    fontSize: normalize(12),
    textAlign: "left",
    marginStart: normalize(10),
  },
  passwordHint: {
    fontSize: normalize(14),
    textAlign: "left",
    marginStart: normalize(10),
    marginTop: normalize(5),
    fontWeight: "bold",
  },
});

export default UserChangePassWindow;
