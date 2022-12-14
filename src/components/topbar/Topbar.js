import {React, useEffect, useState} from 'react';
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { useLocalState } from "../../util/useLocalStorage";
import { useParams } from 'react-router-dom';

const Topbar = () => {
    const params = useParams();
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

    useEffect(() => getUserIdFromJWT(), [])

    function redirectToHome(){
      window.location.href="/home";
    }

    function redirectToProfile(){
      window.location.href="/profile/"+userId;
    }

    return (
        <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Tomcat</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">

        <a className="topbarLink">
          <span 
          onClick={() => redirectToHome()}
          >Home</span>
          </a>

          <a className="topbarLink">
          <span 
          onClick={() => redirectToProfile()}
          >Profile</span>
          </a>
          
        </div>
      </div>
    </div>
    );
};

export default Topbar;