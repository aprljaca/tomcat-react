import React, {Component} from 'react';
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
//import { Posts } from "../../dummyData";

const Feed = ({posts}) => {
  var obj = posts;
  var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);


    return (
        <div className="feed">
          <div className="feedWrapper">
          <Share />
          {result.map((p) => (
              <Post post={p} />
            ))}

          </div>
        </div>
      );
};

export default Feed;
