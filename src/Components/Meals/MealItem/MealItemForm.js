import React, { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm=(props)=>{
    const amountInputRef = useRef();
      
    const SubmitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount= amountInputRef.current.value;
        const enteredAmountNumber=+enteredAmount;

        if(enteredAmount.trim().length===0 ||
        enteredAmountNumber<1 || enteredAmountNumber>5){
            return;
        }
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
           </form>
    );
}
export default MealItemForm;