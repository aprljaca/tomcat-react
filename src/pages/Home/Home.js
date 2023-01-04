import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";
import { useParams } from "react-router-dom";
import Share from '../../components/share/Share';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

const Home = () => {
  const params = useParams();

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [posts, setPosts] = useState("")

  useEffect(() => getFollowingPost(), [])

  function getFollowingPost() {
    fetch("/v1/followingPosts", {
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
    })
    .catch((error) => {
      alert(error.message);
    });
  }


  return (
    <div>
      <Topbar />
	  <div class="container">

	   <div class="content1">
     
    <div className="homeContainer">
      <div className="homeFeedWrapper">
      <Share/>
      </div>
      <Feed posts={posts}/>
    </div>

	   </div>
	   <div class="secondary ">
     <Rightbar/>
	   </div>
	</div>
    </div>
      

  );
};

export default Home;

