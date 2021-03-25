import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../actions/auth";

import "./Header.css";

const Header = (props) => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout(auth.uid));
  };

  return (
    <header className="header">
      <div style={{ display: "flex" }}>
        <div className="logo">Messenger</div>
        {!auth.authenticated && (
          <ul className="left-menu">
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>Register</NavLink>
            </li>
          </ul>
        )}
      </div>
      <div style={{ margin: "20px 0", color: "#fff", fontWeight: "bold" }}>
        {auth.authenticated && `Hi ${auth.name}`}
      </div>
      <ul className="menu">
        {auth.authenticated && (
          <li>
            <Link to={"#"} onClick={logoutHandler}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
