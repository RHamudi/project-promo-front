import { ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Main from "../Main";
import { useEffect, useState } from "react";
import { axiosApi } from '../../Services/http-client'

export default function Business({item}) {
    return (
        <ScrollView style={styles.cards}>
            <Main item={item}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#003366',
    },
    cards: {
    }
  });