import {React, useEffect, useState} from 'react';
import "./topbar.css";
import { Search } from "@material-ui/icons";
import { useLocalState } from "../../util/useLocalStorage";
import { useParams } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';


const Topbar = () => {

    const params = useParams();
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [image, setImage] = useState("");
    const [open, setOpen] = useState(false);

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

    return (
        <div className="topbarContainer">
      <div className="topbarLeft">
      <a className="logo">
          <span 
          onClick={() => redirectToHome()}
          >Tomcat</span>
          </a>
          {/* <HomeOutlinedIcon className="homeIcon" onClick={() => redirectToHome()}/> */}
      </div>
      <div className="topbarCenter">
         <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search"
            className="searchInput"
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
          <a onClick={() => redirectToProfile()}>Profile</a>
          </li>

          <li className = 'dropdownItem'>
          <a onClick={() => redirectToChangePassword()}>Change password</a>
          </li>

          <li className = 'dropdownItem'>
          <a onClick={() => redirectToChangeProfileImage()}>Change profile image</a>
          </li>

          <li className = 'dropdownItem'>
          <a onClick={() => logout()}>Logout</a>
          </li>

  
          </ul>
        </div>

      </div>
    </div>
    );
};

export default Topbar;
