import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = () => {
    const [User, SetUser] = useState();
    const [Pass, SetPass] = useState();

    function Authentication(){
        axios({
            method: 'post',
            url: "http://192.168.1.64:5293/api/business/Authentication",
            data: {
                email: User,
                password: Pass
            }
        }).then((response)=> {     
            console.log(response.data)
            AsyncStorage.setItem("Token", response.data.data)
        }).catch((err) => console.log(err))
    }

    return (
        <View style={styles.container}>
            <Text>Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Type here to translate!"
                onChangeText={SetUser}
            />
            <Text>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Type here to translate!"
                onChangeText={SetPass}
            />
            <Button 
                title='Submit'
                onPress={Authentication}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40
    }
  });

export default Login;
