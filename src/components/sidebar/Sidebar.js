import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import "./sidebar.css";
import { RssFeed } from "@material-ui/icons";


const Sidebar = () => {

    useEffect(() => getUserIdFromJWT(), [])

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [userId, setUserid] = useState("");

    function getUserIdFromJWT() {
      fetch("/v1/getUserId", {
        headers: {
          "Content-Type": "",
          Authorization: `Bearer ${jwt}`,
        },
        method: "GET",
      })
      .then((response) => {
        if (response.status == 200) {
          return Promise.all([response.json()]);
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      })
      .then(([body]) => {
       setUserid(body)
      })
      .catch((error) => {
        alert(error.message);
      });
    }

      function redirectToProfile(){
        window.location.href="/profile/"+userId;
      }

      function redirectToSettings(){
        window.location.href="/settings";
      }

      function logout(){
        localStorage.clear();
        window.location.href="/login";
      }

    return (
        <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span>Home</span>
          </li>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span onClick={() => redirectToProfile()}>Profile</span>
          </li>

          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span>Followers</span>
          </li>

          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span>Following</span>
          </li>

          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span onClick={() => redirectToSettings()}>Settings</span>
          </li>

          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span onClick={() => logout()}>Logout</span>
          </li>

          

          
        </ul>
      </div>
    </div>
    );
};

export default Sidebar;