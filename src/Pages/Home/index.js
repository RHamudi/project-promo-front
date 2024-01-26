import { 
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Button,
} from "react-native";
import Business from '../../components/Business/Index';
import { axiosApi } from '../../Services/http-client'
import { useState, useEffect } from 'react';
import { TextInput } from "react-native-gesture-handler";

export default function Home({navigation}) {
  const [req, setReq] = useState([]);
  const [filter, setFilter] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

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
      <View className="flex-1 bg-blue-950">
        <View className="h-32 justify-center">
          <Text className="font-bold text-4xl text-white  content-center text-center">
            MyCorp.
          </Text>
        </View>
        
          <FlatList 
          data={filter}
          renderItem={({item}) => 
            <TouchableHighlight onPress={()=> navigation.navigate('Business', {item: item})}>
              <Business  item={item}/>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
  }
});
