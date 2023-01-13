import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import * as Application from "expo-application";
import Constants from "expo-constants";
import { Asset, useAssets } from "expo-asset";

import { normalize } from "../Tool/FontSize";

const AppInfo = (props) => {
  const [assets, error] = useAssets([require("../assets/icon.png")]);
  const version = Constants.manifest.version;
  const name = Constants.manifest.name;

  console.log("Constants.manifest: ", Constants.manifest);

  return (
    <View style={styles.container}>
      {assets ? (
        <Image
          source={assets[0]}
          style={{
            width: normalize(80),
            height: normalize(80),
            borderRadius: normalize(10),
            paddingBottom: normalize(10),
          }}
        />
      ) : null}
      <Text
        style={{
          fontSize: normalize(14),
          paddingVertical: normalize(5),
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: normalize(14),
          paddingBottom: normalize(5),
        }}
      >
        {version}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppInfo;
