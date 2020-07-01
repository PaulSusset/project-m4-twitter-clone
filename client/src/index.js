import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import CurrentUserProvider from "./Components/CurrentUserContext";

ReactDOM.render(
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>,
  document.getElementById("root")
);
