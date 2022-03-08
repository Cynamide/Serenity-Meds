import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authStateReducer } from "../../redux/reducers/authReducer";
import { authActions } from "../../redux/actions/authActions";
import "./Header.css";

export const Header = () => {
  const auth = useSelector((data) => authStateReducer(data));
  const dispatch = useDispatch();
  const history = useHistory();
  const [nav, setNav] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (auth.authStateReducer.access_token) {
      setLoggedIn(true);
    }
  }, [auth]);

  useEffect(() => {
    if (window.location.href.split("/")[3] === "") {
      setNav("home");
    } else {
      setNav(window.location.href.split("/")[3]);
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    const data = {
      access_token: null,
      refresh_token: null,
      type: "UNSET",
    };
    dispatch(authActions(data));
    if (window.location.href.split("/")[3] === "") {
      window.location.reload();
    } else {
      history.push("/");
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to={loggedIn ? "/volunteer-dashboard" : "/"}>
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
            <Button onClick={logOut} className="logout-header-button">
              Log Out
            </Button>
          )}
        </div>
      </nav>
    </>
  );
};
