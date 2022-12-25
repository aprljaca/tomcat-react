import {React, useEffect, useState} from 'react';
import Post from "../post/Post";
import Share from "../share/Share";
import { useParams } from 'react-router-dom';
import { useLocalState } from "../../util/useLocalStorage";
import "./feed.css";

const Feed = ({posts}) => {
  var obj = posts;
  var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);

  const params = useParams();
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [shareOpen, setShareOpen] = useState(false);

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
          setShareOpen(false)
        } else {
          setShareOpen(true)
        }
        
      })
      .catch((error) => {
        alert(error.message);
      });
    }

    return (
        <div className="feed">
          <div className="feedWrapper">
          {shareOpen && <Share />}
          {result.map((p) => (
              <Post post={p} />
            ))}

          </div>
        </div>
      );
};

export default Feed;
