import { createSlice } from "@reduxjs/toolkit";

// Tạo 1 Slice = hàm createSlice() của Redux
const cartSlice = createSlice({
    // Truyền vào cái name , initialState (Có thể là number hoặc string , object ,...)
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems:JSON.parse(localStorage.getItem("cart")) || [],
    } ,

    // Reducer là 1 object -> Mỗi key là 1 trường hợp ( là 1 hàm  )
    reducers: {
        showMiniCart(state){
            state.showMiniCart = true;
        },

        hideMiniCart(state){
            state.showMiniCart = false;     
        },

        addToCart(state,action){
            // newItems = { id , product , quantity}
            const newItem = action.payload
            const index = state.cartItems.findIndex(x => x.id === newItem.id)
            if ( index >= 0 ) {
                // increase quantity
                state.cartItems[index].quantity += newItem.quantity
            }else{
                //add to cart
                state.cartItems.push(newItem);
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        setQuantity(state,action){
            const {id , quantity} = action.payload
            //check if product is avaliable in cart 
            const index = state.cartItems.findIndex(x => x.id === id)
            if ( index >= 0 ) {
                state.cartItems[index].quantity = quantity;
            }
        },

        // removeFromCart(state,action){
        //     const idNeedRemove = action.payload;
        //     state.cartItems = state.cartItems.filter(x => x.id !== idNeedRemove)
        //     localStorage.removeItem(StorageKeys.CART);
        // },
        removeFromCart(state, action) {
            const idNeedRemove = action.payload;
            state.cartItems = state.cartItems.filter(x => x.id !== idNeedRemove);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        
    },
});
// Redux tự định nghĩa actions và reducer 
const { actions , reducer } = cartSlice ;
// Trong actions thì có showMiniCart,hideMiniCart,addToCart,setQuantity,removeFromCart
export const {  showMiniCart ,
                hideMiniCart , 
                addToCart , 
                setQuantity , 
                removeFromCart ,
                removeItem ,
                } = actions

export default reducer