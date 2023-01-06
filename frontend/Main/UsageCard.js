import React from "react";
import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";

import Card from "../UI/Card";
import { theme } from "../UI/Theme";
import { normalize } from "../Tool/FontSize";

const UsageCard = (props) => {
  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: "red", padding: normalize(10) }}>
      <Text style={styles.titleText}>Activities</Text>
      <View style={styles.cardColumn}>
        <Card
          style={styles.transportation}
          childrenStyle={styles.userCardContent}
        >
          <View style={styles.transportationIcon}>
            <FontAwesome5
              name="walking"
              size={normalize(20)}
              color={theme.colors.text}
            />
          </View>
          <View style={styles.transportationProgress}>
            <Text style={styles.transportationProgressText}>Walking</Text>
            <ProgressBar progress={0.5} />
          </View>
        </Card>
        <Card
          style={styles.transportation}
          childrenStyle={styles.userCardContent}
        >
          <View style={styles.transportationIcon}>
            <FontAwesome5
              name="bicycle"
              size={normalize(20)}
              color={theme.colors.text}
            />
          </View>

          <View style={styles.transportationProgress}>
            <Text style={styles.transportationProgressText}>Bicycle</Text>
            <ProgressBar progress={0.5} />
          </View>
        </Card>
      </View>
      <View style={styles.cardColumn}>
        <Card
          style={styles.transportation}
          childrenStyle={styles.userCardContent}
        >
          <View style={styles.transportationIcon}>
            <FontAwesome5
              name="bus"
              size={normalize(20)}
              color={theme.colors.text}
            />
          </View>

          <View style={styles.transportationProgress}>
            <Text style={styles.transportationProgressText}>Shuttle Bus</Text>
            <ProgressBar progress={0.5} />
          </View>
        </Card>
        <Card
          style={styles.transportation}
          childrenStyle={styles.userCardContent}
        >
          <View style={styles.transportationIcon}>
            <FontAwesome5
              name="subway"
              size={normalize(20)}
              color={theme.colors.text}
            />
          </View>

          <View style={styles.transportationProgress}>
            <Text style={styles.transportationProgressText}>Subway</Text>
            <ProgressBar progress={0.5} />
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: normalize(5),
  },
  titleText: {
    fontSize: normalize(18),
    textAlign: "left",
    textTransform: "uppercase",
    marginBottom: normalize(5),
  },
  cardColumn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transportation: {
    width: "45%",
    height: "80%",
  },
  transportationIcon: {
    width: "20%",
    alignItems: "center",
  },
  transportationProgress: {
    width: "80%",
    paddingLeft: normalize(10),
    paddingRight: normalize(5),
  },
  transportationProgressText: {
    fontSize: normalize(12),
    marginBottom: normalize(5),
  },
});

export default UsageCard;
