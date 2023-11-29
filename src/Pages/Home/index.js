import { Button, StyleSheet, View, TouchableHighlight } from 'react-native';
import Categorias from '../../components/Categorias/index';
import Business from '../../components/Business/Index';
import { axiosApi } from '../../Services/http-client'
import { useState, useEffect } from 'react';

export default function Home({navigation}) {
  const [req, setReq] = useState([]);

  useEffect(()=> {
      axiosApi.get('business/getall').then((response)=> {     
          setReq(response.data.data)
      }).catch((err) => console.log(err))
  }, [])

  return (
      <View style={styles.container}>
        <Categorias/>
        {req.map((item, index) => (
          <TouchableHighlight key={index} onPress={()=> navigation.navigate('Business', {item: item})}>
            <Business  item={item}/>
          </TouchableHighlight>
        ))}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003366',
  },
  cards: {
  }
});
