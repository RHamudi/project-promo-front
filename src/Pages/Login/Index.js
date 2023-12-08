import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signin, useStateLogin } from '../../Redux/LoginSlice';
import { axiosApi } from '../../Services/http-client';

const Login = ({navigation}) => {
    const [User, SetUser] = useState();
    const [Pass, SetPass] = useState();
    const Dispach = useDispatch();
    // const {Token} = useSelector(useStateLogin)
   // const {AuthenticatedIs} = useSelector(useStateLogin)

    function Authentication(){
        axiosApi({
            method: 'post',
            url: "user/Authentication",
            data: {
                email: User,
                password: Pass
            }
        }).then((response)=> {
           Dispach(signin(response.data))
        }).catch((err) => console.log(err))
    }

    function onPress(){
        navigation.navigate("AddUser")
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
            <Text>Não possui uma conta? </Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text>Clique aqui!</Text>
            </TouchableOpacity>
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
