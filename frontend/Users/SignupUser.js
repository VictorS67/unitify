import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Alert, Button, TextInput, View, StyleSheet, Linking } from 'react-native';

import Card from "../UI/Card";
import { normalize } from "../Tool/FontSize";
import { signupUser } from "../store/user-actions";

const SignupUser = props => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const signupUserHandler = (event) => {
        event.preventDefault();

        // TODO: Register new user
        dispatch(signupUser(username, email, password, passwordAgain))
        .then((result) => {
            console.log(`result: ${result}`)
        })

        // props.navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titleText}>
                Sign Up
            </Text>

            <Text style={styles.subtitleText}>
                Register an Account to start your journey!
            </Text>

            <View style={styles.signupBox}>
                <Card>
                    <TextInput
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        placeholder={'Email'}
                        style={styles.input}
                    />
                </Card>

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

                <Card>
                    <TextInput
                        value={passwordAgain}
                        onChangeText={(passwordAgain) => setPasswordAgain(passwordAgain)}
                        placeholder={'Password Again'}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </Card>
            </View>

            <View style={styles.signupButton}>
                <Button
                    title={'Sign Up'}
                    onPress={signupUserHandler}
                />
            </View>
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
    signupButton: {
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
    signupBox: {
        marginVertical: normalize(20)
    }
});

export default SignupUser;