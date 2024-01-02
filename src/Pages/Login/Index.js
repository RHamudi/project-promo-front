import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { signin } from '../../Redux/LoginSlice';
import { axiosApi } from '../../Services/http-client';
import {useForm, Controller} from 'react-hook-form'

const Login = ({navigation}) => {
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
        <View className="flex-1 justify-center items-center gap-y-2">
            <View className="justify-center">
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
                            <Text nativeID='formEmail' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</Text>
                            <TextInput 
                                aria-aria-labelledby='formEmail'
                                className="py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Digite seu Email'
                                keyboardType='email-address'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            </>
                        )}
                    name='Email'
                />
                {errors.Email && <Text>Digite um E-mail valido</Text>}

                <Controller 
                    control={control}
                    rules={{
                        required: "Digite uma senha"
                    }}
                    render={({
                        field: {onChange, onBlur, value}}) => (
                            <>
                            <Text className="pt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</Text>
                            <TextInput 
                            className="py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Digite sua senha'
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                            </>
                        )}
                    name='Password'
                />
                {errors.Password && <Text>{errors.Password.message}</Text>}
            </View>
            
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </Text>
            </TouchableOpacity>
            
            <Text>Não possui uma conta? </Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text className="text-blue-600">Clique aqui!</Text>
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
