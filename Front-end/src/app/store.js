// Reducer = counterReducer
import userReducer from '../pages/Auth/userSlice';

import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {
    user : userReducer,
}

const store = configureStore({
    reducer : rootReducer,   
});
export default store;