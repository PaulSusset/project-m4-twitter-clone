import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Notifications from "../Notifications";
import Bookmarks from "../Bookmarks";
import TweetDetails from "../TweetDetails";
import Profile from "../Profile";
import HomeFeed from "../HomeFeed";
import Sidebar from "../Sidebar";
import TitleBar from "../TitleBar";

const App = () => {
  return (
    <Router>
      <StyledApp>
        <Sidebar />
        <StyledContent>
          <TitleBar />
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route path="/profile/:profileId">
              <Profile />
            </Route>
          </Switch>
        </StyledContent>
      </StyledApp>
    </Router>
  );
};

const StyledApp = styled.div`
  margin: 0;
  display: flex;
  height: 100%;
  color: black;
  text-decoration: none;
  &:visited {
    color: black;
    text-decoration: none;
  }
`;
const StyledContent = styled.div`
  margin-top: 66px;
  margin-right: 20%;
  border-right: 1px solid lightgrey;
  margin-left: 290px;
  max-width: 800px;
  width: 100%;
`;

export default App;
