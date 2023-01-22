import React, {useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import "./comment.css";

const Comment = ({comments, postId}) => {

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

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
      getProfileInformation(body)
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
      setImage(body.profileImage)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  function sendComment(postId) {
    const requestBody = {
      postId: postId,
      text: text
    };

    fetch("/v1/commentPost", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "post",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status == 200) {
          return Promise.all([response.json(), response.headers]);
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      })
      .then(([body, headers]) => {
      })
      .catch((error) => {
        //alert(error.message);
      });
  }

  const handleClick = event => {
    console.log(event.currentTarget.id);
    sendComment(event.currentTarget.id);
    window.location.reload(false);
  };

    return (
      
      <div className="comments">
        
      <div className="write">
        <img className="commentImg" src={image} alt="" />

        <input 
        className="commmentInput"
        type="text" 
        placeholder="Write a comment" 
        value={text}
        onChange={(event) => setText(event.target.value)}/>

      
      <button className="sendButton" id={postId} onClick={handleClick}>Send</button>
        
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img className="commentImg" src={comment.profileImage} alt="" />
          <div className="infoa">
            <span className="commentSpan">{comment.firstName + " " + comment.lastName}</span>
            <p>{comment.text}</p>
          </div>
          <span className="date">{comment.createdTime}</span> 
        </div>
      ))}
    </div>
    
    

    );
};

export default Comment;