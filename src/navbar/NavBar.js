import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import UserContext from "../auth/UserContext";


function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Aid Me
        </NavLink>

        <Nav className="ml-auto" navbar>
          {!currentUser ?
            <NavItem>
              <NavLink to="/login">Login</NavLink>
              {/* <NavLink to="/signup">Sign Up</NavLink> */}
            </NavItem> :
            <NavItem>
              <NavLink to="/camps">Camps</NavLink>
              <NavLink to="/families">Families</NavLink>
              <NavLink to="/donations">Donations</NavLink>
              <NavLink to="/new/person">Create Person</NavLink>
              <NavLink className="logout" to="/" onClick={logout}>Log Out</NavLink>
            </NavItem> 
          }
        </Nav>
      </Navbar>
    </div>
  );
}


export default NavBar;
