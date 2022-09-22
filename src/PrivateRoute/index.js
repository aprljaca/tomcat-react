import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";

const PrivateRoute = ({ children }) => {
  function ajax(url, reqestMethod, jwt, requestBody) {
    const fetchData = {
      headers: {
        "Content-Type": "application/json",
      },
      method: reqestMethod,
    };

    if (jwt) {
      fetchData.headers.Authorization = `Bearer ${jwt}`;
    }

    if (requestBody) {
      fetchData.body = JSON.stringify(requestBody);
    }

    return fetch(url, fetchData).then((response) => {
      if (response.status === 200) return response.json();
    });
  }

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    ajax(`/v1/validate?token=${jwt}`, "get", jwt).then((isValid) => {
      setIsValid(isValid);
      setIsLoading(false);

      if (isValid === true) {
        return children;
      } else {
        return <Navigate to="/login" />;
      }
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
