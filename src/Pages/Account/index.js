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
            title="Criar Empresa testando auto commit"
            onPress={()=> navigation.navigate("AddBusiness")}
            />
        </View>
    )
}