import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/Auth/userSlice";
import cartReducer from "../pages/Cart/cartSlice"

export const store = configureStore({
    reducer: {
        user : userReducer,
        cart : cartReducer,
    },
})