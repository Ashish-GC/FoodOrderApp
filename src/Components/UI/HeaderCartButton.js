import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart_context";

const HeaderCartButton=(props)=>{
   const [btnAnimation,SetbtnAnimation]=useState(false);
 const cartCtx =useContext(CartContext);
      const {items}=cartCtx;
 useEffect(()=>{
    if(items.length===0){
        return
    }
             SetbtnAnimation(true);

             const timer=setTimeout(()=>{
                SetbtnAnimation(false);
             },300)

           return  ()=>{
                 clearTimeout(timer);
             }
       },[items])

 const numberOfCartItems= cartCtx.items.reduce((currNumber,item)=>{
           return currNumber+item.amount;},0);
        
           const btnclass =`${classes.button} ${btnAnimation && classes.bump}`
    return <button className={btnclass} onClick={props.onClick}>
        <span className={classes.icon}>{CartIcon}</span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}
export default HeaderCartButton;