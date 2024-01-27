import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image } from "react-native";
import CardMain from "../CardMain";


export default function Main({item})
{
    console.log(item)
    return(
        <View className="flex bg-cyan-800 h-40 rounded-lg">
            <View>
                <View className="flex flex-row">
                    <Image
                    className="w-40 h-40 rounded-l-lg"
                    src={item.logoImagem}
                    />
                    <View>
                        <Text numberOfLines={2} className="text-white font-extrabold text-xl flex-wrap w-40">{item.nome}</Text>
                        <Text>{item.categoria}</Text>
                    </View>
                </View>
               
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
        height: 100,
        width: 100,
    },
    title: {
        textAlignVertical: 'center'
    },
    containerTitle: {
        flexDirection: 'row'
    }
  });