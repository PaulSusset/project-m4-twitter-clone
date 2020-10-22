import React, { createContext, useState, useEffect } from "react";
import { ip } from "../../constants";

export const CurrentUserContext = createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [currentPage, setCurrentPage] = useState("Home");
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(`${ip}/api/me/profile`)
      .then((data) => data.json())
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        status,
        setStatus,
        currentUser,
        currentPage,
        setCurrentPage,
        error,
        setError,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
