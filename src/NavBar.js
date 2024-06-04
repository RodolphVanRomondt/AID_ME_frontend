import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";


function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          {!currentUser ?
            <NavItem>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </NavItem> :
            <NavItem>
              <NavLink to="/companies">Companies</NavLink>
              <NavLink to="/jobs">Jobs</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink className="logout" to="/" onClick={logout}>Log Out {currentUser.username}</NavLink>
            </NavItem> 
          }
        </Nav>
      </Navbar>
    </div>
  );
}


export default NavBar;
