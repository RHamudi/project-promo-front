import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { axiosApi } from "../../Services/http-client";

export default function CreateUser(){
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()

    function CreateUser({navigation}){
        axiosApi({
            method: 'POST',
            url: "user/insert",
            data: {
                Name: Name,
                Email: Email,
                Password: Password,
                IdBusiness: ""
            }
        }).then(()=> navigation.navigate("Login"))
        .catch((err)=> console.log(err))
    }

    return(
        <View>
            <Text>Criar usuario</Text>
            <Text>Nome</Text>
            <TextInput 
            placeholder="Digite seu nome"
            onChangeText={setName}
            />

            <Text>Email</Text>
            <TextInput 
            placeholder="Digite seu Email"
            onChangeText={setEmail}
            />

            <Text>Senha</Text>
            <TextInput 
            placeholder="Digite sua senha"
            onChangeText={setPassword}
            />

            <Button
            title="Criar"
            onPress={CreateUser}
            />
        </View>
    )
}