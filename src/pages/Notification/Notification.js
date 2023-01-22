import React, {useEffect, useState} from 'react';
import MiddlebarComment from '../../components/middlebar/MiddlebarComment';
import MiddlebarFollow from '../../components/middlebar/MiddlebarFollow';
import MiddlebarLike from '../../components/middlebar/MiddlebarLike';

import Topbar from '../../components/topbar/Topbar';
import { useLocalState } from "../../util/useLocalStorage";
import "./notification.css";

const Notification = () => {

  useEffect(() => getUserIdFromJWT(), []) 
  useEffect(() => getNotification(), []) 

  const [userId, setUserId] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [unreadFollowList, setUnreadFollowList] = useState("");
  const [unreadCommentList, setUnreadCommentList] = useState("");
  const [unreadLikeList, setUnreadLikeList] = useState("");

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

  function getNotification() {
    fetch("/v1/notifications", {
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
        setUnreadFollowList(body.unreadFollowList)
        setUnreadCommentList(body.unreadCommentList)
        setUnreadLikeList(body.unreadLikeList)
        //restNotificationNumber();
        setTimeout(function(){
          restNotificationNumber()
         }, 500);
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  function restNotificationNumber(){
    fetch("/v1/notificationNumberReset", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status == 200) {
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      })
      .then(() => {
        //redirectToNotification();
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  }
  
    return (
        <div>
            <Topbar/>
            <MiddlebarFollow list={unreadFollowList}/>
            <MiddlebarComment list={unreadCommentList}/>
            <MiddlebarLike list={unreadLikeList}/>
        </div>
    );
};

export default Notification;
