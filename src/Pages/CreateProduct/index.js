import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { useStateLogin } from "../../Redux/LoginSlice";
import * as ImagePicker from 'expo-image-picker';
import { axiosApi } from "../../Services/http-client";

export default function CreateProduct(){
    const {User} = useSelector(useStateLogin);
    const [IdBusiness, setIdBusiness] = useState(User.idEmpresa);
    const [Name, setName] = useState();
    const [Description, setDescription] = useState();
    const [Images, setImages] = useState();
    const [Price, setPrice] = useState();
    const formData = new FormData();

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

    console.log(formData)

    return (
        <View >
            <Text>Digite o nome do produto</Text>
            <TextInput 
            placeholder="Name"
            onChangeText={setName}
            />
            <Text>Digite a descrição do produto</Text>
            <TextInput 
            placeholder="Description"
            onChangeText={setDescription}
            />
            <Text>Selecione sua imagem</Text>
            <Button 
            title="Selecione a imagem"
            onPress={pickImage}
            />
            <Text>Digite o preço</Text>
            <TextInput 
            placeholder="Price"
            onChangeText={setPrice}
            />

            <Button 
            title="Submit"
            onPress={AddProduct}
            />
        </View>
    )
}