import React, { useState, useEffect } from "react";
import { ScrollView , View, StyleSheet, Keyboard, useWindowDimensions, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";
import Map from "../Map/Map";
import MapTool from "../Map/MapTool";
import MapNav from "../Map/MapNav";
import TripCard from "./TripCard";
import UsageCard from "./UsageCard";
import MileCard from "./MileCard";
import { normalize } from "../Tool/FontSize";
import { mainActions } from "../store/main-slice";


const MainPage = props => {

    const dispatch = useDispatch();
    const main = useSelector((state) => state.main);
    
    const [scrollHeight, sScrollHeight] = useState(30);
    const [pageY, sPageY] = useState(null);
    const [pageYOffest, sPageYOffset] = useState(0);

    const { height, width, scale, fontScale } = useWindowDimensions();

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            dispatch(mainActions.sKeyboardStatus(true));
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            dispatch(mainActions.sKeyboardStatus(false));
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [dispatch]);

    useEffect(() => {
        sScrollHeight(Math.max(Math.min(scrollHeight, main.minHeight), main.maxHeight));
    }, [scrollHeight])

    const onTouchMove = (e) => {

        // console.log("SCROLL");
        // console.log('touch info:', e.nativeEvent);

        if (pageY !== null) {
            sPageYOffset(pageY - e.nativeEvent.pageY);
        }

        sPageY(e.nativeEvent.pageY);
        sScrollHeight(scrollHeight + pageYOffest / height * 100);
    }

    const onTouchEnd = (e) => {
        sPageY(null);
        sPageYOffset(0);
    }

    return (
        <View style={styles.container}>
            <View style={[{flexGrow: 1}]}>
                <Map />
                <View style={styles.mapToolContainer}>
                    <Card style={styles.userCard} childrenStyle={styles.userCardContent}>
                        <FontAwesome5 name="user" size={normalize(22)} color="black" />
                    </Card>
                    <Card style={styles.mapToolCard} childrenStyle={styles.mapToolCardContent}>
                        {
                            (main.navStatus !== "NAV") &&
                            <MapTool style={{flex: 1}} keyboardStatus={main.keyboardStatus}/>
                        }
                        {
                            (main.navStatus === "NAV") &&
                            <MapNav />
                        }
                    </Card>
                </View>
            </View>
            {
                (main.keyboardStatus === false) &&
                <ScrollView 
                    style={{maxHeight: `${scrollHeight}%`}}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    scrollEnabled={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {
                        (main.navStatus !== "INIT") && 
                        <View style={[styles.container]}>
                            <TripCard />
                        </View>
                    }

                    {
                        (main.navStatus !== "PLAN") && 
                        <View style={[styles.container, styles.mileCard]}>
                            <MileCard />
                        </View>
                    }
                    {
                        (main.navStatus === "NAV") &&
                        <View style={[styles.container, styles.usageCard]}>
                            <UsageCard />
                        </View>
                    }
                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ecf0f1'
    },
    mapToolContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "column",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    userCard: {
        top: normalize(35),
        right: normalize(20),
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(50/2)
    },
    mapToolCard: {
        bottom: normalize(5),
        alignSelf: "center",
        width: "95%",
        borderRadius: normalize(10),
        flexDirection: "row",
        backgroundColor: "green",
        paddingVertical: normalize(7),
        maxHeight: "100%"
    },
    userCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    mapToolCardContent: {
        width: "100%", 
        flex: 1, 
        flexDirection: "row"
    },
    mileCard: {
        maxHeight: normalize(120), 
        minHeight: normalize(120)
    },
    usageCard: {
        maxHeight: normalize(150), 
        minHeight: normalize(150)
    }
});

export default MainPage;
