
// add loose focus (onblur)=> (with custom react hooks for every element ) 


import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isFiveChars = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
   
  const [formInputValidity,SetformInputValidity]=useState({
    name:true,
    city:true,
    postal:true,
    street:true
  })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredname = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value;
    const enteredpostal = postalInputRef.current.value;
    const enteredcity = cityInputRef.current.value;

    const enterednameIsValid = !isEmpty(enteredname);
    const enteredstreetIsValid = !isEmpty(enteredstreet);
    const enteredcityIsValid = !isEmpty(enteredcity);
    const enteredpostalIsValid = isFiveChars(enteredpostal);
      
    SetformInputValidity({
      name:enterednameIsValid,
      city: enteredcityIsValid,
      postal:enteredpostalIsValid,
      street:enteredstreetIsValid 
    })

    const fromIsValid =
      enterednameIsValid &&
      enteredstreetIsValid &&
      enteredcityIsValid &&
      enteredpostalIsValid;

      if(!fromIsValid){
                 return;
      }

      //  form submittion
        props.onConfirm({
             name:enteredname,
             city:enteredcity,
             street:enteredstreet,
             postal:enteredpostal
        })

  };
      
  const nameclass = `${classes.control} ${formInputValidity.name?'':classes.invalid}`
  const streetclass = `${classes.control} ${formInputValidity.street?'':classes.invalid}`
  const postalclass = `${classes.control} ${formInputValidity.postal?'':classes.invalid}`
  const cityclass = `${classes.control} ${formInputValidity.city?'':classes.invalid}`
  
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameclass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>please enter a valid name !</p>}
      </div>
      <div className={streetclass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>please enter a valid street !</p>}
      </div>
      <div className={postalclass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>please enter a valid postal code !</p>}
      </div>
      <div className={cityclass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>please enter a valid city !</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
