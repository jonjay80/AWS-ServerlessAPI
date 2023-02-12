import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PremiumContent from "./PremiumContent";
import PublicRoute from "routes/PublicRoute";
import PrivateRoute from "routes/PrivateRoute";
import axios from "axios";
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from "./service/AuthService";

function App() {

  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const verifyTokenUrl =
  process.env.REACT_APP_API_URL + "/verify";

  useEffect(() => {
    const token = getToken();
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
        setIsAuthenticating(false);
      })
      .catch(() => {
        resetUserSession();
        setIsAuthenticating(false);
      });
  }, []);

  const token = getToken();
  if(isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
          <NavLink activeClassName="active" to="/register">
            Register
          </NavLink>
          <NavLink activeClassName="active" to="/login">
            Login
          </NavLink>
          <NavLink activeClassName="active" to="/premium-content">
            Premium Content
          </NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/premium-content" component={PremiumContent} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
