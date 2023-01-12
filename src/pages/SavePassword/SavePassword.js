import React, { useState } from "react";
import "./savePassword.css";
import { useParams } from "react-router-dom";

const SavePassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  
  function resetPasswordRequest() {
    const requestBody = {
      newPassword: newPassword
    };

    fetch("/v1/savePassword?token=" + token, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/login";
        } else {
          console.log(response.statusText);
        }
      })
      .catch((message) => {
        alert(message);
      });
  }

  return (
    <div className="save">
      <div className="saveWrapper">
        <div className="saveLeft">
          <h3 className="saveLogo">Tomcat</h3>
          <span className="saveDesc">
            Connect with friends and the world around you on Tomcat.
          </span>
        </div>
        <div className="saveRight">
          <div className="saveBox">
            <h1>Save new password</h1>
            <h3>Please enter your new password.</h3>
            <input
              type="password"
              placeholder="Password"
              className="saveInput"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <button
              className="saveButton"
              type="button"
              onClick={() => resetPasswordRequest()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavePassword;
