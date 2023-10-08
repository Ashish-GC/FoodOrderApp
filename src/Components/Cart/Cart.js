import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart_context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [order, Setorder] = useState(false);
  const[isSubmitting,SetisSubmitting]=useState(false);
 const[didSubmit,SetdidSubmit]=useState(false);

  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const carItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={carItemAddHandler.bind(null, item)}
        ></CartItem>
      ))}
    </ul>
  );

  const OrderHandler = () => {
    Setorder(true);
  };
  const SubmitOrderHandler = async(userData) => {
    SetisSubmitting(true);
    try{
    const response= await fetch("https://foodorderapp-84e3a-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({ user: userData, Ordereditem: ctx.items }),
    });

    if(!response.ok){
              throw new Error("fetch not working")
    }
    SetisSubmitting(false);
    SetdidSubmit(true);
        ctx.clearCart();
  }
  catch(err){
         console.log(err.message);
  }
  };
   
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={OrderHandler}>
          Order
        </button>
      )}
    </div>
  );
   const modalContent =   <>
     {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {order && (
        <Checkout
          onConfirm={SubmitOrderHandler}
          onCancel={props.onClose}
        ></Checkout>
      )}
      {!order && modalActions}
   </>
   const SubmittingContent = <p>Sending order data....</p>
   const didSubmitContent=<>
     <p>Successfully sent the order !</p>
     <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
   </>

  return (
    <Modal onClose={props.onClose}>
         {!isSubmitting && !didSubmit && modalContent}
         {isSubmitting  && SubmittingContent}
         {!isSubmitting && didSubmit && didSubmitContent}
    </Modal>
  );
};
export default Cart;
