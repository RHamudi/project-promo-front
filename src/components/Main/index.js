import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

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
                    <View className="flex justify-between">
                        <Text numberOfLines={2} className="text-white font-extrabold text-xl flex-wrap w-40">
                            {item.nome}</Text>
                        <Text className="text-white">
                            <MaterialIcons name="category" size={24} color="white" />
                            {item.categoria == 1 && "Alimentação"}
                            {item.categoria == 2 && "Moda"}
                            {item.categoria == 3 && "Tecnologia"}
                        </Text>
                        <Text className="text-white align-middle">
                            <Ionicons name="location-sharp" size={24} color="white" />Bairro
                        </Text>
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