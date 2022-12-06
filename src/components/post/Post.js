import {React, useEffect, useState} from 'react';
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";

const Post = ({post}) => {
  const [like,setLike] = useState(post.likesNumber)
  const [isLiked,setIsLiked] = useState(false)
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  console.log(post)

  function getProfileInformation() {
    fetch("/v1/profileInformationData?userId="+ post[1].userId, {
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
      setFirstname(body.firstName)
      setLastname(body.lastName)
      setUsername(body.userName)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  useEffect(() => getProfileInformation(), [])

    return (
        <div className="post">
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <img
                  className="postProfileImg"
                  //src={}
                  alt=""
                />
                <span className="postUsername">
                  {userName}
                </span>
                <span className="postDate">{post[1].createdTime}</span>
              </div>
              <div className="postTopRight">
                <MoreVert />
              </div>
            </div>
            <div className="postCenter">
              <span className="postText">{post[1].text}</span>
              <img className="postImg" src={post.photo} alt="" />
            </div>
            <div className="postBottom">
              <div className="postBottomLeft">
                <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
                <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
                <span className="postLikeCounter">{post[1].likesNumber} people like it</span>
              </div>
              <div className="postBottomRight">
                <span className="postCommentText">{post[1].commentsNumber} comments</span>
              </div>
            </div>
          </div>
        </div>
      );
};

export default Post;