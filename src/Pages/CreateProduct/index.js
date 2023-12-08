import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { useStateLogin } from "../../Redux/LoginSlice";

export default function CreateProduct(){
    const {User} = useSelector(useStateLogin);
    const [IdBusiness, setIdBusiness] = useState(User.idEmpresa);
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

            <Button 
            title="Submit"
            />
        </View>
    )
}