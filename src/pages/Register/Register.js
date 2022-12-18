import React, { useState } from "react";
import "./register.css";

const Register = () => {
  //local storage from inputs
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function openLoginPage() {
    window.location.href = "/login";
  }

  function sendRegisterRequest() {
    const requestBody = {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email: email,
      password: password,
    };

    fetch("/v1/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status == 201) {
          window.location.href = "login";
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Tomcat</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Tomcat.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input
              placeholder="First Name"
              className="registerInput"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <input
              placeholder="Last Name"
              className="registerInput"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
            <input
              placeholder="Username"
              className="registerInput"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              placeholder="Email"
              className="registerInput"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              className="registerButton"
              type="button"
              onClick={() => sendRegisterRequest()}
            >
              Sign Up
            </button>
            <button
              className="registerRegisterButton"
              type="button"
              onClick={() => openLoginPage()}
            >
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
