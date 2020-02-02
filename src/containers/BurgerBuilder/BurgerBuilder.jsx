import React, { Component } from "react";
import {connect} from 'react-redux'

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import classes from "./BurgerBuilder.module.css";
import * as burgerBuilderActions from '../../store/actions/index'
import axios from "../../axios-order";


class BurgerBuilder extends Component {
  state = {
    purchasing: false,

  };

  // to retrieve our ingredients from backend...
  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        // console.log('map:'+ingredients[igKey]);
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        //console.log('reducesum'+ (sum))
        return sum + el;
      }, 0);
    return sum >0;
  }

  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // // alert('continue!!!');

    this.props.history.push('/checkout');
   
  };

  render() {
    //console.log('ing='+this.state.ingredients['salad']);
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      // console.log('key='+disabledInfo[key])
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <div className={classes.ErrorMessage}>
        <span className={classes.ErrorText}>Ingredients can't be loaded!</span>
      </div>
    ) : (
      <Spinner />
    ); // if this error is true, we don"t want to show our spinner and show message.

    // this statement check our ingredients are avalaible to use.
    // while this is cehecking, users see only spinner.
    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />{" "}
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    // after ingredients checking, we check  for the loadingstate to overwrite
    // order summary when needed.
    // We can see spinner, when we waiting our order to send database or getting ingredients from backend
    // depends on the internet speed etc.
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps= state=>{
  return{
    ings:state.ingredients,
    price:state.totalPrice,
    error:state.error
  }
}

const mapDispatchToProps= dispatch=>{
  return{
    onIngredientAdded:(ingName)=> dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=> dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
// burgerbuilder connected to store
