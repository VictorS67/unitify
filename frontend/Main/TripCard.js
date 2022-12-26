import React from "react";
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useSelector } from "react-redux";
import { FontAwesome5 } from '@expo/vector-icons';

import TripPlanningCard from "./TripPlanningCard";
import TripNavCard from "./TripNavCard";
import { normalize } from "../Tool/FontSize";


const TripCard = props => {

    const main = useSelector((state) => state.main);

    return (
        <View style={styles.tripCard}>
            <View style={styles.tripCardTitle}>
                <Text style={styles.titleText}>
                    Your Trip
                </Text>

                {
                    main.navStatus === "NAV" &&
                    <Pressable style={styles.button}>
                        <FontAwesome5 name="question-circle" size={normalize(14)} color="black" />
                        <Text style={{ fontSize: normalize(12), textAlign: "center", textTransform: 'uppercase' }}>
                            &nbsp;Not My Trip
                        </Text>
                    </Pressable>
                }
            </View>

            {
                main.navStatus === "PLAN" &&
                <TripPlanningCard />
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
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        borderRadius: normalize(4),
        elevation: normalize(3),
        backgroundColor: 'orange'
    }
});

export default TripCard;
