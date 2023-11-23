import React, { useState, useEffect } from "react";
import logo from "../components/contact/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginuserAsync } from "../features/authSlice";
import "./Sign.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    if (user && user.role === 'user') {
      navigate("/");
    }
    else if (user && user.role === 'admin') {
      navigate("/adminmainpage");
    }
  }, [user, navigate]);



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


  // TOGGLE PASSWORD VISIBILITY
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  // HANDLE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(loginuserAsync(logData));
      console.log("role", response.payload.data.userData.role);

      if (response.payload.data.userData.role === "user") {
        const fromCart = new URLSearchParams(location.search).get("from") === "cart";

        navigate(fromCart ? "/cartpage" : "/");
        scrollToTop();
      } else if (response.payload.data.userData.role === "admin") {
        navigate("/adminmainpage");
        scrollToTop();
      }
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
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-inputs"
                      placeholder="Password"
                      name="password"
                      value={logData.password}
                      onChange={handleInputChange}
                      autoComplete="password"
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

                <div className="mb-2 form-check d-flex justify-content-between">
                  <Link to="/forgetpassword" className="form-forget-password">Forgot Password?</Link>
                </div>

                <button type="submit" className="btn sign-btn">Login</button>

                <p className="mt-5">
                  Create an Account?
                  <Link className="signup-link" to="/signup">Sign Up</Link>
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
