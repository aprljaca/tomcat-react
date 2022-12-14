import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

const Home = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  
  return (
    <div>
      <Topbar />
    </div>
  );
};

export default Home;
