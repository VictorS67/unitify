import React, { useState, useEffect } from "react";
import { ScrollView , View, StyleSheet, Keyboard, useWindowDimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Card from "../UI/Card";
import StatusBar from "../UI/StatusBar";
import Map from "../Map/Map";
import TripCard from "./TripCard";
import UsageCard from "./UsageCard";
import MileCard from "./MileCard";
import { normalize } from "../Tool/FontSize";


const MainPage = props => {

    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(50);
    const [locationY, setLocationY] = useState(null);
    const [pageY, setPageY] = useState(null);
    const [locationYOffest, setLocationYOffest] = useState(0);
    const [pageYOffest, setPageYOffest] = useState(0);


    const { height, width, scale, fontScale } = useWindowDimensions();

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true);
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const onTouchMove = (e) => {

        // console.log("SCROLL");
        // console.log('touch info:', e.nativeEvent);

        if (locationY !== null) {
            setLocationYOffest(locationY - e.nativeEvent.locationY);
        }

        if (pageY !== null) {
            setPageYOffest(pageY - e.nativeEvent.pageY);
        }

        setLocationY(e.nativeEvent.locationY);
        setPageY(e.nativeEvent.pageY);

        // setScrollOffset(currentOffset);
        setScrollHeight(Math.max(Math.min(scrollHeight + pageYOffest / height * 100, 50), 17));
    }

    const onTouchEnd = (e) => {
        setLocationYOffest(0);
        setPageYOffest(0);
        setLocationY(null);
        setPageY(null);
    }

    return (
        <View style={styles.container}>
            <View style={[{flexGrow: 1}]}>
                <Map />
                <Card style={styles.userCard} childrenStyle={styles.userCardContent}>
                    <FontAwesome5 name="user" size={normalize(26)} color="black" />
                </Card>
            </View>
            <ScrollView 
                style={[(keyboardStatus === false) ? {maxHeight: `${scrollHeight}%`} : {maxHeight: "30%"}]}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                scrollEnabled={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={[styles.container, {flex: 1}]}>
                    <TripCard distance={0.2} duration={320} speed={0.3} pause={3} />
                </View>
                {
                    keyboardStatus === false &&
                    <View style={[styles.container, {flex: 2}]}>
                        <MileCard />
                        <UsageCard />
                    </View>
                }
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ecf0f1'
    },
    userCard: {
        alignSelf: "flex-end",
        right: normalize(20),
        top: normalize(35),
        width: normalize(50),
        height: normalize(50),
        borderRadius: normalize(50/2)
    },
    userCardContent: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default MainPage;
