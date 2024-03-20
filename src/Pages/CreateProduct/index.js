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
    const [Images, setImages] = useState();
    const formData = new FormData();

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            Name: "",
            Description: "",
            Price: ""    
        }
    })
    const onSubmit = (data) => {
        
        formData.append("IdBusiness", IdBusiness)
        formData.append("Name", data.Name)
        formData.append("Description", data.Description)
        if(Images)formData.append("Images", {
            uri: Images.uri,
            type: "image/jpeg",
            name: "testando"
        })
        formData.append("Price", data.Price)

        axiosApi({
            method: "post",
            url: "product/insert",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((res)=> {
            
        })
        .catch((err)=> console.log(err))
    }

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

    return (
        <View className="flex-1 justify-center items-center gap-y-2 bg-blue-950">
            <View className="justify-center">
                    <Text className="font-bold text-4xl text-white text-center pb-14">Adicione seu produto</Text>
                
                <Text  className="font-bold text-x text-white text-center pb-3"> Digite o nome do produto</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            message: "Digite um nome valido"
                        }
                    }}
                    render={({
                        field: {onChange, onBlur, value}}) => (
                            <TextInput 
                                placeholder="Digite o nome do produto"
                                className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    name="Name"
                />
                {errors.Name && <Text>{errors.Name.message}</Text>}

                <Text className="font-bold text-x text-white text-center pb-3">Digite a descrição do produto</Text>
                <Controller 
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            message: "Digite uma descrição valida"
                        }
                    }}
                    render={({
                        field: {onChange, onBlur, value}}) => (
                            <TextInput 
                                placeholder="Digite a descrição do produto"
                                className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    name="Description"
                />
                {errors.Description && <Text>{errors.Description.message}</Text>}
                <Text className="font-bold text-x text-white text-center pb-3">Selecione sua imagem</Text>
                <Button 
                    title="Selecione a imagem"
                    onPress={pickImage}
                />
                <Text className="font-bold text-x text-white text-center pb-3">Digite o preço</Text>
                <Controller 
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            message: "Digite um preço"
                        }
                    }}
                    render={({
                        field: {onChange, onBlur, value}}) => (
                            <TextInput 
                                placeholder="Digite o preco do produto"
                                className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
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
                onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    )
}