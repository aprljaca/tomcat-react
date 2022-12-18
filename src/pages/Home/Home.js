import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from '../../components/sidebar/Sidebar';
import "./home.css";
import { useParams } from "react-router-dom";

const Home = () => {
  const params = useParams();

  const [userId, setUserId] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [imageName, setimageName] = useState("");


  return (
      <div>
         <Topbar />
      <div className="homeContainer">
      <Sidebar />
      </div>
      </div>

  );
};

export default Home;
