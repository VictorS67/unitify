import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Worker} from "Worker"

export default function App() {
  let [user, sUser] = useState(undefined);

  useEffect(() => {
    // Run! Like go get some data from an API.
    let checkLoggedInResponse = Worker.checkIfUserLoggedin();
    sUser(checkLoggedInResponse['user']);
  }, []);
  return (
    <View style={styles.container}>
      {user !== undefined && <Text>loggedin</Text>}
      {user === undefined && <Text>Not loggedin</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
