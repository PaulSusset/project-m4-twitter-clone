import React, { useContext } from "react";
import Logo from "../Logo";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { home, user, bell, bookmark } from "react-icons-kit/feather";
import { COLORS } from "../../constants";
import { CurrentUserContext } from "../CurrentUserContext/CurrentUserContext";
import Profile from "../Profile";

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  let handle = undefined;
  if (currentUser) {
    handle = currentUser.profile.handle;
    console.log("handle", handle);
  }
  return (
    <StyledSidebar>
      <Link to="/">
        <div style={{ marginLeft: "15px" }}>
          <StyledLogo />
        </div>
      </Link>
      <StyledLink exact to="/">
        <SidebarOption>
          <SidebarLogo size={25} icon={home} />
          Home
        </SidebarOption>
      </StyledLink>
      <StyledLink to="/notifications">
        <SidebarOption>
          <SidebarLogo size={25} icon={bell} />
          Notifications
        </SidebarOption>
      </StyledLink>
      <StyledLink to="/bookmarks">
        <SidebarOption>
          <SidebarLogo size={25} icon={bookmark} />
          Bookmarks
        </SidebarOption>
      </StyledLink>
      <StyledLink to={`/profile/${handle}`}>
        <SidebarOption>
          <SidebarLogo size={25} icon={user} />
          Profile
        </SidebarOption>
      </StyledLink>
      <Meow>Meow</Meow>
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  width: 260px;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  border-right: 1px lightgrey solid;
  padding: 15px;
  position: fixed;
`;
const SidebarOption = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: fit-content;
  box-sizing: border-box;
  /* text-align: center; */
  padding: 5px 15px;
  margin: 10px 10px 10px 15px;
  padding-left: 15px;

  border-radius: 9999px;
  transition: 100ms linear;
`;
const SidebarLogo = styled(Icon)`
  /* width: 30px; */
  padding: 10px;
  padding-left: 0px;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  width: 90%;
  /* margin: 10px 10px 10px 0; */
  font-size: 1.3rem;
  font-weight: 900;
  &:hover > div {
    background: ${COLORS.primaryBg};
    color: ${COLORS.primary};
  }
  &.active {
    color: ${COLORS.primary};
  }
`;
const StyledLogo = styled(Logo)`
  padding: 25px;
  margin-left: 15px;
`;
const Meow = styled.button`
  background: ${COLORS.primary};
  color: white;
  font-size: 1.3rem;
  font-weight: 900;
  font-family: inherit;
  width: 90%;
  padding: 10px 0;
  border-radius: 30px;
`;

export default Sidebar;
