import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { useStateLogin } from "../../Redux/LoginSlice";
import * as ImagePicker from 'expo-image-picker';
import { axiosApi } from "../../Services/http-client";
import {useForm, Controller} from 'react-hook-form';

export default function CreateProduct(){
    const {User} = useSelector(useStateLogin);
    const [IdBusiness, setIdBusiness] = useState(User.idEmpresa);
    const [Name, setName] = useState();
    const [Description, setDescription] = useState();
    const [Images, setImages] = useState();
    const [Price, setPrice] = useState();
    const formData = new FormData();

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            Name: "",
            Description: "",
            Price: 0    
        }
    })
    const onSubmit = (data) => console.log(data)

    formData.append("IdBusiness", IdBusiness)
    formData.append("Name", Name)
    formData.append("Description", Description)
    if(Images)formData.append("Images", {
        uri: Images.uri,
        type: "image/jpeg",
        name: "testando"
    })
    formData.append("Price", Price)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            includeBase64: false,
            base64: true,
            quality: 1,
        })

        if(!result.canceled){
            setImages(result.assets[0])
        }
    }

    function AddProduct(){
        axiosApi({
            method: "post",
            url: "product/insert",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((res)=> console.log(res)).catch((err)=> console.log(err))
    }

    return (
        <View >
            <Text>Digite o nome do produto</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite o nome do produto"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Name"
            />
            {errors.Name && <Text>{errors.Name.message}</Text>}
            <Text>Digite a descrição do produto</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite a descrição do produto"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Description"
            />
            {errors.Description && <Text>{errors.Description.message}</Text>}
            <Text>Selecione sua imagem</Text>
            <Button 
                title="Selecione a imagem"
                onPress={pickImage}
            />
            <Text>Digite o preço</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite o preco do produto"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Price"
            />
            {errors.Price && <Text>{errors.Price.message}</Text>}
            <Button 
            title="Submit"
            onPress={AddProduct}
            />
        </View>
    )
}