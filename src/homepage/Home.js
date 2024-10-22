import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home({ user }) {
  return (
    <div className="Home">
      {user ?
        <h1>Welcome Back, {user.firstName}</h1> :
        <h1>Welcome</h1>
      }

      <p>Aid Me, a cutting-edge platform designed to transform how NGOs and humanitarian organizations manage disaster relief efforts.
        Aid Me is a database-driven application that supports every stage of the aid process—from strategic planning and development to real-time
        execution and management. By integrating up-to-date data from external APIs, Aid Me equips organizations with the insights needed to
        coordinate effectively, allocate resources wisely, and respond quickly to crises.</p>

      <p>This platform tackles the logistical complexities of disaster response, enabling teams to focus on delivering critical, timely aid.
        Aid Me streamlines operations, minimizes administrative overhead, and fosters collaboration, making it easier for organizations to
        provide impactful assistance. Whether working on long-term recovery strategies or responding to immediate emergencies, Aid Me
        centralizes essential tools and information, optimizing workflows for better results.</p>

      <p>Developed based on direct experience in international aid operations, Aid Me is tailored to address the unique challenges of disaster relief.
        It empowers organizations to enhance their efficiency, improve decision-making, and ultimately make a greater difference in communities
        affected by disasters.</p>

      {user ?
        "" :
        <div>
          <p>
            <small>
              <i>Test the website using the <strong>username: 'admin'</strong> and <strong>password: 'admin'</strong>.
                User creation should be handled exclusively by the administrator and only via the API.</i>
            </small>
          </p>
          <Link to="/login"><button>Login</button></Link>
        </div>
      }

    </div>
  );
}


export default Home;
