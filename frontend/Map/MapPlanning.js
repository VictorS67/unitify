import React, { useRef, useEffect, useImperativeHandle, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Ionicons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import ProgressBar from "../UI/ProgressBar";
import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { getLocation, GOOGLE_MAP_API } from "../Utils/GoogleMap";
import { updateDirection } from "../store/map-actions";
import { mapActions } from "../store/map-slice";
import { mainActions } from "../store/main-slice";


const MapPlanning = (props) => {

    const dispatch = useDispatch();
    const map = useSelector((state) => state.map);
    const main = useSelector((state) => state.main);

    const [index, sIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            sIndex((index + 1) % (10 + 1))
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [index]);

    return (
        <React.Fragment>
            <View style={{
                ...StyleSheet.absoluteFillObject,
                width: "100%",
                alignItems: "flex-end",
                justifyContent: "space-between"
            }}>
                <View style={{
                    flexDirection: "row",
                    width: "100%",
                    top: normalize(-35),
                    justifyContent: "space-between"
                }}>
                    <Card style={{
                        top: normalize(15),
                        width: normalize(140),
                        height: normalize(30),
                        borderRadius: normalize(10),
                        zIndex: 3, // works on ios
                        elevation: 3, // works on android
                    }} childrenStyle={{
                        flex: 1,
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity 
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                borderRadius: normalize(5),
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: normalize(3)
                            }}
                        > 
                            <Text style={{ fontSize: normalize(14) }}>
                                Change Transit Type
                            </Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{
                        top: normalize(5),
                        width: normalize(50),
                        height: normalize(50),
                        borderRadius: normalize(50/2),
                        zIndex: 3, // works on ios
                        elevation: 3, // works on android
                    }} childrenStyle={{
                        flex: 1,
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity 
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                borderRadius: normalize(5),
                                alignItems: "center",
                                justifyContent: "center",
                                marginHorizontal: normalize(3)
                            }}
                        > 
                            <Ionicons name="locate" size={normalize(24)} color="black" />
                        </TouchableOpacity>
                    </Card>
                </View>
            </View>

            <View style={[{
                width: "100%",
                flex: 1,
                paddingHorizontal: normalize(10),
                paddingTop: normalize(20)
            }, props.style]}>

                <View style={{
                    flexDirection: "row", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingBottom: normalize(10)
                }}>
                    <View style={{ flexDirection: "row" }}>
                        <FontAwesome5 name="subway" size={normalize(20)} color="black" />
                        <Text style={{ fontSize: normalize(16), paddingHorizontal: normalize(10) }}>
                            Taking Shuttle Bus
                        </Text>
                    </View>
                </View>


                <ProgressBar 
                    step={index} 
                    steps={10} 
                    style={
                        {
                            progressBackColor: "transparent",
                            height: 10,
                            borderRadius: 3
                        }
                    }
                    progressChildren={[
                        {
                            progressColor: "orange",
                            steps: 3
                        },
                        {
                            progressColor: "blue",
                            steps: 7
                        }
                    ]}
                />

                <View style={{
                    flexDirection: "row", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Text>
                        Start at 20:30pm
                    </Text>
                    <Text>
                        <MaterialCommunityIcons name="molecule-co2" size={normalize(24)} color="black" style={{flexGrow: 1}}/>
                        <View style={{flexDirection: "row", flex: 1}}>
                            <MaterialCommunityIcons name="arrow-top-right" size={normalize(12)} color="black" />
                            <Text style={{
                                textAlign: "center"
                            }}>
                                252 g/km
                            </Text>
                        </View>
                    </Text>
                    <Text>
                        <MaterialCommunityIcons name="fire" size={normalize(22)} color="black" style={{flexGrow: 1}} />
                        <View style={{flexDirection: "row", flex: 1}}>
                            <Text style={{
                                textAlign: "center"
                            }}>
                                91 cal
                            </Text>
                        </View>
                    </Text>
                </View>
            </View>
        </React.Fragment>

    );
}

const styles = StyleSheet.create({

});

export default MapPlanning;