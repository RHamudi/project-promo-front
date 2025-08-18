import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialState = {
  AuthenticatedIs: false,
  Token: '',
  User: {},
};

export const slice = createSlice({
  name: 'Login',
  initialState: InitialState,
  reducers: {
    signin(state, { payload }) {
      try {
        AsyncStorage.setItem('Token', payload.token);
      } catch (error) {
        console.log('$redux: erro em salvar o token');
      }
      return {
        ...state,
        AuthenticatedIs: true,
        Token: payload.token,
        User: payload,
      };
    },
  },
});

export const { signin } = slice.actions;

export const useStateLogin = (state) => {
  return state.Login;
};

export default slice.reducer;
