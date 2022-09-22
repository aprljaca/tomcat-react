import React from "react";
import { useLocalState } from "../../util/useLocalStorage";

const Home = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  function createPost() {
    fetch("/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "post",
    });
  }

  return (
    <div>
      <button onClick={() => createPost()}> Create post </button>
    </div>
  );
};

export default Home;
