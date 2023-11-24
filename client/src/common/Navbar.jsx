import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const handleLinkClick = () => {
    setNavbarOpen(false);
  };


  return (
    <nav className="navbar navbar-expand-lg py-2">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          {user && user.role === "admin" ? (
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/adminmainpage"
                  onClick={handleLinkClick}
                >
                  Admin
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/women"
                  onClick={handleLinkClick}
                >
                  Women
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/stitched"
                  onClick={handleLinkClick}
                >
                  Stitched
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/unstitched"
                  onClick={handleLinkClick}
                >
                  Unstitched
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/topsales"
                  onClick={handleLinkClick}
                >
                  TopSales
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/aboutus"
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-3"
                  to="/contactus"
                  onClick={handleLinkClick}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
