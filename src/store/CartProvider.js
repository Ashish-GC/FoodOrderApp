import React, { useReducer } from "react";
import CartContext from "./cart_context";

const defaultCartState={
    item: [],
    totalAmount:0
}

const cartReducer=(state,action)=>{
    if(action.type==="Add"){
        const updatedTotalAmounts=state.totalAmount + action.item.price*action.item.amount;

        const existingCartItemIndex= state.item.findIndex((item)=>item.id===action.item.id)
        const existingCartItem = state.item[existingCartItemIndex];
         let updatedItems;

         if(existingCartItem){
           const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
             }
             updatedItems=[...state.item]
             updatedItems[existingCartItemIndex]=updatedItem
         }
             else{
                updatedItems= state.item.concat(action.item);
             }
      
      
        return (
            {
                item:updatedItems,
                totalAmount:updatedTotalAmounts
            }
        )
    }
    if(action.type==="Remove"){
        const existingCartItemIndex= state.item.findIndex((item)=>item.id===action.id)
        const existingItem = state.item[existingCartItemIndex];
        const updatedTotalAmounts=state.totalAmount - existingItem.price;

        let updatedItems;
        if(existingItem.amount ===1){
            updatedItems=state.item.filter((item)=> item.id !== action.id)
        }
        else{
           const updatedItem={...existingItem,amount:existingItem.amount-1};
           updatedItems=[...state.item];
           updatedItems[existingCartItemIndex]=updatedItem;
        }

        return{
            item:updatedItems,
            totalAmount:updatedTotalAmounts
        }
    }
         
    if(action.type==='clear'){
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
  
    const clearCartHandler=()=>{
             dispatchCartAction({type:"clear"});
    }

    const cartcontext={
        items:cartState.item,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        clearCart:clearCartHandler
    }
    return( 
        <CartContext.Provider value={cartcontext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;