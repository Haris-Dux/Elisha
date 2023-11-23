import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    getCartTotal,
} from "../../features/WomenSlice";
import "./SuccessPage.css";

const SuccessPage = () => {
    const { cart, totalPrice, totalQuantity, shippingCost } = useSelector(
        (state) => state.womenData
    );
    return (
        <>
            <section className="successpage">
                <div className="container py-5">
                    <div className="row d-flex cart justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="d-flex justify-content-center border-bottom" style={{ backgroundColor: "#E0D7CE" }}>
                                    <div className="p-3">
                                        <div className="progresses">
                                            <div className="steps"> <span><i className="fa fa-check"></i></span> </div> <span className="line"></span>
                                            <div className="steps"> <span><i className="fa fa-check"></i></span> </div> <span className="line"></span>
                                            <div className="steps"> <span className="font-weight-bold">3</span> </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-0">
                                    <div className="col-md-12 border-right p-5" >
                                        <div className="text-center order-details">
                                            <div className="d-flex justify-content-center mb-5 flex-column align-items-center">
                                                <span className="check1"><i className="fa fa-check fs-4 text-light"></i></span>
                                                <span className="font-weight-bold fs-2">Order Confirmed</span>
                                                <small className="my-2 fs-5">Your Order will be delivered Soon</small>
                                                <small className="my-2 fs-5 fw-bold text-danger">Thank You</small>
                                                <Link to="/orderlist" className="my-2 fs-5 fw-bold text-decoration-none">Check Your Order List</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6 background-muted">
                                        <div className="p-3">

                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className='fs-5'><i className="fa fa-clock-o text-muted"></i> 3 days delivery</span>
                                            </div>

                                            <div className="mt-3 text-center">
                                                <h2 className="mb-0">Track Your Order</h2>
                                                <div className="tracking-process-list mt-3">
                                                    <div className="ready-to-ship fs-5">Order Done</div>
                                                    <div className="dispatch fs-5">dispatch</div>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="row g-0 border-bottom">
                                            <div className="col-md-6">
                                                <div className="p-3 d-flex justify-content-center align-items-center">
                                                    <span className='fs-5'>Total Items</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-3 d-flex justify-content-center align-items-center">
                                                    <span className='fs-5'>{totalQuantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-0 border-bottom">
                                            <div className="col-md-6">
                                                <div className="p-3 d-flex justify-content-center align-items-center">
                                                    <span className='fs-5'>Shipping fees</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-3 d-flex justify-content-center align-items-center">
                                                    <span className='fs-5'>{shippingCost}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-0">
                                            <div className="col-md-6">
                                                <div className="p-3 d-flex justify-content-center align-items-center">
                                                    <span className="fs-5 fw-bold">Total</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="p-3 d-flex justify-content-center align-items-center">
                                                    <span className="fs-5 fw-bold">{totalPrice + shippingCost}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div> </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default SuccessPage
