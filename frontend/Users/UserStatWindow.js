import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { normalize } from "../Tool/FontSize";

const UserStatWindow = props => {

    const user = useSelector((state) => state.user);

    return (
        <View style={props.style}>
            <Divider style={{ width: "100%" }} />
            <View style={styles.userStatCollection}>
                <View style={styles.statCard}>
                    <Text style={styles.statText}>
                        {
                            (user.likeNumber !== null)
                            ? user.likeNumber
                            : 0
                        }
                    </Text>
                    <Text style={styles.normalText}>
                        <FontAwesome5 name="thumbs-up" size={normalize(14)} color="black" />
                        &nbsp;Liked
                    </Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statText}>
                        {
                            (user.likeNumber !== null)
                            ? user.likeNumber
                            : 0
                        }
                    </Text>
                    <Text style={styles.normalText}>
                        <FontAwesome5 name="trophy" size={normalize(14)} color="black" />
                        &nbsp;Wins
                    </Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statText}>
                        {
                            (user.likeNumber !== null)
                            ? user.likeNumber
                            : 0
                        }
                    </Text>
                    <Text style={styles.normalText}>
                        <FontAwesome5 name="user-friends" size={normalize(14)} color="black" />
                        &nbsp;Visited
                    </Text>
                </View>
            </View>
            <Divider style={{ width: "100%" }} />
        </View>
    );

};

const styles = StyleSheet.create({
    userStatCollection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    statCard: { 
        alignItems: "center", 
        paddingHorizontal: normalize(5),
        width: "30%"
    },
    statText: {
        fontSize: normalize(16),
        fontWeight: "bold"
    },
    normalText: {
        fontSize: normalize(14),
        marginBottom: normalize(3),
        marginTop: normalize(2)
    },
});

export default UserStatWindow;
