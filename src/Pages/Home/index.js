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
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Categorias from '../../components/Categorias/index';
import Business from '../../components/Business/Index';
import { axiosApi } from '../../Services/http-client'
import { useState, useEffect } from 'react';
import { TextInput } from "react-native-gesture-handler";

export default function Home({navigation}) {
  const [req, setReq] = useState([]);
  const [filter, setFilter] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectCateg, setSelectCateg] = useState(null);
  const [searchText, setSearchText] = useState();

  function fecthData(){
    setRefreshing(true);

    axiosApi.get('business/getall').then((response)=> {     
      setReq(response.data.data)
      setRefreshing(false);
    }).catch((err) => {
      setRefreshing(false)
    })
  }

  function filterReq(number){
    const filteredArray = req.filter(item => item.categoria == number)
    setFilter(filteredArray)
  }

  useEffect(()=> {
    fecthData();
  }, [])

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
      <View style={styles.container}>
        <View>
          <TextInput 
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
          />
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
  },input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  cards: {
  },
  containerCategs: {
    flex: 1,
    paddingTop: 0,
  },
  scrollViewCategs: {
      
  },
  containerIconsCategs: {
      alignItems:'center',
      justifyContent: 'center'
  },
  text: {
      fontSize: 42,
  },
  viewIconsCategs: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
  },
  icons: {
      backgroundColor: 'rgba(124, 131, 133, 0.8)',
      flexDirection: 'row',
      padding: 4,
      borderRadius: 5
  }
});
