import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PremiumContent from "./components/PremiumContent";
import PrivateRoute from "routes/PrivateRoute";
import axios from "axios";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";
import About from "components/About";
import Services from "components/Services";
import Logout from "components/Logout";

const App = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const verifyTokenUrl = process.env.REACT_APP_API_URL + "/verify";

  useEffect(() => {
    console.log("useEffect...");
    setToken(getToken());
    if (
      token === "undefined" ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return;
    }
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };
    axios
      .post(verifyTokenUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setIsLoggedIn(true);
      })
      .catch(() => {
        resetUserSession();
        setIsLoggedIn(false);
      });
  }, [token, verifyTokenUrl, isLoggedIn, setIsLoggedIn]);

  return (
    <div className="App">
      <BrowserRouter forceRefresh={true}>
        <header>
          <h1 className="site-heading text-center text-faded d-none d-lg-block">
            <span className="site-heading-upper text-primary mb-3">
              This could be your website!
            </span>
            <span className="site-heading-lower">Your Business Website</span>
          </h1>
        </header>
        <div className="header">
          <nav
            className="navbar navbar-expand-lg navbar-dark py-lg-4"
            id="mainNav"
          >
            <div className="container">
              <a
                className="navbar-brand text-uppercase fw-bold d-lg-none"
                href="index.html"
              >
                Start Bootstrap
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto">
                  <NavLink
                    className="nav-link text-uppercase"
                    exact
                    activeClassName="active"
                    to="/"
                  >
                    Home
                  </NavLink>
                  {!token && (
                    <NavLink
                      className="nav-link text-uppercase"
                      activeClassName="active"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  )}
                  <NavLink
                    className="nav-link text-uppercase"
                    activeClassName="active"
                    to="/services"
                  >
                    Services
                  </NavLink>
                  <NavLink
                    className="nav-link text-uppercase"
                    activeClassName="active"
                    to="/about"
                  >
                    About Us
                  </NavLink>
                  <NavLink
                    className="nav-link text-uppercase"
                    activeClassName="active"
                    to="/premium-content"
                  >
                    Premium Content
                  </NavLink>
                  {token && (
                    <NavLink
                      className="nav-link text-uppercase"
                      activeClassName="active"
                      to="/logout"
                    >
                      Logout
                    </NavLink>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/services" component={Services} />
            <Route path="/about" component={About} />
            <PrivateRoute path="/premium-content" component={PremiumContent} />
            <PrivateRoute path="/logout" component={Logout} />
          </Switch>
        </div>
      </BrowserRouter>
      <footer className="footer text-faded text-center py-5">
        <div className="container">
          <p className="m-0 small">
            Copyright &copy; Your Business Website 2023
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
