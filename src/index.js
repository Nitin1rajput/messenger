import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store/store";

//firebase configuration
console.log(process.env.API_KEY);
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: `messenger-${process.env.PROJECT_ID}.firebaseapp.com`,
  projectId: `messenger-${process.env.PROJECT_ID}`,
  storageBucket: `messenger-${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: "225385233910",
  appId: process.env.APP_ID,
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
