import React, { useState } from "react";
import logo from "../components/contact/logo.png"
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { forgetuserAsync } from "../features/authSlice";
import "./Sign.css";

const ForgetPassword = () => {

    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.success("Reset Link Sent")
        dispatch(forgetuserAsync({ email: email }));
        setEmail("");

    }
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
                            <h4 className="sign-title py-1">FORGET PASSWORD</h4>
                            <form className="sign-form mt-2" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control form-control-inputs"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn sign-btn my-1">Send Email</button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ForgetPassword;
