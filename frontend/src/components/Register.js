import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const registerUrl = process.env.REACT_APP_API_URL + "/register";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [registering, setRegistering] = useState(false);
  const [message, setMessage] = useState(null);

  const submitHandler = (event) => {
    setRegistering(true);
    setMessage(null);
    event.preventDefault();
    if (
      username.trim() === "" ||
      email.trim() === "" ||
      name.trim() === "" ||
      password1.trim() === "" ||
      password2.trim() === "" ||
      apiKey.trim() === ""
    ) {
      setMessage("All fields are required.");
      setRegistering(false);
      return;
    }

    if (password1.trim() !== password2.trim()) {
      setMessage("Passwords do not match.");
      setRegistering(false);
      return;
    }

    setMessage(null);
    const requestConfig = {
      headers: {
        "x-api-key": apiKey,
      },
    };

    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password1,
    };

    axios
      .post(registerUrl, requestBody, requestConfig)
      .then((response) => {
        console.log(response);
        setMessage("Registration Successful.");
        setRegistering(false);
      })
      .catch((error) => {
        if (error.response === undefined) {
          setMessage("Sorry, something went wrong, recheck your form information and try again.");
          setRegistering(false);
        }
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message);
          setRegistering(false);
        } else {
          setMessage(
            "Sorry, something went wrong, recheck your form information and try again."
          );
          setRegistering(false);
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
                  <span className="section-heading-upper">Welcome!</span>
                  <span className="section-heading-lower">REGISTER</span>
                </h2>
                <div className="mb-0 text-center">
                  <form onSubmit={submitHandler}>
                    <label className="m-1 col-2 text-start">Name:</label>
                    <input
                      className="m-1 col-4"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <br />
                    <label className="m-1 col-2 text-start">Email:</label>
                    <input
                      className="m-1 col-4"
                      type="text"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <br />
                    <label className="m-1 col-2 text-start">Username:</label>
                    <input
                      className="m-1 col-4"
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                    <br />
                    <label className="m-1 col-2 text-start">Password:</label>
                    <input
                      className="m-1 col-4"
                      type="password"
                      value={password1}
                      onChange={(event) => setPassword1(event.target.value)}
                    />
                    <br />
                    <label className="m-1 col-2 text-start">
                      Retype Password:
                    </label>
                    <input
                      className="m-1 col-4"
                      type="password"
                      value={password2}
                      onChange={(event) => setPassword2(event.target.value)}
                    />
                    <br />
                    <label className="m-1 col-2 text-start">API Key:</label>
                    <input
                      className="m-1 col-4"
                      type="apiKey"
                      value={apiKey}
                      onChange={(event) => setApiKey(event.target.value)}
                    />
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary m-1"
                      onClick={submitHandler}
                      disabled={registering}
                    >
                      {!registering && <span>Register</span>}
                      {registering && (
                        <div>
                          <span>Registering... </span>
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
                  <span>Already have an account?</span>
                  <Link className="link-primary fw-bold" to={"/login"}>
                    Login here.
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

export default Register;
