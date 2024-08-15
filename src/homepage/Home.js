import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home({ user }) {
  return (
    <div className="Home">
      <h1>Aid Me</h1>
      <p>The goal of this website is to alleviate the burden on NGOs
        by offering a centralized tool designed to assist in every
        phase of creating, developing, executing, deploying, and
        managing plans and aid for areas affected by disasters.</p>
      {user ?
        <h2>Welcome Back, {user.firstName}</h2> :
        <div>
          <Link to="/login"><button>Login</button></Link>
          {/* <Link to="/signup"><button>Sign Up</button></Link> */}
        </div>
      }
    </div>
  );
}


export default Home;
