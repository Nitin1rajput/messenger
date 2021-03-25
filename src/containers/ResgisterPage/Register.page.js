import React, { useState } from "react";
import Card from "../../components/UI ELements/Card/Card";
import Layout from "../../components/Layout/Layout";
import "../LoginPage/Login.css";
import { register } from "../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    dispatch(register(user));
  };

  if (auth.authenticated) {
    console.log("Redirecting");
    return <Redirect to={"/"} />;
  }
  return (
    <Layout>
      <div className="register-container">
        <Card>
          <form onSubmit={registerUser}>
            <h3>Register</h3>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              name="passwod"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default RegisterPage;
