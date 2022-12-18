import React, { useState } from "react";
import "./settings.css";
import Topbar from "../../components/topbar/Topbar";

const Settings = () => {

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");


    return (
        <>
          <Topbar />
          <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsLeft">
          <h3 className="settingsLogo">Tomcat</h3>
          <span className="settingsDesc">
            Connect with friends and the world around you on Tomcat.
          </span>
        </div>
        <div className="settingsRight">
          <div className="settingsBox">
          <input
              type="password"
              placeholder="Old Password"
              className="settingsInput"
              value={oldPassword}
              onChange={(event) => setoldPassword(event.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="settingsInput"
              value={newPassword}
              onChange={(event) => setnewPassword(event.target.value)}
            />

            <button
              className="settingsSettingsButton"
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