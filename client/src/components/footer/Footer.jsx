import React from "react";
import logo from "./Logo.png";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {

  const handleLinkClick = (itemId) => {
    window.scrollTo(0, 0);
  };


  return (
    <>
      <section className="footer align-item-center">
        <div className="row mx-0">
          {/* FIRST COLUMN */}
          <div className="footer-logo col-xs-6 col-sm-6 col-md-3 col-lg-3 my-2">
            <img className="footer-logo-img" src={logo} alt="logo" width="70%" />
          </div>
          {/* SECOND COLUMN */}
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 my-2 customer-service-list">
            <h5 className="fs-4">CUSTOMER SERVICE</h5>
            <ul className="d-flex flex-column lists">
              <Link to="/contactus" onClick={handleLinkClick} className="fs-6 text-decoration-none text-dark py-1">Contact Us</Link>
              <Link to="/delivery" onClick={handleLinkClick} className="fs-6 text-decoration-none text-dark py-1">Delivery & Order</Link>
              <Link to="/exchange" onClick={handleLinkClick} className="fs-6 text-decoration-none text-dark py-1">Returns & Exchanges</Link>
              <Link to="/privacypolicy" onClick={handleLinkClick} className="fs-6 text-decoration-none text-dark py-1">Privacy Policy</Link>
              <Link to="/orderlist" onClick={handleLinkClick} className="fs-6 text-decoration-none text-dark py-1">Track My Order</Link>
            </ul>
          </div>
          {/* THIRD COLUMN */}
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 my-2">
            <h5 className="fs-4">FOR ASSITANCE</h5>
            <div className="contact-number fs-6">Whatsapp: 0322 6773534</div>
            <div className="contact-number fs-6">Email: elisha@gmail.com</div>

            <div className="social-media-buttons my-5">
              <i className="fa-brands fa-facebook-f fs-4"></i>
              <i className="fa-brands fa-tiktok fs-4"></i>
              <i className="fa-brands fa-instagram fs-4"></i>
              <i className="fa-brands fa-youtube fs-4"></i>
            </div>
          </div>
          {/* FORTH COLUMN */}
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 my-2">
            <h5 className="fs-4">COMPANY</h5>
            <ul className="company-detail d-flex flex-column">
              <Link to="/aboutus" onClick={handleLinkClick} className="fs-6 text-decoration-none text-dark py-1">About Us</Link>
              <Link to="/contactus" onClick={handleLinkClick} className="fs-6 text-decoration-none text-dark py-1">Contact Us</Link>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;  
