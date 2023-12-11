import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { axiosApi } from "../../Services/http-client"
import MapView, { Marker } from "react-native-maps";


export default function Business({route}){
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
 
    if(req) req.map(img => console.log(img))
    
    return(
        <> 
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                src={item.logoImagem}
            />
            <Text>
                {item.nome}
            </Text>
            <Text>
                {item.horarioOperacao}
            </Text>
            <Text>
                {item.descricao}
            </Text>
        </View>
        <View>
            <ScrollView style={styles.scroll} horizontal={true}>
                {req && req.map(img => 
                <Image
                style={styles.cardProduct}
                src={img.imagens}
                />
                )}
            </ScrollView>
            <View>
                <Text>Contatos</Text>
                <Text>{item.contatos.number}</Text>
                <Text>{item.contatos.site}</Text>
                <Text>{item.contatos.email}</Text>
            </View>
            <View style={styles.mapcontainer}>
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
        </View>

        </>
    )
}

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