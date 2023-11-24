import React, { useState } from "react";
import logo from "../components/contact/logo.png"
import "./Sign.css";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createuserAsync } from "../features/authSlice";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState(false);

  // Initialize state variables for form inputs and error message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (user && user.role === 'user') {
      navigate("/");
    }
    else if (user && user.role === 'admin') {
      navigate("/adminmainpage");
    }
  }, [user, navigate]);


  // TOGGLE PASSWORD VISIBILITY
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  // Handle form input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(formData);

    // Remove the "cpassword" field from formData
    const { cpassword, ...formDataToSend } = formData;

    try {
      dispatch(createuserAsync(formDataToSend));
      toast.success("User Created Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="signup">
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
              <h4 className="sign-title fs-3 py-1">USER SIGNUP</h4>
              <form className="sign-form mt-2" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-inputs"
                    placeholder="Username"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-inputs"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-inputs"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
                  />
                </div> */}

                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-inputs"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <i className="far fa-eye"></i>
                        ) : (
                          <i className="far fa-eye-slash"></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>


                {/* <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-inputs"
                    placeholder="Confirm Password"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
                  />
                </div> */}

                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-inputs"
                      placeholder="Confirm Password"
                      name="cpassword"
                      value={formData.cpassword}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        {showPassword ? (
                          <i className="far fa-eye"></i>
                        ) : (
                          <i className="far fa-eye-slash"></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn sign-btn my-2">
                  Sign Up
                </button>

                <p>Already have an account? <Link className="login-link" to="/login">Login</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
