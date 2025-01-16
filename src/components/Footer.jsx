import React from "react";
import "../css/Footer.css"; // You'll need to style the footer

// You can replace these with your actual links
const footerLinks = {
  mail: "mailto:bentamihai94@gmail.com", // Replace with your email
  linkedin: "https://www.linkedin.com/in/mihai-ben%C8%9Ba-69024920b/", // Replace with your LinkedIn profile URL
  github: "https://github.com/mihaibenta", // Replace with your GitHub URL
  cv: "/path/to/your-cv.pdf", // Replace with the actual path to your CV
};

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-icons">
        <a href={footerLinks.mail} target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </a>
        <a href={footerLinks.linkedin} target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="fa fa-linkedin" aria-hidden="true"></i>
        </a>
        <a href={footerLinks.github} target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="fa fa-github" aria-hidden="true"></i>
        </a>
        <a href={footerLinks.cv} target="_blank" rel="noopener noreferrer" className="footer-icon">
          <i className="fa fa-address-card" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
