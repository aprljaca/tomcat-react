import React from "react";
import { useLocalState } from "../../util/useLocalStorage";

const Home = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  function createPost() {
    const requestBody = {
      userName: "test1",
      password: "test2",
    };

    fetch("/v1/create", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "post",
      body: JSON.stringify(requestBody),
    });
  }

  return (
    <div>
      <button onClick={() => createPost()}> Create post </button>
    </div>
  );
};

export default Home;
