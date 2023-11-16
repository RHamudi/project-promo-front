import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signin, useStateLogin } from '../../Redux/LoginSlice';

const Login = () => {
    const [User, SetUser] = useState();
    const [Pass, SetPass] = useState();
    const Dispach = useDispatch();
    const {Token} = useSelector(useStateLogin)
    const {AuthenticatedIs} = useSelector(useStateLogin)

    function Authentication(){
        axios({
            method: 'post',
            url: "http://192.168.1.64:5293/api/business/Authentication",
            data: {
                email: User,
                password: Pass
            }
        }).then((response)=> {
           Dispach(signin(response.data))
        }).catch((err) => console.log(err))
    }

    return (
        <View style={styles.container}>
            <Text>{AuthenticatedIs ? "sexo" : "erro"}</Text>
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
