import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Alert, Button, TextInput, View, StyleSheet, Linking } from 'react-native';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { userActions } from "../store/user-slice";
import { loginUser, getLikeNumber } from "../store/user-actions";

const LoginUser = props => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUserHandler = (event) => {
        event.preventDefault();

        dispatch(loginUser(username, password));
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titleText}>
                Login
            </Text>

            <Text style={styles.subtitleText}>
                Welcome back!
            </Text>

            <View style={styles.loginBox}>
                <Card>
                    <TextInput
                        value={username}
                        onChangeText={(username) => setUsername(username)}
                        placeholder={'Username'}
                        style={styles.input}
                    />
                </Card>

                <Card>
                    <TextInput
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        placeholder={'Password'}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </Card>

                {/* <Text style={[styles.linkText, styles.normalText]} onPress={() => Linking.openURL(url)}>
                    Forgot your password?
                </Text> */}
            </View>

            <View style={styles.loginButton}>
                <Button
                    title={'Login'}
                    onPress={loginUserHandler}
                />
            </View>

            <Text style={styles.signupText}>
                <Text>
                    Don't have account?&nbsp;
                </Text>
                <Text style={styles.linkText} onPress={() => props.navigation.navigate('Signup')}>
                    Register one
                </Text>
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1'
    },
    input: {
        width: normalize(250),
        height: normalize(40),
        padding: normalize(5)
    },
    loginButton: {
        width: normalize(250),
        height: normalize(40),
        marginHorizontal: normalize(5),
        marginVertical: normalize(5)
    },
    linkText: {
        color: 'black',
        textDecorationLine: "underline"
    },
    signupText: {
        width: normalize(250),
        textAlign: "center",
        marginTop: normalize(20)
    },
    titleText: {
        fontSize: normalize(30),
        textAlign: "center",
        marginBottom: normalize(14)
    },
    subtitleText: {
        fontSize: normalize(18),
        textAlign: "center",
        marginVertical: normalize(8)
    },
    normalText: {
        fontSize: normalize(12),
        textAlign: "right",
        marginEnd: normalize(10)
    },
    loginBox: {
        marginVertical: normalize(20)
    }
});

export default LoginUser;