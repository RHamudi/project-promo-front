import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import SelectDropdown from "react-native-select-dropdown";
import { useSelector } from "react-redux";
import { useStateLogin } from "../../Redux/LoginSlice";
import { axiosApi } from "../../Services/http-client";

export default function AddBusiness(){
    const [Name, setName] = useState();
    const [Description, setDescription] = useState();
    const [Logo, setLogo] = useState();
    const [Location, setLocation] = useState();
    const [Email, setEmail] = useState();
    const [Number, setNumber] = useState();
    const [Site, setSite] = useState();
    const [Category, setCategory] = useState();
    const [Operation, setOperation] = useState();
    const [GeoData, setGeoData] = useState();
    const [CoordMark, setCoordMark] = useState();
    const {User} = useSelector(useStateLogin);
    const formData = new FormData();

    const dataRequest = {
        IdUser: User.idUsuario,
        Name: Name,
        Description: Description,
        Logo: Logo,
        Location: Location,
        Email: Email,
        Number: Number,
        Site: Site,
        Category: Category,
        Operation: Operation,
        GeoData: GeoData 
    }
    formData.append("IdUser", User.idUsuario)
    formData.append("Name", "Testando arouba")
    formData.append('Description', "Essa é uma descricao foda")
    if(Logo)formData.append("Logo", {
        uri: Logo.uri,
        type: 'image/jpeg',
        name: 'Teste'
    })
    formData.append("Email", "emai@gmail.com")
    formData.append("Number", "(81) 2923-3948")
    formData.append("Site", "hhtps.:sdkasdj")
    formData.append("Category", 2)
    formData.append("Operation", "de la ate aqui aqi ate la")
    formData.append("GeoData", GeoData)
    formData.append("Location", "proximo dali ali aq")

    const categories = ["Food", "Fashion", "Technology"]
    tas

    const handleMapPress = (event) => {
        const {coordinate} = event.nativeEvent;
        setCoordMark(coordinate);
        setGeoData(`${coordinate.latitude}, ${coordinate.longitude}`)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            includeBase64: false,
            base64: true,
            quality: 1,

            
        })

        if(!result.canceled){
            setLogo(result.assets[0])
        }
    }
    

    function AddBusiness(){
        axiosApi({
            method: "post",
            url: "business/insert",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        }).then((res) => {
            console.log(res)
        }).catch((err)=> console.log(err))
    }
    

    return (
        <View>
            <Text>
                pagina para criar empresa
            </Text>

            <Text>Nome</Text>
            <TextInput 
            placeholder="Digite seu nome"
            onChangeText={setName}
        
            />

            <Text>Description</Text>
            <TextInput 
            placeholder="Digite sua descrição"
            onChangeText={setDescription}
            />

            
            <Text>Logo</Text>
            <Button title="Selecione uma Imagem" onPress={pickImage}/>

            <Text>Location</Text>
            <TextInput 
            placeholder="Digite seu nome"
            onChangeText={setLocation}
            />

            <Text>Email</Text>
            <TextInput 
            placeholder="Digite seu nome"
            onChangeText={setEmail}
            />

            <Text>Number</Text>
            <TextInput 
            placeholder="Digite seu nome"
            onChangeText={setNumber}
            />

            <Text>Instagram</Text>
            <TextInput 
            placeholder="Digite seu nome"
            onChangeText={setSite}
            />

            <Text>Category</Text>
            <SelectDropdown 
                data={categories}
                onSelect={(selectedItem, index) => {
                    setCategory(index+1)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />

            <Text>Operation</Text>
            <TextInput 
            placeholder="Digite seu nome"
            onChangeText={setOperation}
            />

            <Text>GeoData</Text>
            <MapView
            style={styles.map}
            onPress={handleMapPress}
            region={"urbis 1"}
            initialRegion={{
                latitude: -12.672756378682344,
                longitude: -38.54205376995294,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }
            }
            >
                {CoordMark && <Marker coordinate={CoordMark} />}
            </MapView>
            <Button 
            title="Submit"
            onPress={AddBusiness}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 200,
        width: 200
    }
})