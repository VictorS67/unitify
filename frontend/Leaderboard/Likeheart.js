import React, { useState } from "react";
import { Pressable, SafeAreaView, TouchableOpacity, Text} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [counter, setCounter] = useState(100);
    const pressHandler = () =>{
        setLiked((isLiked) => !isLiked);
        if(liked){
            setCounter((counter) => counter-1);
        }else{
            setCounter((counter) => counter+1);
        }
    console.log(counter);
    }
    return (
        <SafeAreaView>
            <Pressable onPress={pressHandler}>
                <MaterialCommunityIcons
                    name={liked ? "heart" : "heart-outline"}
                    size={32}
                    color={liked ? "red" : "black"}
                />
            </Pressable>
            <Text>{counter.toString()}</Text>
        </SafeAreaView>
        
    );
};
export default LikeButton;