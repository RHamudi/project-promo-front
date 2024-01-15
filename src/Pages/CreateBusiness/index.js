import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import SelectDropdown from "react-native-select-dropdown";
import { useSelector } from "react-redux";
import { useStateLogin } from "../../Redux/LoginSlice";
import { axiosApi } from "../../Services/http-client";
import {useForm, Controller} from 'react-hook-form';

export default function AddBusiness(){
    const [Logo, setLogo] = useState();
    const [Category, setCategory] = useState();
    const [GeoData, setGeoData] = useState();
    const [CoordMark, setCoordMark] = useState();
    const {User} = useSelector(useStateLogin);
    const formData = new FormData();

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        defaultValues: {
            IdUser: User.idUsuario,
            Name: "",
            Description: "",
            Email: "",
            Number: "",
            Site: "",
            Category: "",
            Operation: "",
            Location: ""
        }
    })
    
    const onSubmit = (data) => {
        formData.append("IdUser", User.idUsuario)
        formData.append("Name", data.Name)
        formData.append('Description', data.Description)
        if(Logo)formData.append("Logo", {
            uri: Logo.uri,
            type: 'image/jpeg',
            name: 'Teste'
        })
        formData.append("Email", data.Email)
        formData.append("Number", data.Number)
        formData.append("Site", data.Site)
        formData.append("Category", Category)
        formData.append("Operation", data.Operation)
        formData.append("GeoData", GeoData)
        formData.append("Location", data.Location)

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

    const categories = ["Food", "Fashion", "Technology"]
    
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

            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite o nome da empresa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Name"
            />
            {errors.Name && <Text>{errors.Name.message}</Text>}

            <Text>Description</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite a descrição da empresa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Description"
            />
            {errors.Description && <Text>{errors.Description.message}</Text>}

            
            <Text>Logo</Text>
            <Button title="Selecione uma Imagem" 
            onPress={pickImage}
            />

            <Text>Location</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite um ponto de referencia"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Location"
            />
            {errors.Location && <Text>{errors.Location.message}</Text>}

            <Text>Email</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite o email da sua empresa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Email"
            />
            {errors.Email && <Text>{errors.Email.message}</Text>}

            <Text>Number</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite o numero da sua empresa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Number"
            />
            {errors.Number && <Text>{errors.Number.message}</Text>}

            <Text>Instagram</Text>
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Cole aqui o link do seu instagram ou Site"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Site"
            />
            {errors.Site && <Text>{errors.Site.message}</Text>}

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
            <Controller 
                control={control}
                rules={{
                    required: true
                }}
                render={({
                    field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            placeholder="Digite o orario de operação da sua empresa"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                name="Operation"
            />
            {errors.Operation && <Text>{errors.Operation.message}</Text>}

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
                onPress={handleSubmit(onSubmit)}
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