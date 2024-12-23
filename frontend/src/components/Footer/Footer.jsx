import React from "react";
import classes from "./footer.module.css";
import Logo from "../../assets/images/EvangadiLogo-footer.png";
// Importing icons as alternatives to SVG images
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className={classes.social_icons}>
          <div>
            <Link to="#">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className={classes.socialMedia__link}>
            <Link to="#">
              <FaFacebookF />
            </Link>
            <Link to="#">
              <FaInstagram />
            </Link>
            <Link to="#">
              <FaYoutube />
            </Link>
          </div>
        </div>
        <div className={classes.links}>
          <h3>Useful Links</h3>
          <Link to="/howItWorks">How it works</Link>
          <Link to="/termsAndConditions">Terms of Service</Link>
          <Link to="/privacy">Privacy policy</Link>
        </div>
        <div className={classes.contact_info}>
          <h3>Contact Info</h3>
          <span>Evangadi Networks</span>
          <span>
            Email:<Link to="mailto:support@evangadi.com">support@evangadi.com</Link>
          </span>
          <span>Phone: +1-202-386-2702</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
