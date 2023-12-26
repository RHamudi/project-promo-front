import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { axiosApi } from "../../Services/http-client";
import {useForm, Controller} from 'react-hook-form';

export default function CreateUser({navigation}){
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()

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
        }
        )
        .catch((err)=> console.log(err))
    }

    return(
        <View className="flex-1 justify-center items-center gap-y-2">
            <Text>Criar usuario</Text>
            <View>
                
                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</Text>
                <Controller 
                    control={control}
                    rules={{
                        required: "Digite um nome",
                    }}
                    render={({
                        field: {onChange, onBlur, value}}) => (
                            <TextInput 
                                className="py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Digite seu nome"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    name="Name"
                />
                {errors.Name && <Text>{errors.Name.message}</Text>}

                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</Text>
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
                                className="py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Digite seu nome"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    name="Email"
                />
                {errors.Email && <Text>{errors.Email.message}</Text>}

                <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</Text>
                <Controller 
                    control={control}
                    rules={{
                        required: true,
                        minLength: 6
                    }}
                    render={({
                        field: {onChange, onBlur, value}}) => (
                            <TextInput 
                                className="py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Digite sua senha"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    name="Password"
                />
                {errors.Password && <Text>{errors.Password.message}</Text>}
            </View>
            
            <Button
                title="Criar"
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    )
}