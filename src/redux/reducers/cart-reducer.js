import { createSlice,createAction,isAnyOf } from "@reduxjs/toolkit";
import { setLocalStorageItem, getLocalStorageItem } from '../../utils/helpers';

// Custom actions
const removeFromCart = createAction("remove-from-cart");

const isAddToCartAction = (action) =>{
    return action.type.endsWith("/addToCart");
}

const isRemoveToCartAction = (action) =>{
    return action.type.endsWith("remove-from-cart");
}

const isCartCleaned = (action) =>{
    return action.type.endsWith('/cleanCart');
};


// Action checker (matcher)
const isCartAction = (action) =>{
    return isAnyOf(isAddToCartAction,isRemoveToCartAction,isCartCleaned)(action);
}

// GET item from localStorage
const localStorageCart = getLocalStorageItem("cart");
const localStorageTotal = getLocalStorageItem("total");

// REDUX statement
const initialState = {
    cart: localStorageCart ? localStorageCart : [],
    total: localStorageTotal ? localStorageTotal : 0 ,
    payed:false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state,action) => { state.cart.push(action.payload) }, // Add item to cart
        payOrder: state => {state.payed = true }, // custom pay system
        
        cleanCart: (state) => {  // clean all the items in the cart
            state.cart = [];
            state.total = 0;
        },

    },
    
    extraReducers:(builder) => {
        
        builder
        // Action
        .addCase(removeFromCart,(state,action)=>{
            state.cart = state.cart.filter(el => el.id !== action.payload.id) // check to remove single item
        })
        
        // Matchers accepts only boolean 
        .addMatcher(isAddToCartAction,(state,action) => { // Update if items are added
            state.total += action.payload.likes
        })
        
        .addMatcher(isRemoveToCartAction,(state,action) => { // Update if items are removed
            state.total -= action.payload.likes
        })

        .addMatcher(isCartAction,(state)=>{ // add items to localstorage
            setLocalStorageItem("cart",state.cart);
            setLocalStorageItem("total",state.total)
        })
        
        // Fallback
        .addDefaultCase((state)=>{
            return state;
        })
    }
});

const addItem = (item) => (dispatch,getState) => { 
    const { cart } = getState().cart; // getState get all the store

    if(cart.find( x => x.id === item.id )){
        return;
    }
    dispatch(addToCart(item));
};

const {
    addToCart,
    payOrder,
    cleanCart,
} = cartSlice.actions;

export{
    removeFromCart,
    addItem,
    cleanCart,
    payOrder
};

const { reducer } = cartSlice;
export default reducer;