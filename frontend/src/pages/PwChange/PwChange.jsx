import React, { useRef, useState } from "react";
// import axios from "../../Api/axiosConfig";
import classes from "./pwChange.module.css";
import { Link } from "react-router-dom";


const PwChange = ({ switchToLogin, switchToRegister }) => {
  
  return (
    <section className={classes["container"]}>
      <div className={classes["form"]}>
        <h2>Reset Your Password</h2>

        <p>
          Fill in your e-mail address below and we will send you an email with
          further instructions
        </p>

         <form>
          <input
            //   ref={emailDom}
            type="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <h6 onClick={switchToLogin}>Already have an account?</h6>
        <h6 onClick={switchToRegister}>Don't have an account?</h6>
      </div>
    </section>
  );
};

export default PwChange;
