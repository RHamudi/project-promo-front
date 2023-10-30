import { configureStore } from "@reduxjs/toolkit"

import LoginReducer from "./LoginSlice"

export default configureStore({
    reducer: {
        Login: LoginReducer
    }
})
