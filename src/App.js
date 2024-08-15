import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./homepage/Home";
import NavBar from "./navbar/NavBar";
import NotFound from "./NotFound";
import AidMeApi from "./Api";

import CampList from "./camps/CampList";
import CampDetail from "./camps/CampDetail";
import CampNew from "./camps/CampNew";
import CampFamily from "./camps/CampFamily";

import Family from "./families/Family";
import FamilyList from "./families/FamilyList";
import FamilyAddDonation from "./families/FamilyAddDonation";

import DonationList from "./donations/DonationsList";
import DonationDetail from "./donations/DonationDetail";
import DonationNew from "./donations/DonationNew";

import PersonNew from "./person/PersonNew";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Profile from "./profile/Profile";

import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./useLocalStorage";

import UserContext from "./auth/UserContext";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(false);

  const [token, setToken] = useLocalStorage("token", null);

  async function login(loginData) {
    try {
      let token = await AidMeApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await AidMeApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return {success: false, errors}
    }
  }

  async function patchUser(pathData) {
    try {
      const res = await AidMeApi.updateUser(currentUser.username, pathData);
      setCurrentUser(res);
      return {success: true}
    } catch (e) {
      return {success: false}
    }
  }

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          AidMeApi.token = token;
          let currentUser = await AidMeApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
    }

    setIsLoading(false);
    getCurrentUser();

  }, [token]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{currentUser, setCurrentUser, logout, login, signup}}
        >
          <NavBar user={currentUser} logout={logout} />
          <main>
            <Switch>
              <Route exact path="/">
                <Home user={currentUser} />
              </Route>

              <Route exact path="/camps">
                <CampList />
              </Route>
              <Route path="/camps/:id">
                <CampDetail />
              </Route>
              <Route path="/new/camp">
                <CampNew />
              </Route>
              <Route path="/camp/:id/family">
                <CampFamily />
              </Route>

              <Route exact path="/families">
                <FamilyList />
              </Route>
              <Route exact path="/families/:id">
                <Family />
              </Route>
              <Route path="/families/:id/donations">
                <FamilyAddDonation />
              </Route>

              <Route exact path="/donations">
                <DonationList />
              </Route>
              <Route exact path="/donations/:id">
                <DonationDetail />
              </Route>
              <Route path="/new/donation">
                <DonationNew />
              </Route>

              <Route path="/new/person">
                <PersonNew />
              </Route>

              <Route path="/login">
                <Login login={login} />
              </Route>
              {/* <Route path="/signup">
                <SignUp signup={signup} />
              </Route>
              <Route path="/profile">
                <Profile patchUser={patchUser} />
              </Route> */}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}


export default App;