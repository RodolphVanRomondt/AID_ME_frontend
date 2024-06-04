import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home({ user }) {
  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs in one, convenient place.</p>
      {user ?
        <h2>Welcome Back, {user.firstName}</h2> :
        <div>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/signup"><button>Sign Up</button></Link>
        </div>
      }
    </div>
  );
}


export default Home;
