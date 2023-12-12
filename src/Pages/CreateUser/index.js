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

    function CreateUser(){
        axiosApi({
            method: 'POST',
            url: "user/insert",
            data: {
                Name: Name,
                Email: Email,
                Password: Password,
                IdBusiness: ""
            }
        }).then((res)=> {
            console.log(res.data)
            navigation.navigate("Login")
        }
        )
        .catch((err)=> console.log(err))
    }

    return(
        <View>
            <Text>Criar usuario</Text>
            <Text>Nome</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite seu nome"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Name"
            />
            {errors.Name && <Text>{errors.Name.message}</Text>}

            <Text>Email</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite seu nome"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Email"
            />
            {errors.Email && <Text>{errors.Email.message}</Text>}

            <Text>Senha</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite seu nome"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Senha"
            />
            {errors.Senha && <Text>{errors.Senha.message}</Text>}

            <Button
            title="Criar"
            onPress={CreateUser}
            />
        </View>
    )
}