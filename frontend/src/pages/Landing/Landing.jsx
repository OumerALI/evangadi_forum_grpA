import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import classes from "./landing.module.css";
import { Link } from "react-router-dom";
import PwChange from "../PwChange/PwChange";

const Landing = () => {

  // State to track the current form
  const [currentForm, setCurrentForm] = useState("login");
  const [animationDirection, setAnimationDirection] = useState(""); 

  // Function to switch to login form
  const switchToLogin = () => {
    setAnimationDirection("slide-in-left");
    setTimeout(() => setCurrentForm("login"), 300); 
  };

  // Function to switch to register form
  const switchToRegister = () => {
    setAnimationDirection("slide-in-right");
    setTimeout(() => setCurrentForm("register"), 300);
  };

  // Function to switch to password reset form
  const switchToPasswordReset = () => {
    setAnimationDirection("slide-in-left");
    setTimeout(() => setCurrentForm("passwordReset"), 300);
  };

  return (
    <div className={classes["main__wrapper"]}>
      <main className={classes["main__container"]}>
        <div className={classes["form-container"]}>
          <div
            className={`${classes["form-wrapper"]} ${classes[animationDirection]}`}
          >
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
          <h1>Evangadi Networks Q & A</h1>
          <p>
            No matter what stage of life you are in, whether you are just
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
    </div>
  );
};

export default Landing;
