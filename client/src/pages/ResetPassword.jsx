import React, { useEffect, useState } from "react";
import logo from "../components/contact/logo.png"
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { resetpasswordAsync } from "../features/authSlice";
import { useDispatch } from "react-redux";
import "./Sign.css";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const resetToken = new URLSearchParams(window.location.search).get("t");


    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            // setIsLoading(true);
            dispatch(resetpasswordAsync({ newPassword, confirmPassword, resetToken }));
            //console.log(newPassword, confirmPassword, resetToken);

            // setIsLoading(false);
            // if (response.payload && response.payload.success) {
            // toast.success("Password reset successfully.");
            // navigate("/login");
            // } else {
            //     toast.error("Password reset failed. Please try again.");
            // }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            //toast.error("Password reset failed. Please try again.");
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
                            <h4 className="sign-title fs-2 py-1">RESET PASSWORD</h4>
                            <form className="sign-form mt-2" onSubmit={handleResetPassword}>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-inputs"
                                        placeholder="Password"
                                        name="password"
                                        autoComplete="new-password"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control form-control-inputs"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                </div>
                                <button type="submit" className="btn sign-btn my-2" disabled={isLoading}>
                                    {isLoading ? "Resetting..." : "Reset Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResetPassword;
