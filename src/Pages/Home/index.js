import { Button, StyleSheet, View, TouchableHighlight, FlatList, RefreshControl, ScrollView } from 'react-native';
import Categorias from '../../components/Categorias/index';
import Business from '../../components/Business/Index';
import { axiosApi } from '../../Services/http-client'
import { useState, useEffect } from 'react';

export default function Home({navigation}) {
  const [req, setReq] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  function fecthData(){
    setRefreshing(true);

    axiosApi.get('business/getall').then((response)=> {     
      setReq(response.data.data)
      setRefreshing(false);
  }).catch((err) => {
    setRefreshing(false)
  })
  }

  useEffect(()=> {
    fecthData();
  }, [])

  return (
      <View style={styles.container}>
        <Categorias/>
        
          <FlatList 
          
          data={req}
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
  }
});
