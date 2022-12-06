import {React, useEffect, useState} from 'react';
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { useLocalState } from "../../util/useLocalStorage";
import { useParams } from "react-router-dom";
import Post from '../../components/post/Post';
import { PostAddSharp } from '@material-ui/icons';

const Profile = () => {
  const params = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");

  const [posts, setPosts] = useState("");

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

  useEffect(() => getProfileInformation(), [])
  useEffect(() => getProfilePost(), [])

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{firstName} {lastName}</h4>
                <span className="profileInfoDesc">{userName}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed posts={posts}/>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
