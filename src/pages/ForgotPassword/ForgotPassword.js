import React, { useState } from "react";
import "./forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  function sendResetPasswordRequest() {
    const requestBody = {
      email: email,
    };

    fetch("v1/resetPassword", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status == 200) {
          window.location.href = "savePassword";
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
    <div className="forgot">
      <div className="forgotWrapper">
        <div className="forgotLeft">
          <h3 className="forgotLogo">Tomcat</h3>
          <span className="forgotDesc">
            Connect with friends and the world around you on Tomcat.
          </span>
        </div>
        <div className="forgotRight">
          <div className="forgotBox">
            <h1>Find Your Account</h1>
            <h3>Please enter your email to search for your account.</h3>
            <input
              placeholder="Email"
              className="forgotInput"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              className="forgotButton"
              type="button"
              onClick={() => sendResetPasswordRequest()}
            >
              Send email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
