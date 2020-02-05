import React, { Component } from "react";
import { Route,Redirect } from "react-router-dom";
import {connect} from 'react-redux'

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
 
// before we render the child component
// we have access to the props. we can already get queryParams
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       // ['salad','1']
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {

    // when we get no ingredients
    let summary =<Redirect to='/'/>;
    
    if(this.props.ings){
      const purchaseRedirect= !this.props.purchased ?<Redirect to='/'/> : null;

      summary=(<React.Fragment>
        {purchaseRedirect}
        <CheckoutSummary
        ingredients={this.props.ings}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}
      />
      <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
        </React.Fragment> );
    }
    return  summary;
     
  }
}

const mapStateToProps =state=>{
  return{
    ings:state.burgerBuilder.ingredients,
    purchased:state.order.purchased
  }
}



export default connect(mapStateToProps)(Checkout);
