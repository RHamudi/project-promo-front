import { useState } from "react";
import { Text, View } from "react-native";

export default function AddBusiness(){
    const [Name, setName] = useState();
    const [Description, setDescription] = useState();
    const [Logo, setLogo] = useState();
    const [Location, setLocation] = useState();
    const [Email, setEmail] = useState();
    const [Number, setNumber] = useState();
    const [Site, setSite] = useState();
    const [Category, setCategory] = useState();
    const [Operation, setOperation] = useState();
    const [GeoData, setGeoData] = useState();

    return (
        <View>
            <Text>
                pagina para criar empresa
            </Text>
        </View>
    )
}