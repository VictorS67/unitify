import React, { useState } from "react";
import { Pressable, SafeAreaView, TouchableOpacity, Text} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
// import { userActions } from "../store/user-slice";
import { getLatestUserStatus } from "../store/user-actions";


const LikeButton = (props) => {
    const dispatch = useDispatch()

    // const likeduser = dispatch(getLatestUserStatus(props.likeduserid));

    // const user = useSelector((state) =>state.user);
    // console.log('called Likebutton');
    // console.log(likeduser.userId === props.likeduserid);

    const likenumber = 0;
    // if(!(likeduser.whoLikedMe === undefined)){
    //     likenumber = likeduser.whoLikedMe.length;
    // }
    
    const [liked, setLiked] = useState(props.liked);
    const [counter, setCounter] = useState(likenumber);
    
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