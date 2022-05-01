import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import Cart from "../Cart/Cart";

export const Header = () => {
  const history = useHistory();
  // eslint-disable-next-line
  const [nav, setNav] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (window.location.href.split("/")[3] === "") {
      setNav("home");
    } else {
      setNav(window.location.href.split("/")[3]);
    }
  }, []);

  const redirectToOrders = () => {
    history.push("/orders");
  };

  const logOut = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    if (window.location.href.split("/")[3] === "") {
      window.location.reload();
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <div className="nav-logo">
            <img className="site-logo" src="/logo.png" alt="site-logo" />
          </div>
        </Link>
        <p class="logo-text">Serenity Meds</p>

        <div className="header-buttons">
          {!loggedIn ? (
            <>
              <Button href="/login" className="login-header-button">
                Login
              </Button>
              <Button href="/sign-up" className="signup-header-button">
                Sign Up
              </Button>{" "}
            </>
          ) : (
            <>
              <Button onClick={logOut} className="logout-header-button">
                Log Out
              </Button>
              <Button
                onClick={redirectToOrders}
                className="logout-header-button"
              >
                Your Orders
              </Button>
              <Cart />
            </>
          )}
        </div>
      </nav>
    </>
  );
};
