import React, { useContext, useState } from "react";
import "./header.css";
// import logo from "../Images/logo2.png";
import headerLogo from "../../assets/images/EvangadiLogo.png";
// import { stateValue } from "../context/context";
import { AppState } from "../../App";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import MenuIcon from "@mui/icons-material/Menu";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  const token = localStorage.getItem("token");

  let [smallScreenLogout, setSmallScreenLogout] = useState(false);

  let navigate = useNavigate();
  let { user, setUser } = useContext(AppState);

  function logoutHandler() {
    localStorage.setItem("token", "");
    setUser("");
    navigate("/");
    window.location.reload();
  }

  // hamMenuHandler function: called when the hamburger menu (on small screens) is clicked
  function hamMenuHandler() {
    if (user) setSmallScreenLogout(!smallScreenLogout); // Toggle the visibility of the logout button on small screens
  }

  function signinHandler() {
    window.location.reload();
  }

  // function hamHandler() {
  //   if (user) setPhoneLogout(!phoneLogout);
  // }

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="py-3 shadow-lg position-sticky w-100 "
        style={{
          zIndex: "99",
          top: "0",
        }}
      >
        <Container>
          <Navbar.Brand href="/home">
            <img src={headerLogo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
          ></Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 ">
                {token && (
                  <Nav.Item>
                    <Nav.Link as={Link} to="/home">
                      Home
                    </Nav.Link>
                  </Nav.Item>
                )}
                <Nav.Item>
                  <Nav.Link as={Link} to="/howItWorks">
                    How it works
                  </Nav.Link>
                </Nav.Item>

                {token && (
                  <h6
                    style={{
                      cursor: "pointer",
                    }}
                    className="fw-bold py-2 px-3 c-pointer"
                    onClick={logoutHandler}
                  >
                    Log out
                  </h6>
                )}
              </Nav>

              {/* Sign in button */}
              {!token && (
                <Nav.Item>
                  <Link to={"/"}>
                    <Button
                      onClick={signinHandler}
                      className="px-5"
                      variant="primary"
                    >
                      SIGN IN
                    </Button>
                  </Link>
                </Nav.Item>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
