import { Button, Image, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { useStateLogin } from '../../Redux/LoginSlice';
import { useEffect } from "react";
import { axiosApi } from "../../Services/http-client";
import { useState } from "react";

export default function Account({navigation}){
    const {Token} = useSelector(useStateLogin)
    const {User} = useSelector(useStateLogin)
    const [Business, setBusiness] = useState();
    const [Loading, setLoading] = useState(true);

    useEffect(()=> {
        axiosApi.get(`business/getbyid?idEmpresa=${User.idEmpresa}`)
        .then((res)=> {
            setBusiness(res.data.data) 
            setLoading(false)
        })
        .catch((err)=>console.log(err))
    },[])
    return (
        <>
        {Loading ? 
            (
                <View> 
                    <Text>Carregando...</Text>
                </View>
            )
            :
            (
                <View>
                    <View className="flex-col items-center h-20">
                        <Image 
                            className="w-40 h-40 rounded-full"
                            
                            src={Business.logoImagem}
                        />
                        <Text>{Business.nome}</Text>
                        
                </View>
                <Text>Usuario: {User.nome}</Text>
                {User.idEmpresa ? 
                null
                :
                (<Button 
                    title="Criar Empresa"
                    onPress={()=> navigation.navigate("AddBusiness")}
                />)
                }
                
                <Button
                    title="Criar produtos"
                    onPress={()=> navigation.navigate("AddProduct")}
                />
            </View>
            )
        }
        
        </>
        
    )
}