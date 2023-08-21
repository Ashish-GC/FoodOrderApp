import React from "react";
import classes from "./Card.module.css"

const Card=(props)=>{
    const allclass=props.className +" "+classes.card;
    return(
              <div className={allclass}>{props.children}</div>
    );
}
export default Card;