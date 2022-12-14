import React, { useState } from "react";
import "./settings.css";
import Topbar from "../../components/topbar/Topbar";
import axios from 'axios'

const Settings = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



    return (
        <>
          <Topbar />
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

            <input
              type="file"
              multiple
              name="file"
              //onChange={(event) => handleFile(event)}
            />
            
            <button
              type="button"
              //onClick={(e) => handleUpload(e)}
            >
              Upload
            </button>

            <button
              className="chooseImageButton"
              type="button"
             // onClick={() => sendSettingsRequest()}
            >
              Choose profile image
            </button>

            <button
              className="registerRegisterButton"
              type="button"
             // onClick={() => sendSettingsRequest()}
            >
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
        </>
      );
};

export default Settings;