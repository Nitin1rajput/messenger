import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { isLoggedIn } from "./actions/auth";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./containers/HomePage/Home.page";
import LoginPage from "./containers/LoginPage/Login.page";
import RegisterPage from "./containers/ResgisterPage/Register.page";

function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedIn());
    }
  });
  return (
    <div className="App">
      <Router>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Router>
    </div>
  );
}

export default App;
