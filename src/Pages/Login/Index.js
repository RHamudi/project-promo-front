import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signin } from '../../Redux/LoginSlice';
import { axiosApi } from '../../Services/http-client';
import {useForm, Controller} from 'react-hook-form'

const Login = ({navigation}) => {
    const [User, SetUser] = useState();
    const [Pass, SetPass] = useState();
    const Dispach = useDispatch();
    // const {Token} = useSelector(useStateLogin)
   // const {AuthenticatedIs} = useSelector(useStateLogin)
   const {
    control,
    handleSubmit,
    formState: {errors},
   } = useForm({
    defaultValues: {
        Email: "",
        Password: ""
    }
   })
   const onSubmit = (data) => {
        axiosApi({
            method: 'post',
            url: "user/Authentication",
            data: {
                email: data.Email,
                password: data.Password
            }
        }).then((response)=> {
            Dispach(signin(response.data))
        }).catch((err) => console.log(err))
   }
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
            <Controller 
                control={control}
                rules={{
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Digite um endereço de email valido"
                    }
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder='Digite seu Email'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name='Email'
            />
            {errors.Email && <Text>{errors.Email.message}</Text>}
            <Controller 
                control={control}
                rules={{
                    required: "Digite uma senha"
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder='Digite sua senha'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name='Password'
            />
            {errors.Password && <Text>{errors.Password.message}</Text>}
            <Button 
                title='submit'
                onPress={handleSubmit(onSubmit)}
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
