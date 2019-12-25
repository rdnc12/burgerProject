import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response // we can see that what error is.
        .use(
          res => res,
          error => {
            this.setState({ error: error });
          }
        );
    }
    // when we add this component to other component, that makes our system slow
    // componentWillMount is called several time and this cause of leak of memory
    // thats why we added it.
    componentWillUnmount() {
      console.log("Will Unmount", this.reqInterceptors, this.resInterceptors);
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }
    //when we click this anywhere in page, this page will dissapear.
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Auxiliary>
      );
    }
  };
};

export default WithErrorHandler;

// WrappedComponent might receive on it because we dont want lose props.
// we make an errorhandler.
