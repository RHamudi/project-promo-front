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
        .catch((err)=>{
            setLoading(false)
        })
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
                    {User.idEmpresa !== null ??
                        <View className="flex-col items-center h-20">
                            <>
                                <Image 
                                    className="w-40 h-40 rounded-full"
                                    
                                    src={Business.logoImagem}
                                />
                                <Text>{Business.nome}</Text>
                            </>
                        </View>
                    }
                <View className="flex-col bg-blue-800 justify-center h-32">
                    <View className="flex-row">
                        {Business != undefined ?  
                            <Image 
                                className="w-28 h-28 ml-2 rounded-full"
                                src={Business.logoImagem}
                            />  
                        :
                        <Image 
                            className="w-28 h-28 ml-2 rounded-full"
                            source={require('../../images/nouser.jpg')}
                        />
                        }
                        <View>
                            <Text className="text-white text-xl text-bold font-extrabold">Usuario: {User.nome}</Text>
                        </View>
                    </View>
                </View>
                {User.idEmpresa ? 
                    (<View className="p-2"> 
                        <Button
                            title="Criar produtos"
                            
                            onPress={()=> navigation.navigate("AddProduct")}
                            />
                    </View>)
                :
                    (<View classname="p-2">
                        <Button 
                            title="Criar Empresa"
                            onPress={()=> navigation.navigate("AddBusiness")}
                            />
                    </View>)
                }
            </View>
            )
        }
        
        </>
        
    )
}