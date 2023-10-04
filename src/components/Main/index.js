import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image } from "react-native";
import CardMain from "../CardMain";


export default function Main({item})
{
    return(
        <View style={styles.container}>
            <View>
                <View style={styles.containerTitle}>
                    <Image 
                    style={styles.image}
                    src={item.logoImagem}
                    />
                    <Text style={styles.title}>{item.nome}</Text>
                </View>
                <CardMain item={item}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#666666',
        marginVertical: 5
    },
    cards: {
    },
    image: {
        borderRadius: 20,
        height: 40,
        width: 40,
    },
    title: {
        textAlignVertical: 'center'
    },
    containerTitle: {
        flexDirection: 'row'
    }
  });