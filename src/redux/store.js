import { createSlice,configureStore } from "@reduxjs/toolkit";
import cartReducer from './reducers/cart-reducer';
import apiReducer from "./reducers/api-reducer";

const store = configureStore({
    reducer:{
        photos: apiReducer,
        cart: cartReducer,
    }
});


export default store;