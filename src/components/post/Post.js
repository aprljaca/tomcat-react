import {React, useEffect, useState} from 'react';
import "./post.css";
import { useParams } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comment from '../comment/Comment';
import { useLocalState } from "../../util/useLocalStorage";
import DeleteIcon from '@mui/icons-material/Delete';


const Post = ({post}) => {
  const params = useParams();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [commentOpen, setCommentOpen] = useState(false);
  const [like, setLike] = useState(false)
  const [postId, setPostId] = useState("")
  const [myPost, setMyPost] = useState("")

  useEffect(() => isLiked(), [])
  useEffect(() => ifPostIsMine(), [])

  function isLiked(){
    setPostId(post[1].postId)
    if(post[1].isLiked==true){
      setLike(true)
    } else {
      setLike(false)
    }
  }

  function ifPostIsMine(){
    if(post[1].myPost==true){
      setMyPost(true)
    }
    else {
      setMyPost(false)
    }
  }

  function likeFunction(){
    if(like==true){
      dislikePost();
      setLike(false);
    } else {
      likePost();
      setLike(true);
    }
  }

  function likePost(){
    const requestBody = {
      postId: postId
    };
    fetch("/v1/like",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(requestBody),
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
      .catch((error) => {
        console.log(error.message);
        //alert(error.message);
      });
    
  }

  function dislikePost(){
    const requestBody = {
      postId: postId,
    };

    fetch("/v1/dislike",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
      body: JSON.stringify(requestBody),
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
      .catch((error) => {
        console.log(error.message);
      });
  }

  function deletePost(){
    const requestBody = {
      postId: postId,
    };

    fetch("/v1/deletePost",{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
      body: JSON.stringify(requestBody),
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
      .then((result) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

    return (
        <div id={post[1].postId} className="post">
        <div className="postContainer">
          <div className="postUser">
            <div className="userInfo">
              <img className="profileImg" src={post[1].profileImage} alt="" />
              <div className="details">
                  <span className="name">{post[1].firstName + " " + post[1].lastName}</span>
                <span className="date">{post[1].createdTime}</span>
              </div>
            </div>
            {/* {myPost && <MoreHorizIcon className="test"/>} */}
            {myPost && <DeleteIcon className="test" onClick={() => deletePost()}/> }
          </div>
          <div className="content">
            <p>{post[1].text}</p>
          </div>
          <div className="info">
            <div className="postItem" onClick={() => likeFunction()}>
              {like ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
              {post[1].likesNumber + " Likes"}
            </div>
            <div className="postItem" onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              {post[1].commentsNumber + " Comments"}
            </div>
            <div className="postItem">
              <ShareOutlinedIcon />
              Share
            </div>
          </div>
          {commentOpen &&  <Comment comments={post[1].commentInfoList} postId={post[1].postId}/>}
        </div>
      </div>
      );
};

export default Post;