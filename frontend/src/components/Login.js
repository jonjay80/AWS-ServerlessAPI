import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setUserSession } from "service/AuthService";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const loginUrl = process.env.REACT_APP_API_URL + "/login";

  const submitHandler = (event) => {
    setLoggingIn(true);
    setMessage(null);
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setMessage("Both username and password are required.");
      setLoggingIn(false);
      return;
    }
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };

    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post(loginUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setLoggingIn(false);
        props.history.push("/premium-content");
      })
      .catch((error) => {
        setLoggingIn(false);
        if (error.response === undefined) {
          setMessage(
            "Sorry the backend server is down, please try again later."
          );
        }
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            "Sorry the backend server is down, please try again later."
          );
        }
      });
  };

  return (
    <div>
      <section className="page-section cta">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <div className="cta-inner bg-faded text-center rounded">
                <h2 className="section-heading mb-4">
                  <span className="section-heading-upper">
                    Hello and Welcome!
                  </span>
                  <span className="section-heading-lower">LOGIN</span>
                </h2>
                <div className="mb-0">
                  <form onSubmit={submitHandler}>
                    <label className="m-1">Username:</label>
                    <input
                      className="m-1"
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                    <br />
                    <label className="m-1">Password:</label>
                    <input
                      className="m-1"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <br />
                    <button
                      type="button"
                      onClick={submitHandler}
                      className="btn btn-primary m-1"
                      disabled={loggingIn}
                    >
                      {!loggingIn && <span>Login</span>}
                      {loggingIn && (
                        <div>
                          <span>Logging in... </span>
                          <div
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </button>
                  </form>
                  {message && (
                    <p className="message text-danger fst-italic fw-bold">
                      {message}
                    </p>
                  )}
                </div>
                <br />
                <div className="row">
                  <span>Need an account?</span>
                  <Link className="link-primary fw-bold" to={"/register"}>
                    Register here.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
