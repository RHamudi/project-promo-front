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

export default function Home({navigation}) {
  const [req, setReq] = useState([]);
  const [filter, setFilter] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectCateg, setSelectCateg] = useState(null);

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

  return (
      <View style={styles.container}>
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            backgroundColor: '#5456'
        }}>
            <SafeAreaView style={styles.containerCategs}>
                <ScrollView horizontal={true} style={styles.scrollViewCategs}>
                    <View style={styles.containerIconsCategs}>
                        <Text style={{paddingBottom: 15, fontSize: 20}}>Categorias</Text>
                        <View style={styles.viewIconsCategs}>
                          <TouchableHighlight onPress={() => {
                              filterReq(1)
                          }}>
                            <View style={styles.icons}>
                                <FontAwesome5 name="tshirt" size={35} color="black" />
                            </View>
                          </TouchableHighlight>
                          <TouchableHighlight onPress={() => {
                            filterReq(2)
                          }}>
                            <View style={styles.icons}>
                                <Ionicons name="fast-food" size={35} color="black" />
                            </View>
                          </TouchableHighlight>
                          <TouchableHighlight onPress={() => {
                            filterReq(3)
                          }}>
                            <View style={styles.icons}>
                                <MaterialIcons name="computer" size={35} color="black" />
                            </View>
                          </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView> 
        </View>
        
          <FlatList 
          data={filter.length == 0 ? req : filter}
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
  },
  cards: {
  },
  containerCategs: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
