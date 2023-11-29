import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InitialState = {
    AuthenticatedIs: false,
    Token: ""
}

export const slice = createSlice({
    name: "Login",
    initialState: InitialState,
    reducers: {
        signin(state, {payload}){
            
            try {
                AsyncStorage.setItem('Token', payload.data);
            } catch (error) {
                console.log("erro em salvar o token")
            }
            return{...state, AuthenticatedIs: true, Token: payload.data}
        }
    }
})

export const {signin} = slice.actions;

export const useStateLogin = (state) =>{
    return state.Login
}

export default slice.reducer;