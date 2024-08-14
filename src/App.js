import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import NavBar from "./NavBar";
import NotFound from "./NotFound";
import AidMeApi from "./Api";

import CampList from "./CampList";
import CampDetail from "./CampDetail";
import CampNew from "./CampNew";
import CampFamily from "./CampFamily";

import Family from "./Family";
import FamilyList from "./FamilyList";
import FamilyAddDonation from "./FamilyAddDonation";

import DonationList from "./DonationsList";
import DonationDetail from "./DonationDetail";
import DonationNew from "./DonationNew";

import PersonNew from "./PersonNew";

import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./useLocalStorage";
import UserContext from "./UserContext";

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
              <Route path="/signup">
                <SignUp signup={signup} />
              </Route>
              <Route path="/profile">
                <Profile patchUser={patchUser} />
              </Route>
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