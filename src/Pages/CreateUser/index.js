import { useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { axiosApi } from "../../Services/http-client";
import {useForm, Controller} from 'react-hook-form';
import { ALERT_TYPE, Toast, Dialog } from "react-native-alert-notification";

export default function CreateUser({navigation}){

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            Name: "",
            Email: "",
            Password: "",
            IdBusiness: ""
        }
    })

    const onSubmit = (data) => {
        axiosApi({
            method: 'POST',
            url: "user/insert",
            data: {
                Name: data.Name,
                Email: data.Email,
                Password: data.Password,
                IdBusiness: ""
            }
        }).then((res)=> {
            navigation.navigate("Login")
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: "Por favor Verifique seu email!",
                textBody: "Enviamos um link para o seu email, por favor confirme sua conta clicando no link.",
                button: 'Fechar'
            })
        }
        )
        .catch((err)=> console.log(err))
    }

    return(
        <View className="flex-1 justify-center items-center gap-y-2 bg-blue-950">
            <Text 
                className="font-bold text-4xl text-white text-center pb-6">
                MyCompany.
            </Text>

            <Text
                className="font-bold text-x text-white text-center pb-3"
            >Criar usuario</Text>
            <View className="gap-y-2">
                <View>
                    <Text className="block mb-2 text-sm font-medium text-gray-900 text-white">Nome</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: "Digite um nome",
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                    placeholderTextColor="#ffff"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 px-6"
                                    placeholder="Digite seu nome"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Name"
                    />
                    {errors.Name && <Text className="text-red-600">{errors.Name.message}</Text>}
                </View>

                <View>
                    <Text className="block mb-2 text-sm font-medium text-gray-900 text-white">Email</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: "Digite um email",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Digite um endereço de email valido"
                            }
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    placeholderTextColor="#ffff"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 w-72 px-6" 
                                    placeholder="Digite seu nome"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Email"
                    />
                    {errors.Email && <Text className="text-red-600">{errors.Email.message}</Text>}
                </View>
                
                <View>
                    <Text className="block mb-2 text-sm font-medium text-gray-900 text-white">Senha</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: true,
                            minLength: 6
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                    placeholderTextColor="#ffff"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 px-6"
                                    placeholder="Digite sua senha"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Password"
                    />
                    {errors.Password && <Text className="text-red-600">Digite uma senha</Text>}
                </View>
            </View>
            
            <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Text className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                    rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Criar usuario
                    </Text>
            </TouchableOpacity>
        </View>
    )
}