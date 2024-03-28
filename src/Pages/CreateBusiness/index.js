import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import SelectDropdown from "react-native-select-dropdown";
import { useSelector } from "react-redux";
import { useStateLogin } from "../../Redux/LoginSlice";
import { axiosApi } from "../../Services/http-client";
import {useForm, Controller} from 'react-hook-form';

export default function AddBusiness({navigation}){
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
            navigation.navigate("Account", {refresh: true})
        }).catch((err)=> console.log(err))
    }
    

    return (
    <ScrollView>
        <View className="flex-1 justify-center items-center gap-y-2 bg-blue-950">
            <View className="justify-center">

                    <Text className="font-bold text-4xl text-white text-center p-4">
                       Criar empresa
                    </Text>

                    <Text  className="font-bold text-x text-white text-center pb-3"> Digite o nome da empresa</Text>
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
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                    placeholder="Digite o nome da empresa"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Name"
                    />
                    {errors.Name && <Text>{errors.Name.message}</Text>}

                    <Text  className="font-bold text-x text-white text-center pb-3">Digite a descrição da empresa</Text>
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
                                    placeholder="Digite a descrição da empresa"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Description"
                    />
                    {errors.Description && <Text>{errors.Description.message}</Text>}

                    
                    <Text  className="font-bold text-x text-white text-center pb-3"> Selecione a imagem da empresa</Text>
                    <Button title="Selecione uma Imagem" 
                    onPress={pickImage}
                    />

                    <Text>Location</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                message: "Digite uma informação valida"
                            }
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                    placeholder="Digite um ponto de referencia"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Location"
                    />
                    {errors.Location && <Text>{errors.Location.message}</Text>}

                    <Text  className="font-bold text-x text-white text-center pb-3"> Digite o e-mail da empresa</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Digite um endereço de email valido"
                            }
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                    placeholder="Digite o email da sua empresa"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Email"
                    />
                    {errors.Email && <Text>{errors.Email.message}</Text>}

                    <Text  className="font-bold text-x text-white text-center pb-3"> Digite o numero da empresa</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                message: "Digite um numero valido"
                            }
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                    placeholder="Digite o numero da sua empresa"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Number"
                    />
                    {errors.Number && <Text>{errors.Number.message}</Text>}

                    <Text  className="font-bold text-x text-white text-center pb-3">Cole o link do instagram</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                message: "Cole aqui um link valido"
                            }
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                    placeholder="Cole aqui o link do seu instagram ou Site"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Site"
                    />
                    {errors.Site && <Text>{errors.Site.message}</Text>}

                    <Text  className="font-bold text-x text-white text-center pb-3">Selecione a categoria da empresa</Text>
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

                    <Text  className="font-bold text-x text-white text-center pb-3"> Digite o horario de operação da empresa</Text>
                    <Controller 
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                message: "Digite o orario de operação valido"
                            }
                        }}
                        render={({
                            field: {onChange, onBlur, value}}) => (
                                <TextInput 
                                    placeholder="Digite o orario de operação da sua empresa"
                                    className="border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mb-3 px-6"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        name="Operation"
                    />
                    {errors.Operation && <Text>{errors.Operation.message}</Text>}

                    <Text  className="font-bold text-x text-white text-center pb-3"> Selecione a localização da empresa</Text>
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
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 200,
        width: 200
    }
})