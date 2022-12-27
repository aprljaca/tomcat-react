import React, { useState } from "react";
import { useLocalState } from "../../util/useLocalStorage";
import Topbar from "../../components/topbar/Topbar";
import "./changePassword.css";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");
  

  function resetPasswordRequest() {
    const requestBody = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    fetch("/v1/changePassword", {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "login";
        } else {
          console.log(response.statusText);
        }
      })
      .catch((message) => {
        alert(message);
      });
  }



    return (
      <div>
        <Topbar/>
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
            <h3>Please enter your old and new password.</h3>
            <input
              type="password"
              placeholder="Old password"
              className="saveInput"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
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
      </div>
    );
};

export default ChangePassword;