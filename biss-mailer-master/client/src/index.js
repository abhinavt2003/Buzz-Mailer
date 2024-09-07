import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxthunk from "redux-thunk";

import App from "./App";
import reducers from "./reducers";
import axios from "axios";
window.axios = axios;
const store = createStore(reducers, {}, applyMiddleware(reduxthunk));
console.log("hi");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
console.log("stripe key is ", process.env.REACT_APP_STRIPE_KEY);
