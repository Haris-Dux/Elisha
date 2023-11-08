import React from "react";
import logo from "./Logo.png";
import "./Footer.css";

const Footer = () => {
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
            <ul>
              <li className="fs-6">Contact Us</li>
              <li className="fs-6">Delivery & Order</li>
              <li className="fs-6">Returns & Exchanges</li>
              <li className="fs-6">Terms & Conditions</li>
              <li className="fs-6">Privacy Policy</li>
              <li className="fs-6">Track My Order</li>
              <li className="fs-6">Payment Guide</li>
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
            <h5 className="fs-4">CURRENCY</h5>
            <p>PKR</p>
            <h5 className="fs-4">COMPANY</h5>
            <ul className="company-detail">
              <li className="fs-6">About Us</li>
              <li className="fs-6">Careers</li>
              <li className="fs-6">Store Locator</li>
              <li className="fs-6">Store addressess</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;  
