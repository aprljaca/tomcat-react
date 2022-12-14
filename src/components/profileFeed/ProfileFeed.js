import React, {Component} from 'react';
import Post from "../post/Post";
import "./feed.css";

const ProfileFeed = ({posts}) => {
  var obj = posts;
  var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);


    return (
        <div className="feed">
          <div className="feedWrapper">
          {result.map((p) => (
              <Post post={p} />
            ))}

          </div>
        </div>
      );
};

export default ProfileFeed;
