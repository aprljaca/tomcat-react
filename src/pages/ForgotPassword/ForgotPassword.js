import React from "react";
import "./forgotPassword.css";

const ForgotPassword = () => {
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
              //value={username}
              //onChange={(event) => setUsername(event.target.value)}
            />
            <button
              className="forgotButton"
              type="button"
              //onClick={() => sendLoginRequest()}
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
