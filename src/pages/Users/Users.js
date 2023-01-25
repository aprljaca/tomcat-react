import React, {useEffect, useState} from 'react';

import Topbar from '../../components/topbar/Topbar';
import "./users.css";

const Users = () => {

    const [inputValue, setInputValue] = useState(localStorage.getItem("inputValue") || "");
    const [users, setUsers] = useState("");

    useEffect(() => {
        fetch("/v1/searchUser", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(inputValue),
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
                setUsers(body);
                console.log(body)
            })
            .catch((error) => {
              //alert(error.message);
            });

      }, [inputValue]);

    const userClick = event => {
      window.location.href = "/profile/" + event.currentTarget.id;
    };

    var obj = users;
    var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
  
    return (
        <div>
            <Topbar/>
            { users.length ? 
              <div className="mContainer">
              {result.map((randomProfiles) => (
                     <div className="mUser" id={randomProfiles[1].userId} onClick={userClick}>
                         <img
                         className="middleUserFriendImg"
                         src={randomProfiles[1].profileImage}
                         alt=""
                          />
                         <span>
                             {randomProfiles[1].firstName + " " + randomProfiles[1].lastName}
                         </span>            
                     </div>
                     ))} 
               </div> : <p></p>
            }
        </div>
    );
};

export default Users;
