import React, {useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const MiddlebarFollow = ({list}) => {

    useEffect(() => getUserIdFromJWT(), []) 
  const [userId, setUserId] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

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
        setUserId(body)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

    var obj = list;
    console.log(obj)
    var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);

    return (
        <div className="mContainer">
            <GroupAddIcon/>
         {result.map((randomProfiles) => (
                <div className="mUser" id={randomProfiles[1].userId} >
                    <img
                    className="middleUserFriendImg"
                    src={randomProfiles[1].profileImage}
                    alt=""
                     />
                    <span>
                        {randomProfiles[1].firstName + " " + randomProfiles[1].lastName+ 
                        " started following you"}
                    </span>             
                </div>
                ))} 
      </div>
    );
};

export default MiddlebarFollow;