import {React, useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import { axiosApi } from '../../Services/http-client';

const CardMain = ({item}) => {
    const [req, setReq] = useState([]);

    useEffect(()=> {
        axiosApi.get(`http://192.168.1.64:5293/api/product/getbyid?idEmpresa=${item.idEmpresa}`).then((response)=> {     
            setReq(response.data.data)
        }).catch((err) => console.log(err))
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll} horizontal={true}>
                <View style={styles.itens}>
                    {req.map((product, index)=> (
                        <View key={index} style={styles.containerProduct}>
                            <View style={styles.cardProduct}>
                                <Image
                                style={styles.cardProduct}
                                src={product.imagens}
                                />
                            </View>
                            <Text style={styles.text}>{product.nome}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 170,
    },
    text: {
        textAlign: 'center'
    },
    scroll: {
        margin: 15,
    },
    itens: {
        flexDirection: 'row',
        gap: 10
    },
    containerProduct: {
        
      },
    cardProduct: {
        backgroundColor: 'white',
        height: 120,
        width: 120,
        borderRadius: 6
    }

})

export default CardMain;
