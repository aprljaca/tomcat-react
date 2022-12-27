import {React, useEffect, useState} from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import { useLocalState } from "../../util/useLocalStorage";
import { useParams } from "react-router-dom";
import Popup from '../../components/popup/Popup';
import Post from '../../components/post/Post';
import Feed from '../../components/feed/Feed';


const Profile = () => {
  //params uzima sa urla !
  const params = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [posts, setPosts] = useState("");
  const [image, setImage] = useState("");
  const [buttonPopupFollwers, setbuttonPopupFollowers] = useState(false);
  const [buttonPopupFollwing, setbuttonPopupFollowing] = useState(false);
  const [folowing, setFolowing] = useState("");
  const [folowers, setFolowers] = useState("");
  const [userId, setUserId] = useState("");
  const [show, setShow] = useState(false);

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

        if(body!=params.userId){
          setShow(true);
        }

        getProfileInformation(body);
      })
      .catch((error) => {
        alert(error.message);
      });
    }

      
  function getProfileInformation() {
    fetch("/v1/profileInformations?userId="+ params.userId, {
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
      console.log(body)
      setUserId(body.userId)
      setFirstname(body.firstName)
      setLastname(body.lastName)
      setUsername(body.userName)
      setImage(body.profileImage)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  function getProfilePost() {
    fetch("/v1/profilePosts?userId="+ params.userId, {
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
      setPosts(body);
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  function isFollowing() {
    fetch("/v1/isFollowing?userId="+ params.userId, {
      headers: {
        //"Content-Type": "application/json",
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
      if(body===true){
        console.log("dugme treba da ispisuje Unfollow")
        setFollowing(false)
      } else {
        console.log("dugme treba da ispisuje Follow")
        setFollowing(!false)
      }
    })
    .catch((error) => {
      alert(error.message);
    });
  }


  function followUser() {
    console.log("usao sam u followUser funkciju")
    fetch("/v1/followUser?userId="+ params.userId, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status == 200) {
          console.log("uspjeno followan user")
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }

  function unFollowUser() {
    fetch("/v1/unFollowUser?userId="+ params.userId, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.status == 200) {
          console.log("user uspjesno unfollowan")
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }

  function getUserFollowing() {
    fetch("/v1/userFollowing?userId="+params.userId, {
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
        setFolowing(body);
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  function getUserFollowers() {
    fetch("/v1/userFollowers?userId="+params.userId, {
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
        setFolowers(body);
    })
    .catch((error) => {
      alert(error.message);
    });
  }


  var obj = folowers;
  var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);

  var obj1 = folowing;
  var result1 = Object.keys(obj1).map((key) => [Number(key), obj1[key]]);

  useEffect(() => getProfileInformation(), [])
  useEffect(() => getProfilePost(), [])
  useEffect(() => isFollowing(), [])

    const [following, setFollowing] = useState(false);
    function handleClick () {
      if(following==true){
        setFollowing(false)
        console.log("pozovi api za follow")
        followUser();
      } else {
        setFollowing(!false)
        console.log("pozovi api za unfollow")
        unFollowUser();
      }
    };

    function openFollowing(){
      setbuttonPopupFollowing(true);
      getUserFollowing()
    };

    function openFollowers(){
      setbuttonPopupFollowers(true);
      getUserFollowers()
    };

    const userClick = event => {
      window.location.href = "/profile/" + event.currentTarget.id;
    };
   
  return (
    
    <div>
      <Topbar/>
    <div className="images">
    
       <img
        src={image}
        alt=""
        className="profilePic"
      /> 
    </div>
    <div className="profileContainer">
      <div className="uInfo">
        <div className="profileLeft">
        </div>
        <div className="center">
          <span>{firstName} {lastName}</span>
          <div className="info">
            <div className="profileItem">
            </div>
          </div>
          {show && <button className="followButton" onClick={handleClick}>{ following ? "Follow" : "Unfollow"}</button>}
        </div>
        <div className="profileRight">

        <button className="followButton" onClick={() => openFollowers()}>Followers</button>

        <Popup trigger={buttonPopupFollwers} setTrigger={setbuttonPopupFollowers}>
            <h1>Followers</h1>

                {result.map((folowers) => (
                <div className="users" id={folowers[1].userId} onClick={userClick}>
                    <img
                    className="FriendImg"
                    src={folowers[1].profileImage}
                    alt=""
                     />
                    <span>{folowers[1].firstName + " " + folowers[1].lastName}</span>                
                </div>
                ))}
        </Popup>

        <button className="followButton" onClick={() => openFollowing()}>Following</button>

        <Popup trigger={buttonPopupFollwing} setTrigger={setbuttonPopupFollowing}>
            <h1>Following</h1>

                {result1.map((following) => (
                  console.log(following[1].firstName),
                <div className="users" id={following[1].userId} onClick={userClick}>
                    <img
                    className="FriendImg"
                    src={following[1].profileImage}
                    alt=""
                     />
                    <span>{following[1].firstName + " " + following[1].lastName}</span>                
                </div>
                ))}
        </Popup>
        </div>
      </div>
      <Feed posts={posts}/>
    </div>
  </div>
  );
};

export default Profile;
