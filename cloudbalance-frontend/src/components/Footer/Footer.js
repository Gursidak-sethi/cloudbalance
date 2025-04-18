import React from "react";
import styles from "./Footer.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.followContainer}>
        <h2>Follow Us</h2>
        <Link
          className={styles.links}
          to={
            "https://www.linkedin.com/company/cloudkeeper/posts/?feedView=all"
          }
          target="_BLANK"
        >
          <LinkedInIcon />
        </Link>
        <Link
          className={styles.links}
          to={"https://x.com/cloud_keeper"}
          target="_BLANK"
        >
          <XIcon />
        </Link>
        <Link
          className={styles.links}
          to={"https://www.youtube.com/@CloudKeeper"}
          target="_BLANK"
        >
          <YouTubeIcon />
        </Link>
      </div>

      <div className={styles.policyContainer}>
        <Link className={styles.links}>Privacy Policy</Link>
        <Link className={styles.links}>Responsible Disclosure</Link>
      </div>

      <div className={styles.copyrightContainer}>
        <img src={logo} alt="CloudBalance" className={styles.logo} />
        <strong> Copyright &copy; 2025</strong>
      </div>
    </div>
  );
};

export default Footer;
