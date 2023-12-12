import { Button, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { useStateLogin } from '../../Redux/LoginSlice';

export default function Account({navigation}){
    const {Token} = useSelector(useStateLogin)
    const {User} = useSelector(useStateLogin)

    return (
        <View>
            <Text>Usuario: {User.nome}</Text>
            <Button 
                title="Criar Empresa"
                onPress={()=> navigation.navigate("AddBusiness")}
            />
            <Button
                title="Criar produtos"
                onPress={()=> navigation.navigate("AddProduct")}
            />
        </View>
    )
}