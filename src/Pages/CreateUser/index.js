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
        <View>
            <Text>Criar usuario</Text>
            <Text>Nome</Text>
            <Controller 
                control={control}
                rules={{
                    required: "Digite um nome",
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
                    required: "Digite um email",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Digite um endereço de email valido"
                    }
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
                    required: true,
                    minLength: 6
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite sua senha"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Password"
            />
            {errors.Password && <Text>{errors.Password.message}</Text>}
            
            <Button
                title="Criar"
                onPress={handleSubmit(onSubmit)}
            />
        </View>
    )
}