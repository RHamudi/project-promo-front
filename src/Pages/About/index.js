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
                    paddingTop: 100,
                    borderBottomColor: "rgb(21 94 117)",
                    borderBottomWidth: 10,
                    borderBottomWidth: 3,
                    marginHorizontal: 10
                }}
                />
        </>
    )
}