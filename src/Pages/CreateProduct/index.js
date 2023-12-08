import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function CreateProduct(){
    const [Name, setName] = useState();
    const [Description, setDescription] = useState();
    const [Images, setImages] = useState();
    const [Price, setPrice] = useState();


    return (
        <View >
            <Text>teste final arquivo</Text>
            <TextInput 
            placeholder="Name"
            />
            <TextInput 
            placeholder="Description"
            />
            <TextInput 
            placeholder="Images"
            />
            <TextInput 
            placeholder="Price"
            />

        </View>
    )
}