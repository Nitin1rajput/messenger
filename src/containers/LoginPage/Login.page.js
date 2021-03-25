import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../actions/auth";
import Card from "../../components/UI ELements/Card/Card";
import Layout from "../../components/Layout/Layout";
import "./Login.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!auth.authenticated) {
  //     dispatch(isLoggedIn());
  //   }
  // });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Email is required");
    }
    if (password === "") {
      alert("Password is required");
    }
    dispatch(login({ email, password }));
  };
  if (auth.authenticated) {
    console.log("Redirecting");
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
      <div className="login-container">
        <Card>
          <form onSubmit={onSubmitHandler}>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </Card>
      </div>
      ;
    </Layout>
  );
};

export default LoginPage;
