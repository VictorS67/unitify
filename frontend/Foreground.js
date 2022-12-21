import React, { useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Provider, useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";

import LoginUser from "./Users/LoginUser";
import MainPage from "./Main/Main";
import UserPage from "./Users/UserPage";
import Map from "./Map/Map";
import SkeletonView from "./UI/Skeleton";
import Card from "./UI/Card";
import { mapActions } from "./store/map-slice";
import { normalize } from "./Tool/FontSize";

function Foreground() {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);

    useEffect(() => {
        (async () => {
        
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                dispatch(mapActions.sErrorMsg(
                    {
                        message: 'Permission to access location was denied'
                    }
                ));
                return;
            }
        
            let curr_location = await Location.getCurrentPositionAsync({});
            // console.log(curr_location)
            dispatch(mapActions.sPosition(
                {
                    latitude: curr_location.coords.latitude,
                    longitude: curr_location.coords.longitude,
                    latitudeDelta: 0.02, 
                    longitudeDelta: 0.02
                }
            ));
        })();
    }, [dispatch]);

    return (
        <MainPage />
    //     <React.Fragment>
    //         <View style={styles.tripCardContent}>
    //             <Card  
    //                 style={styles.topChoiceTransCard}
    //                 childrenStyle={styles.topChoiceTransCardContent}
    //             >
    //                 <SkeletonView type={"SQUARE"} height={45} order={1} />

    //                 <View style={styles.topChoiceTransInfo}>
    //                     <SkeletonView style={styles.topChoiceTransInfoRow} type={"RECTANGLE"} height={15} order={2} />
    //                     <SkeletonView style={styles.topChoiceTransInfoRow} type={"RECTANGLE"} height={15} order={3} />
    //                 </View>
    //             </Card>
    //         </View>
    //     {/* <Pressable style={styles.button} onPress={onNavPress}>
    //         <Text style={styles.buttonTextLarge}>
    //             Let's Go!
    //         </Text>
    //     </Pressable>
    //     <View style={styles.optionsChoice}>
    //         <Text style={styles.optionsChoiceTitle}>
    //             Other Options
    //         </Text>
    //         <Divider style={{ width: "100%" }} />
    //         <Pressable style={styles.optionsChoiceButton}>
    //             <View style={styles.optionsChoiceButtonText}>
    //                 <Text style={styles.optionsChoiceText}>
    //                     CAR
    //                 </Text>
    //                 <Text style={styles.optionsChoiceText}>
    //                     5 mins
    //                 </Text>
    //             </View>
    //             <ProgressBar progress={0.5} />
    //         </Pressable>
            
    //         <Divider style={{ width: "100%" }} />
    //         <Pressable style={styles.optionsChoiceButton}>
    //             <View style={styles.optionsChoiceButtonText}>
    //                 <Text style={styles.optionsChoiceText}>
    //                     BUS
    //                 </Text>
    //                 <Text style={styles.optionsChoiceText}>
    //                     10 mins
    //                 </Text>
    //             </View>
    //             <ProgressBar progress={0.8} />
    //         </Pressable>
                            
    //         <Divider style={{ width: "100%" }} />
    //         <Pressable style={styles.optionsChoiceButton}>
    //             <View style={styles.optionsChoiceButtonText}>
    //                 <Text style={styles.optionsChoiceText}>
    //                     Walking
    //                 </Text>
    //                 <Text style={styles.optionsChoiceText}>
    //                     15 mins
    //                 </Text>
    //             </View>
    //             <ProgressBar progress={0.9} />
    //         </Pressable>

    //         <Divider style={{ width: "100%" }} />
    //         <Pressable style={styles.optionsChoiceButton}>
    //             <View style={styles.optionsChoiceButtonText}>
    //                 <Text style={styles.optionsChoiceText}>
    //                     Bicycling
    //                 </Text>
    //                 <Text style={styles.optionsChoiceText}>
    //                     8 mins
    //                 </Text>
    //             </View>
    //             <ProgressBar progress={0.6} />
    //         </Pressable>
    //     </View> */}
    // </React.Fragment>
    );
}

const styles = StyleSheet.create({
    tripCardContent: {
        flexDirection: "row", 
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: normalize(5)
    },
    topChoiceTransCard: { 
        width: "100%", 
        height: normalize(60)
    },
    topChoiceTransCardContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'space-around', 
        padding: normalize(5),
        width: "100%"
    },
    topChoiceTransIconCard: { 
        width: normalize(45), 
        height: normalize(45),
        backgroundColor: "blue"
    },
    topChoiceTransIconCardContent: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center', 
        justifyContent: 'center'
    },
    topChoiceTransInfo: {
        flexGrow: 1,
        alignItems: "space-around",
    },
    topChoiceTransInfoRow: {
        paddingHorizontal: normalize(5),
        flex: 1,
        flexDirection: "row",
        alignItems: "space-between",
        width: "100%"
    },
    topChoiceTransTitle: {
        fontSize: normalize(18),
        maxWidth: "90%",
        flex: 1
    },
    topChoiceTransTag: {
        fontSize: normalize(12),
        flex: 1
    },
    topChoiceTransTagText: {
        flexDirection: "row",
        flex: 1
    },
    button: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: normalize(5),
        paddingHorizontal: normalize(10),
        borderRadius: normalize(4),
        // elevation: 3,
        backgroundColor: 'orange'
    },
    buttonTextLarge: { 
        fontSize: normalize(20), 
        textAlign: "center", 
        textTransform: 'uppercase' 
    },
    optionsChoice: {
        flexGrow: 1,
        paddingVertical: normalize(5)
    },
    optionsChoiceTitle: {
        paddingVertical: normalize(5),
        fontSize: normalize(14)
    },
    optionsChoiceButton: {
        paddingVertical: normalize(10)
    },
    optionsChoiceButtonText: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingBottom: normalize(5)
    },
    optionsChoiceText: { 
        fontSize: normalize(14), 
        textTransform: 'uppercase' 
    }
});

export default Foreground;