import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

import TripPlanningCard from "./TripPlanningCard";
import TripNavCard from "./TripNavCard";
import { normalize } from "../Tool/FontSize";


const TripCard = props => {

    const main = useSelector((state) => state.main);

    const trending = "up";

    return (
        <View style={styles.tripCard}>
            <View style={styles.tripCardTitle}>
                <Text style={styles.titleText}>
                    Your Trip
                </Text>
            </View>

            {
                main.navStatus === "PLAN" &&
                <TripPlanningCard trending={trending} />
            }

            {
                main.navStatus === "NAV" &&
                <TripNavCard />
            }
        </View>
    );
};


const styles = StyleSheet.create({
    tripCard: { 
        flex: 1, 
        justifyContent: "flex-start",
        backgroundColor: "green", 
        padding: normalize(10) 
    },
    tripCardTitle: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingBottom: normalize(5) 
    },
    titleText: {
        fontSize: normalize(18),
        textAlign: "left",
        textTransform: 'uppercase'
    }
});

export default TripCard;
