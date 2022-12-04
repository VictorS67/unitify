import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { normalize } from '../Tool/FontSize';

const PolylineInfo = props => {
    return (
        <View style={styles.container}>
            <View style={styles.modeContainer}>
                {   
                    (props.mode === "SUBWAY") &&
                    <FontAwesome5 name="subway" size={normalize(14)} color="black" />
                }
                {
                    (props.mode === "BUS") &&
                    <FontAwesome5 name="bus" size={normalize(14)} color="black" />
                }
                {
                    (props.mode === "BICYCLING") &&
                    <FontAwesome5 name="bicycle" size={normalize(12)} color="black" />
                }
                {
                    (props.mode === "WALKING") &&
                    <FontAwesome5 name="walking" size={normalize(14)} color="black" />
                }
                {
                    (props.mode === "DRIVING") &&
                    <FontAwesome5 name="car" size={normalize(14)} color="black" />
                }
                <Text style={styles.distanceText}>
                    {props.distance}
                </Text>
            </View>
            <View style={styles.durationContainer}>
                <Text style={styles.durationText}>
                    {props.duration}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        height: "100%", 
        width: "100%", 
        alignItems: "space-around" 
    },
    modeContainer: { 
        flex: 1.6, 
        flexDirection: "row", 
        alignItems: "center", 
        width: "100%" 
    },
    distanceText: {
        flexGrow: 1, 
        fontSize: normalize(11),
        textAlign: "center",
        textTransform: 'uppercase'
    },
    durationContainer: {
        flex: 1, 
        width: "100%", 
        flexGrow: 1, 
        justifyContent: "center"
    },
    durationText: {
        flex: 1,
        fontSize: normalize(8),
        textAlign: "center",
        textTransform: 'uppercase'
    }
});

export default PolylineInfo;
