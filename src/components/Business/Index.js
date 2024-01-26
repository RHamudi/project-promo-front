import { ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Main from "../Main";
import { useEffect, useState } from "react";
import { axiosApi } from '../../Services/http-client'

export default function Business({item}) {
    return (
        <ScrollView>
            <Main item={item}/>
        </ScrollView>
    )
}
