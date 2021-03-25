import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store/store";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpHOIqROUCqKfQwIRrSC9ma8y-8KBYOek",
  authDomain: `messenger-bfee0.firebaseapp.com`,
  projectId: `messenger-bfee0`,
  storageBucket: `messenger-bfee0.appspot.com`,
  messagingSenderId: "225385233910",
  appId: "	1:225385233910:web:e6257eb315f46d8725dbd7",
  measurementId: "G-MNR06JZRHN",
};

firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
