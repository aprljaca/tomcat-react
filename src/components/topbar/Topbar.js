import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import { useParams } from 'react-router-dom';

import Badge from '@mui/material/Badge';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import Search from '@mui/icons-material/Search';

import "./topbar.css";

var stompClient =null;
const Topbar = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [image, setImage] = useState("");
    const [open, setOpen] = useState(false);

    const [notification, setNotification] = useState(0);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => getUserIdFromJWT(), [])
    useEffect(() => getNotificationNumber(), [])
    

    function test(){
      
      redirectToNotification();
    }

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
        setUserId(body.userId)
        setFirstname(body.firstName)
        setLastname(body.lastName)
        setUsername(body.userName)
        setImage(body.profileImage)
        connect(body);
      })
      .catch((error) => {
        alert(error.message);
      });
    }

    function connect(body) {
      let socket = new SockJS("/v1/stomp");
      stompClient = over(socket);
      stompClient.connect({}, function (frame) {
           stompClient.subscribe("/topic/notification/"+body.userId, function(greeting) {
            setNotification(count => {
              return count + 1;
           });
           //setMessages(messages => [...messages, greeting.body]);
          });
      }
    );
    }

    function redirectToHome(){
      window.location.href="/home";
    }
    function redirectToProfile(){
      window.location.href="/profile/"+userId;
    }
    function redirectToChangePassword(){
      window.location.href="/changePassword";
    }
    function redirectToChangeProfileImage(){
      window.location.href="/uploadImage";
    }
    function logout(){
      localStorage.clear();
      window.location.href="/login";
    }
    function redirectToNotification(){
      window.location.href="/notification";
    }

    // function restNotificationNumber(){
    //   fetch("/v1/notificationNumberReset", {
    //     headers: {
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //     method: "POST",
    //   })
    //     .then((response) => {
    //       if (response.status == 200) {
    //       } else {
    //         var error = new Error(
    //           "Error " + response.status + ": " + response.statusText
    //         );
    //         error.response = response;
    //         throw error;
    //       }
    //     })
    //     .then(() => {
    //       redirectToNotification();
    //     })
    //     .catch((error) => {
    //       console.log(error.message);
    //       alert(error.message);
    //     });
    // }

    function getNotificationNumber() {
      fetch("/v1/notificationNumber", {
        headers: {
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
        setNotification(body.unreadNotification)
      })
      .catch((error) => {
        alert(error.message);
      });
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          localStorage.setItem("inputValue", inputValue);
          window.location.href = "/users"
      }
    }

    return (
        <div className="topbarContainer">
      <div className="topbarLeft">
      <a className="logo">
          <span 
          onClick={() => redirectToHome()}
          >Tomcat</span>
          </a>
          {/* <HomeOutlinedIcon className="homeIcon" onClick={() => redirectToHome()}/> */}
          
          <Badge badgeContent={notification} color="primary" onClick={()=>test()}>
          <FavoriteIcon className="homeIcon"/>
          </Badge>

      </div>
      <div className="topbarCenter">
        
         <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search"
            className="searchInput"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div> 
        
      </div>
      <div className="topbarRight">
      <a className="userName">
          <span>{firstName + " " + lastName}</span>
      </a>
      
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        <img 
          src={image}
          alt="" 
          className="topbarImg"/>
        </div>
        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <ul>

          <li className = 'dropdownItem'>
            <AccountBoxIcon/>
          <a onClick={() => redirectToProfile()}>Profile</a>
          </li>

          <li className = 'dropdownItem'>
            <PasswordIcon/>
          <a onClick={() => redirectToChangePassword()}>Change password</a>
          </li>

          <li className = 'dropdownItem'>
            <AddPhotoAlternateIcon/>
          <a onClick={() => redirectToChangeProfileImage()}>Change profile image</a>
          </li>

          <li className = 'dropdownItem'>
            <LogoutIcon/>
          <a onClick={() => logout()}>Logout</a>
          </li>

          </ul>
        </div>

      </div>
    </div>
    );
};

export default Topbar;
