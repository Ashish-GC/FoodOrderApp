import React, { useReducer } from "react";
import CartContext from "./cart_context";

const defaultCartState={
    item: [],
    totalAmount:0
}

const cartReducer=(state,action)=>{
    if(type==="Add"){
       const updatedItems= state.item.concat(action.item);
       const updatedTotalAmounts=state.totalAmount + action.item.price*action.item.amount;
        return (
            {
                item:updatedItems,
                totalAmount:updatedTotalAmounts
            }
        )
    }
    if(type==="Remove"){
         return defaultCartState;
    }

 return defaultCartState;
}
const CartProvider =(props)=>{
    
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler=(item)=>{
           dispatchCartAction({type :"Add", item: item });
    }
    const removeItemFromCartHandler=(id)=>{
           dispatchCartAction({type: "Remove",id:id});
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