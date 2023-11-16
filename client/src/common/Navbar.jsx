import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <>
      <nav className="navbar navbar-expand-lg py-0">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {user && user.role === "admin" ? (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/adminmainpage">
                    Admin
                  </Link>
                </li>
              </ul>

            ) : (
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/">
                    Suheer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/women">
                    Women
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/stitched">
                    Stitched
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/unstitched">
                    Unstitched
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/topsales">
                    TopSales
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/aboutus">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-3" to="/contactus">
                    Contact Us
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav >
    </>
  );
};

export default Navbar;
