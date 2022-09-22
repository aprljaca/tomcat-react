import "./login.css";
import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";

const Login = () => {
  //local storage from inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //local storage in browser
  const [jwt, setJwt] = useLocalState("", "jwt");

  function openRegistrationPage() {
    window.location.href = "/register";
  }

  function sendLoginRequest() {
    const requestBody = {
      userName: username,
      password: password,
    };

    fetch("v1/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status == 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "home";
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Tomcat</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Tomcat.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Username"
              className="loginInput"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              placeholder="Password"
              className="loginInput"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="loginButton"
              type="button"
              onClick={() => sendLoginRequest()}
            >
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              type="button"
              onClick={() => openRegistrationPage()}
            >
              Create a New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;