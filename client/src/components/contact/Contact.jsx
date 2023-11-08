import React from "react";
import logo from "./logo.png";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <section className="contactus">
        <div className="row mx-0">
          {/* SIGNUP --- RIGHT */}
          <div className="col-md-6 contactus-left  py-2">
            <div className="container contactus-left-cont d-flex justify-content-center align-items-center">
              <img className="logo" src={logo} alt="" width="200px" />
            </div>
          </div>
          {/* SIGNUP --- LEFT */}
          <div className="col-md-6 sign-right py-2">
            <div className="container contactus-right-cont text-center d-flex justify-content-center align-items-center flex-column">
              <h4 className="contactus-title fs-3 py-3">CONTACT US</h4>
              <form className="contactus-form mt-3">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="username"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    name="message"
                    className="form-control"
                    placeholder="Enter Message"
                    rows="5"
                  ></textarea>
                </div>

                <div className="contactus-button-list d-flex justify-content-between">
                  <button type="submit" className="btn contactus-btn my-2">
                    Contact Us
                  </button>
                  <div className="icons my-2 pt-2">
                    <i className="fa-brands fa-facebook-f fs-4 mx-4"></i>
                    <i className="fa-brands fa-tiktok fs-4 mx-4"></i>
                    <i className="fa-brands fa-instagram fs-4 mx-4"></i>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
