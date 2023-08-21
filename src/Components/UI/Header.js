import React from "react";
import classes from "./Header.module.css";
import Mealimage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header=(props)=>{

   return <>
    <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
    </header>
      <div className={classes['main-image']}>
        <img src={Mealimage} alt="remote "></img>
      </div>
   </>
}
export default Header;

