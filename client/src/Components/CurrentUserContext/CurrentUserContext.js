import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [currentPage, setCurrentPage] = useState("Home");
  useEffect(() => {
    fetch("/api/me/profile")
      .then(data => data.json())
      .then(data => {
        setCurrentUser(data);
        console.log(data);
        setStatus("idle");
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ status, setStatus, currentUser, currentPage, setCurrentPage }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
