import {React, useEffect, useState} from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { useLocalState } from "../../util/useLocalStorage";
import { useParams } from "react-router-dom";
import ProfileFeed from '../../components/profileFeed/ProfileFeed';

const Profile = () => {
  //params uzima sa urla !
  const params = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [posts, setPosts] = useState("");
  const [imageName, setimageName] = useState("");

  function getProfileInformation() {
    fetch("/v1/profileInformationData?userId="+ params.userId, {
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
      setLastname(body.lastName)
      setUsername(body.userName)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  function getProfilePost() {
    fetch("/v1/profilePostData?userId="+ params.userId, {
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
      console.log(body)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  function getImageName() {
    fetch("/v1/downloadImage?userId="+ params.userId, {
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

  useEffect(() => getProfileInformation(), [])
  useEffect(() => getProfilePost(), [])
  useEffect(() => getImageName(), [])
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

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
          <div className="profileCover">
              <img
                className="profileUserImg"
                src={imageName}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{firstName} {lastName}</h4>
                <span className="profileInfoDesc">{userName}</span>
                <div>

                <button onClick={handleClick}>
              { following ? "Follow" : "Unfollow"}
              </button>

                </div>
                
            </div>
          </div>
          <div className="profileRightBottom">
            <ProfileFeed posts={posts}/>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
