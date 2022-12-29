import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes,
    Button
  } from "react-native"; 

  function Homebutton(){
    const homebuttonHandler = (event) => {
        // event.preventDefault();

        // Alert.alert('Credentials', `${username} + ${password}`);
        console.log('pressed');
    }
    return(<Button
        title={'HomeButton'}
        onPress={homebuttonHandler}
    />);
  };
  export default Homebutton;
