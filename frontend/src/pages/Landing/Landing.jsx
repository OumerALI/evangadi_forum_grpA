import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import classes from "./landing.module.css";
import { Link } from "react-router-dom";
import PwChange from "../PwChange/PwChange";

const Landing = () => {
  // const [currentView, setCurrentView] = useState("signIn"); // Default to Sign In

  // const switchToSignUp = () => setCurrentView("signUp");
  // const switchToSignIn = () => setCurrentView("signIn");

  // State to track which form to show (Login, Register, or PasswordReset)
  const [currentForm, setCurrentForm] = useState("login"); // Default form is login

  // Function to switch to login form
  const switchToLogin = () => setCurrentForm("login");

  // Function to switch to register form
  const switchToRegister = () => setCurrentForm("register");

  // Function to switch to password reset form
  const switchToPasswordReset = () => setCurrentForm("passwordReset");

  return (
    <>
      {/* <Header /> */}

      <main>
        <div className={classes["form-container"]}>
          <div className={classes["form-wrapper"]}>
            {currentForm === "login" && (
              <Login
                switchToRegister={switchToRegister}
                switchToPasswordReset={switchToPasswordReset}
              />
            )}
            {currentForm === "register" && (
              <Register switchToLogin={switchToLogin} />
            )}
            {currentForm === "passwordReset" && (
              <PwChange
                switchToLogin={switchToLogin}
                switchToRegister={switchToRegister}
              />
            )}
          </div>
        </div>

        <div className={classes.info}>
          <h4>About</h4>
          <h1>Evangadi Networks</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>
          <p>
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <button>
            <Link to={"/howItWorks"}>HOW IT WORKS</Link>
          </button>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Landing;
