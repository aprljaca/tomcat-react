import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import "./rightbar.css";


const Rightbar = () => {

  const [randomProfiles, setRandomProfiles] = useState("")
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => getRandomProfiles(), []) 

  function getRandomProfiles() {
    fetch("/v1/randomProfiles", {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
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
        setRandomProfiles(body);
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  const userClick = event => {
    window.location.href = "/profile/" + event.currentTarget.id;
  };

  var obj = randomProfiles;
  var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);

    return (
      <div className="rbContainer">
        <h3>Suggestions for you</h3>
         {result.map((randomProfiles) => (
                  console.log(randomProfiles[1].firstName),
                <div className="rightbarUser" id={randomProfiles[1].userId} onClick={userClick}>
                    <img
                    className="userFriendImg"
                    src={randomProfiles[1].profileImage}
                    alt=""
                     />
                    <span>{randomProfiles[1].firstName + " " + randomProfiles[1].lastName}</span>                
                </div>
                ))} 
      </div>
    );
};

export default Rightbar;