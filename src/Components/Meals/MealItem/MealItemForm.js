import React, { useState,useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm=(props)=>{
    const amountInputRef = useRef();
    const [amountIsValid,SetamountIsValid] =useState(true); 

    const SubmitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount= amountInputRef.current.value;
        const enteredAmountNumber=+enteredAmount;

        if(enteredAmount.trim().length===0 ||
        enteredAmountNumber<1 || enteredAmountNumber>5){
           SetamountIsValid(false);
            return;
        }

         props.onAddToCart(enteredAmountNumber);
    }
    return(
           <form className={classes.form} onSubmit={SubmitHandler}>
                    <Input 
                    ref={amountInputRef}
                    label="Amount"
                     input={{
                        id:"amount_" + props.id,
                        type:"number",
                        min:'1',
                        max:'5',
                        step:'1',
                        defaultValue:'1'
                     }}></Input>
                <button className={classes.button}>+Add</button>
                {!amountIsValid && <p>please enter a valid amount (1-5) .</p>}
           </form>
    );
}
export default MealItemForm;