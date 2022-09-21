import React, { useState } from "react";
import "./register.css";

const Register = () => {
  //local storage from inputs
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendRegisterRequest() {
    const requestBody = {
      firstName: firstname,
      lastName: lastname,
      userName: username,
      email: email,
      password: password,
    };

    fetch("v1/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log("korisnik registrovan uspjesno");
        } else {
          console.log("greska");
        }
        //response.json(); kad imamo povratni json objekat sa bekenda i nakon toga treba i drugi then
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
              placeholder="First Name"
              className="loginInput"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <input
              placeholder="Last Name"
              className="loginInput"
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
            />
            <input
              placeholder="Username"
              className="loginInput"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              placeholder="Email"
              className="loginInput"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              onClick={() => sendRegisterRequest()}
            >
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
