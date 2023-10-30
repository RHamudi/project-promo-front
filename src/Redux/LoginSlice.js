import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
    AuthenticatedIs: false,
    Token: ""
}

export const slice = createSlice({
    name: "Login",
    initialState: InitialState,
    reducers: {
        signin(state, {payload}){
            return{...state, AuthenticatedIs: true, Token: payload.data}
        }
    }
})

export const {signin} = slice.actions;

export const useStateLogin = (state) =>{
    return state.Login
}

export default slice.reducer;