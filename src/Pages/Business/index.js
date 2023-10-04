import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { axiosApi } from "../../Services/http-client"
import MapView, { Marker } from "react-native-maps";


export default function Business({route}){
    const [req, setReq] = useState([]);
    const {item} = route.params;
    
    useEffect(()=> {
        axiosApi.get(`http://192.168.1.64:5293/api/product/getbyid?idEmpresa=${item.idEmpresa}`).then((response)=> {     
            setReq(response.data.data)
        }).catch((err) => console.log(err))
    }, [])

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
                            <Image
                                style={styles.cardProduct}
                                src={req.length != 0 ? req[0].imagens : ''}
                            />
                            <Image
                                style={styles.cardProduct}
                                src={req.length != 0 ? req[0].imagens : ''}
                            />
                            <Image
                                style={styles.cardProduct}
                                src={req.length != 0 ? req[0].imagens : ''}
                            />
                            <Image
                                style={styles.cardProduct}
                                src={req.length != 0 ? req[0].imagens : ''}
                            />
                            <Image
                                style={styles.cardProduct}
                                src={req.length != 0 ? req[0].imagens : ''}
                            />
                            <Image
                                style={styles.cardProduct}
                                src={req.length != 0 ? req[0].imagens : ''}
                            />
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
                latitude: -12.656993484951188,
                longitude: -38.53441112418043,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            style={styles.map}
            >
                <Marker 
                    coordinate={{
                        latitude: -12.656993484951188,
                        longitude: -38.53441112418043,
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