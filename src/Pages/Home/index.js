import { 
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  TextInput
} from "react-native";
import Business from '../../components/Business/Index';
import { axiosApi } from '../../Services/http-client'
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

export default function Home({navigation}) {
  const [req, setReq] = useState([]);
  const [filter, setFilter] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [ChangeInput, setChangeInput] = useState(true);
  const [ChangeOpacity, setChangeOpacity] = useState("opacity-0")

  function HandleSearch(){
    setChangeInput((prevState) => !prevState);
    if(ChangeInput){
      setChangeOpacity("opacity-100")
    } else {
      setChangeOpacity("opacity-0")
    }
  }

  //func req api
    async function fecthData(){
      setRefreshing(true);
      axiosApi.get('business/getall').then((response)=> {  
        setReq(response.data.data)   
        setFilter(response.data.data)
        setRefreshing(false);
      }).catch((err) => {
        setRefreshing(false)
      })
  }

  //requisição api
  useEffect(()=> {
    fecthData();
  }, [])

  //filtro de pesquisa
  useEffect(()=> {
    if(searchText == "") setFilter(req)
    else {
      setFilter(
        req.filter(item => {
          if(item.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1) return true
          else return false
        })
      )
    }
  }, [searchText])

  return (
      <View className="flex-1 bg-white">
        <View className="relative h-32 p-4 bg-blue-950">
          <View className="absolute top-0 right-0">
            {ChangeInput ? 
              <TouchableHighlight className="mt-2 mr-2" onPress={HandleSearch}>
                <FontAwesome name="search" size={24} color="white" />
              </TouchableHighlight>
              :    
              <TextInput 
                style={{height: 30}}
                placeholder="Type text"
                className={`${ChangeOpacity} bg-slate-50 w-screen border-2 border-cyan-600 rounded-2xl p-1.5 text-slate-400 mt-2 px-6`}
              />
            }
          </View>
            <Text on className="font-bold text-4xl text-white absolute top-1/2 right-1/3 transform">
              MyCorp.
            </Text> 
        </View>
        <View className="flex justify-center mb-32">
          <FlatList 
          data={filter}
          renderItem={({item}) => 
            <TouchableHighlight className="m-4" onPress={()=> navigation.navigate('Business', {item: item})}>
              <Business item={item}/>
            </TouchableHighlight>}
          keyExtractor={item => item.idEmpresa}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={fecthData}
            />
          }
          />
        </View>
        
      </View>
  );
}