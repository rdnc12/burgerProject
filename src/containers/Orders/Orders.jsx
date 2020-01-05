import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchOrders = [];
        for (let key in res.data) {
          // we use ... for not losing our data.
          fetchOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order />
        ))}
      </div>
    );
  }
}
export default WithErrorHandler(Orders, axios);
