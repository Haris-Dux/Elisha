import React, { useState, useEffect } from "react";
import logo from "../components/contact/logo.png";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginuserAsync } from "../features/authSlice";
import "./Sign.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // SCROLL TO TOP FUNCTION
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Initialize state variables for form inputs
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogData({
      ...logData,
      [name]: value,
    });
  };

  // HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginuserAsync(logData));

      console.log("role", response.payload.data.userData.role);

      if (response.payload.data.userData.role === "user") {
        // Check if the user came from the cart page
        const fromCart = new URLSearchParams(location.search).get("from") === "cart";

        // Redirect to the cart page if they came from there, otherwise, go to the home page
        navigate(fromCart ? "/cartpage" : "/");
        scrollToTop();
      } else if (response.payload.data.userData.role === "admin") {
        navigate("/adminmainpage");
        scrollToTop();
      }

      // Set your authentication token or user details in Cookies or state as needed
      // const token = response.accessToken;
      // Cookies.set("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="sign">
        <div className="row mx-0">
          {/* SIGNUP --- RIGHT */}
          <div className="col-md-6 sign-left">
            <div className="container sign-left-cont d-flex justify-content-center align-items-center">
              <img className="sign-logo" src={logo} alt="" width="200px" />
            </div>
          </div>
          {/* SIGNUP --- LEFT */}
          <div className="col-md-6 sign-right">
            <div className="container sign-right-cont text-center d-flex justify-content-center align-items-center flex-column">
              <h4 className="sign-title fs-3 py-1">USER LOGIN</h4>
              <form className="sign-form mt-2" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-inputs"
                    placeholder="Enter Email"
                    name="email"
                    value={logData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-inputs"
                    placeholder="Password"
                    name="password"
                    value={logData.password}
                    onChange={handleInputChange}
                    autoComplete="password"
                  />
                </div>

                <div className="mb-2 form-check d-flex justify-content-between">
                  <Link to="/forgetpassword" className="form-forget-password">
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="btn sign-btn">
                  Login
                </button>

                <p className="mt-3">
                  Create an Account?{" "}
                  <Link className="signup-link" to="/signup">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
