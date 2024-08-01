import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import axios from "axios";
import { axiosApi } from '../../Services/http-client';

export default function BusinessLocation({route ,navigation}) {
    const GOOGLE_API_KEY = "AIzaSyCGfJLzUwsnXWl_kbscmEHqfYIPtfwklVQ";
    const formData = new FormData();
    const [GeoData, setGeoData] = useState();
    const {dadosBusiness, idUsuario, Category, Logo} = route.params;


    const handleAddressSelect = (dados, details) => {
        // Use the place_id from the selected place to get the coordinates
        const placeId = dados.place_id;

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`)
          .then(response => {
            console.log(response.data)
            if (response.data.results.length > 0) {
              const location = `${response.data.results[0].geometry.location.lat}, ${response.data.results[0].geometry.location.lng}`;
              setGeoData(location);
            }
          })
          .catch(error => {
            console.error('Error getting coordinates: ', error);
          });
      };

      const Submit = () => {
        formData.append("IdUser", idUsuario)
        formData.append("Name", dadosBusiness.Name)
        formData.append('Description', dadosBusiness.Description)
        if(Logo)formData.append("Logo", {
            uri: Logo.uri,
            type: 'image/jpeg',
            name: 'Teste'
        })
        formData.append("Email", dadosBusiness.Email)
        formData.append("Number", dadosBusiness.Number)
        formData.append("Site", dadosBusiness.Site)
        formData.append("Category", Category)
        formData.append("Operation", dadosBusiness.Operation)
        formData.append("GeoData", GeoData)
        formData.append("Location", dadosBusiness.Location)

        axiosApi({
            method: "post",
            url: "business/insert",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            navigation.navigate("Account", {refresh: true})
        }).catch((err)=> console.log(err))
    }

    return (
        <View style={{ flex: 1 }}>
            <GooglePlacesAutocomplete
                    placeholder="Digite um endereço"
                    onPress={handleAddressSelect}
                    query={{
                    key: GOOGLE_API_KEY,
                    language: 'pt-BR',
                    }}
                    fetchDetails
                    enablePoweredByContainer={false}
                    styles={{
                    textInputContainer: {
                        width: '100%',
                    },
                    textInput: {
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    }}
                />
                <Button 
                        title="Submit"
                        onPress={Submit}
                    />
        </View>
    )
}