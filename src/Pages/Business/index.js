import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableHighlight } from "react-native";
import { axiosApi } from "../../Services/http-client"
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from "react-native-maps";


export default function Business({route, navigation}){
    const [req, setReq] = useState();
    const {item} = route.params;
    let LatLong = item.geoLocalizacao.split(",");

    let lat = Number(LatLong[0]);
    let long = Number(LatLong[1]);

    useEffect(()=> {
        axiosApi.get(`product/getbyid?idEmpresa=${item.idEmpresa}`).then((response)=> {     
            setReq(response.data.data)
        }).catch((err) => console.log(err))
    }, [])
    
    return(
        <> 
        <View className="flex-col bg-blue-800 items-center h-28">
            <Image 
                className="w-28 h-28 rounded-full absolute top-14"
                
                src={item.logoImagem}
            />
        </View>
        <View>
            <View className="mt-14">
                <Text className="text-center font-extrabold text-xl text-blue-700">{item.nome}</Text>
                <View className="flex flex-row justify-around">
                    <TouchableHighlight onPress={()=> navigation.navigate("Products", {business: item, products: req})}>
                        <Text className="text-center font-extrabold text-xl my-5">
                                Produtos
                            </Text>
                    </TouchableHighlight>
                    <Text className="text-center font-extrabold text-xl my-5">|</Text>
                    <TouchableHighlight onPress={() => navigation.navigate("About", {business: item})}>
                        <Text className="text-center font-extrabold text-xl my-5">Sobre</Text>
                    </TouchableHighlight>
                </View>
            </View>
            
            {req && req.map((product, index) => 
                <View key={index} className="flex bg-cyan-800 h-36 m-2 rounded-lg">
                        <View className="flex flex-row">
                            <Image
                            className="w-36 h-36 rounded-l-lg"
                            src={product.imagens}
                            />
                            <View className="flex justify-between">
                                <Text numberOfLines={2} className="text-white font-extrabold text-xl flex-wrap w-40 p-2">
                                    {product.nome}</Text>
                                <Text className="text-white ml-2">
                                    {product.descricao}
                                </Text>
                                <Text className="text-white align-middle">
                                <FontAwesome name="dollar" size={24} color="white" />{product.preco}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
        </View>

        </>
    )
}
/*<View style={styles.mapcontainer}>
                <MapView
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                style={styles.map}
                >
                    <Marker 
                        coordinate={{
                            latitude: lat,
                            longitude: long,
                        }}
                    />
                </MapView>
            </View>
            */
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'red',
        flexDirection: 'colum'
    },
    cards: {
    },
    cardProduct: {
        backgroundColor: 'white',
        height: 120,
        width: 120,
        borderRadius: 6,
        margin: 10
    },
    logo: {
        justifyContent: 'center',
        borderRadius: 50,
        width: 100,
        height: 100
    },
    scroll: {
        
    },  
    containerProducts: {
        flexDirection: 'row',
    },
    products: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    mapcontainer: {
        width: 200,
        height: 200
    },
    map: {
        flex: 1,
        width: '100%'
    }
  });