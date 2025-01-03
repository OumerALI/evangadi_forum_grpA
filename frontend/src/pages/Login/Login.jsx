import React, { useRef, useState } from "react";
import axios from "../../Api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = ({ switchToRegister, switchToPasswordReset }) => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  // State to handle messages for login
  const [loginMessage, setLoginMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert("please provide all required informations");
      return;
    }

    try {
      const { data, status } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      if (status === 200 && data?.msg) {
        // Check if response is OK and then set success message
        setLoginMessage(data?.msg || "Login successful");
        setMessageType("success");

        localStorage.setItem("token", data.token);
        setTimeout(() => {
          navigate("/home");
          window.location.reload();
        }, 2000);
      } else {
        // If response is not successful, set error message
        setLoginMessage(data?.msg || "Login failed. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.msg || "Login failed. Please try again.";
      setLoginMessage(errorMessage);
      setMessageType("error");
    }
  }

  // password show and hide function
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={classes.form} id={classes["sign-in-form"]}>
        <h2>Login to your account</h2>
        {/* Display login message below the heading */}
        {loginMessage && (
          <p
            style={{
              color: messageType === "error" ? "red" : "green",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {loginMessage}
          </p>
        )}
        <p>
          Don’t have an account ?
          <span className={classes["toggle-link"]} onClick={switchToRegister}>
            Create a new account
          </span>
        </p>
        <form onSubmit={handleSubmit} action="">
          <input
            ref={emailDom}
            type="email"
            placeholder="Email address"
            required
          />
          <div className={classes["password-container"]}>
            <input
              ref={passwordDom}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className={classes["toggle-password-icon"]}
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <Link
            to={"/#"}
            style={{
              display: "block",
              textAlign: "right",
              marginBottom: "10px",
              textDecoration: "none",
            }}
            onClick={switchToPasswordReset}
          >
            Forgot password ?
          </Link>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
