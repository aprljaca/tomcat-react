import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import "./share.css";

const Share = () => {

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [firstName, setFirstname] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => getUserIdFromJWT(), []) 

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
        getProfileInformation(body);
      })
      .catch((error) => {
        alert(error.message);
      });
    }

    function getProfileInformation(body) {
      fetch("/v1/profileInformations?userId="+body, {
        headers: {
          "Content-Type": "application/json",
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
        setFirstname(body.firstName)
        setImage(body.profileImage)
      })
      .catch((error) => {
        alert(error.message);
      });
    }

    return (
        <div className="share">
      <div className="shareContainer">
        <div className="shareTop">
          <img className="shareImg"
            src={image}
            alt=""
          />
          <input className="shareInput" cltype="text" placeholder={"What is on your mind " + firstName + " ?"}  />
        </div>
        <hr />
        <div className="shareBottom">
          <div className="shareLeft">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              {/* <div className="shareItem">
                <img className="itemImg" src={Image} alt="" />
                <span>Add Image</span>
              </div> */}
            </label>
          </div>
          <div>
            <button className="shareRight">Share</button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Share;