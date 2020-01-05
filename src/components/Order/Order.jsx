import React from "react";

import classes from "./Order.module.css";

const Order = props => {
  const ingredients = [];

  for (let IngredientName in props.ingredients) {
    ingredients.push({
      name: IngredientName,
      amount: props.ingredients[IngredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingredientOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)} TL</strong>
      </p>
    </div>
  );
};

export default Order;
