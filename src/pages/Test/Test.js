import {React, useEffect, useState} from 'react';
import { useLocalState } from "../../util/useLocalStorage";


const Test = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    function likePost(postId){
        const requestBody = {
          postId: postId
        };
        console.log(JSON.stringify(requestBody))
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
            alert(error.message);
          });
      }

    return (
        <div>
        <button onClick={() => likePost(1)}> Dugme </button> 
        </div>
    );
};

export default Test;