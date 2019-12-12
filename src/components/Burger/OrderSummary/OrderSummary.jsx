import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";

const OrderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A Delicious burger with the following ingredients:</p>
      <ul>
          {ingredientsSummary}
      </ul>
      <p>Continue to checkout</p>
    </Auxiliary>
  );
};

export default OrderSummary;
