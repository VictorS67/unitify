import React, { useState } from "react";
import { Text, Alert, Button, TextInput, View, StyleSheet, Linking } from 'react-native';

// import styles from "./LoginUser.css"
import Card from "../UI/Card";

const LoginUser = props => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUserHandler = (event) => {
        event.preventDefault();

        Alert.alert('Credentials', `${username} + ${password}`);
    }

    const url="https://google.com";

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

                <Text style={[styles.linkText, styles.normalText]} onPress={() => Linking.openURL(url)}>
                    forgot your password?
                </Text>
            </View>

            <View style={styles.loginButton}>
                <Button
                    title={'Login'}
                    onPress={loginUserHandler}
                />
            </View>

            <Text style={styles.signupText}>
                <Text>
                    don't have account?&nbsp;
                </Text>
                <Text style={styles.linkText} onPress={() => Linking.openURL(url)}>
                    register one
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
        width: 300,
        height: 44,
        padding: 5
    },
    loginButton: {
        width: 300,
        height: 44,
        marginHorizontal: 5,
        marginVertical: 5
    },
    linkText: {
        color: 'black',
        textDecorationLine: "underline"
    },
    signupText: {
        width: 300,
        textAlign: "center"
    },
    titleText: {
        fontSize: 32,
        textAlign: "center",
        marginBottom: 15
    },
    subtitleText: {
        fontSize: 20,
        textAlign: "center",
        marginVertical: 8
    },
    normalText: {
        fontSize: 12,
        textAlign: "right",
        marginEnd: 5
    },
    loginBox: {
        marginVertical: 20
    }
});

export default LoginUser;