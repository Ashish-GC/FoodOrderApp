import React from "react";
import CartContext from "./cart_context";

const CartProvider =(props)=>{
    
    const addItemToCartHandler=()=>{

    }
    const removeItemFromCartHandler=()=>{

    }

    const cartcontext={
        items:[],
        totalAmount:0,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    }
    return( 
        <CartContext.Provider value={cartcontext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;