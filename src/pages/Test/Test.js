import {React, useEffect, useState} from 'react';
import CloseFriend from '../../components/closeFriend/CloseFriend';
import Popup from '../../components/popup/Popup';
import "./test.css";

const Test = () => {

    const [buttonPopup, setbuttonPopup] = useState(false);
    const [following, setFollowing] = useState("");
    const [imageName, setimageName] = useState("");

    function getUserFollowing() {
        // promijeniti rutu u params
        fetch("/v1/userFollowing?userId=1", {
          headers: {
            "Content-Type": "application/json",
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
            setFollowing(body);
        })
        .catch((error) => {
          alert(error.message);
        });
      }

      function getImageName(userId) {
        fetch("/v1/downloadImage?userId="+userId, {
          headers: {
            "Content-Type": "",
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
          setimageName("http://127.0.0.1:8888/"+body.object)   
        })
        .catch((error) => {
          alert(error.message);
        });
      }


      useEffect(() => getUserFollowing(), [])
 

      var obj = following;
      var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);

    return (
        <div>
            <main>
                <h1>Test</h1>
            <button onClick={() => setbuttonPopup(true)}>Open Popup</button>

            <Popup trigger={buttonPopup} setTrigger={setbuttonPopup}>
            <h1>Following</h1>

                {result.map((following) => (
                    getImageName(following[1].userId),
                <div className="user">
                    <img
                    className="FriendImg"
                    src={imageName}
                    alt=""
                     />
                    <span>{following[1].firstName + " " + following[1].lastName}</span>                
                </div>
                
                
                ))}
                

                
            </Popup>
            </main>
        </div>
    );
};

export default Test;