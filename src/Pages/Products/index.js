import { Image, ScrollView, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

export function Products({route})
{
    const {business} = route.params;
    const {products} = route.params;

    return (
        <>
            <View className="flex-col bg-blue-800 justify-center h-32">
                <View className="flex-row">
                    <Image 
                        className="w-28 h-28 ml-2 rounded-full"
                        src={business.logoImagem}
                    />
                    <View>
                        <Text className="text-white text-xl text-bold font-extrabold">{business.nome}</Text>
                        <Text className="text-white text-base font-medium">Produtos</Text>
                    </View>
                </View>
            </View>
            <View>
                <ScrollView className="h-4/5">
                    {products.map((product, index) => 
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
                </ScrollView>
            </View>
        </>
        
    )
}