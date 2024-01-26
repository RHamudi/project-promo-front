import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { signin } from '../../Redux/LoginSlice';
import { axiosApi } from '../../Services/http-client';
import {useForm, Controller} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Notifications } from '../../Hooks';
import { ALERT_TYPE } from 'react-native-alert-notification';

const Login = ({navigation}) => {
    const Dispach = useDispatch();

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
    
    function onPress(){
        navigation.navigate("AddUser")
    }

    return (
        <View className="flex-1 justify-center items-center gap-y-2 bg-blue-950">
            <View className="justify-center">
                <Text 
                    className="font-bold text-4xl text-white text-center pb-14">
                    MyCompany.
                </Text>
                <Text
                    className="font-bold text-x text-white text-center pb-3"
                >Login</Text>

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
                            <>
                            {//<Text nativeID='formEmail' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</Text>
                            }          
                            <TextInput 
                                aria-aria-labelledby='formEmail'
                                placeholderTextColor="#ffff"
                                className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                placeholder='Digite seu E-mail'
                                keyboardType='email-address'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            </>
                        )}
                    name='Email'
                />
                {errors.Email && <Text className="text-white">Digite um E-mail valido</Text>}

                <Controller 
                    control={control}
                    rules={{
                        required: "Digite uma senha"
                    }}
                    render={({
                        field: {onChange, onBlur, value}}) => (
                            <>
                            <TextInput 
                                placeholderTextColor="#ffff"
                                className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 w-72 px-6"                                placeholder='Digite sua senha'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            </>
                        )}
                    name='Password'
                />
                {errors.Password && <Text className="text-white">{errors.Password.message}</Text>}
            </View>
            
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Entrar
                    </Text>
            </TouchableOpacity>
            
            <Text className="text-white">Não possui uma conta? </Text>
            <TouchableOpacity onPress={onPress}>
                <Text className="text-blue-600">Clique aqui!</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
