import { Image, StyleSheet, Text, View } from "react-native";


export function About({route})
{
    const {business} = route.params;

    return (
        <>
            <View className="flex-col items-center h-20">
                <Image 
                    className="w-40 h-40 rounded-full"
                    
                    src={business.logoImagem}
                />
                <Text>{business.nome}</Text>
                
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
                />
        </>
    )
}