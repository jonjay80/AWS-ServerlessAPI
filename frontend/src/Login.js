import axios from "axios";
import React, { useState } from "react";
import { setUserSession } from "service/AuthService";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const loginUrl =
  process.env.REACT_APP_API_URL + "/login";


  const submitHandler = (event) => {
    setLoggingIn(true);
    event.preventDefault();
    if(username.trim() === "" || password.trim() === "") {
      setMessage("Both username and password are required.");
      setLoggingIn(false);
      return;
    }
    setMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
    };

    const requestBody = {
      username: username,
      password: password
    }

    axios.post(loginUrl, requestBody, requestConfig).then((response) => {
      setUserSession(response.data.user, response.data.token);
      props.history.push('/premium-content');
      setLoggingIn(false);
    }).catch(error => {
      setLoggingIn(false);
      if(error.response.status === 401 || error.response.status === 403) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Sorry the backend server is down, please try again later.");
      }
    })

  }

  if(loggingIn) {
    return <div className="content">Logging in...</div>
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
