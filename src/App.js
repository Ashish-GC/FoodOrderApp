import React, { useState } from "react";
import Header from "./Components/UI/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";


function App() {
  const[cartIsShown,SetcartIsShown]=useState(false);
  const showCartHandler=()=>{
    SetcartIsShown(true);
  }
  const hideCartHandler=()=>{
    SetcartIsShown(false);
  }
  
  return (
    <CartProvider>
     {cartIsShown && <Cart onClose={hideCartHandler}></Cart>} 
      <Header onShowCart={showCartHandler}></Header>
      <main><Meals></Meals></main>
    </CartProvider>
  );
}

export default App;
