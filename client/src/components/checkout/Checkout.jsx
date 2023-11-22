import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartTotal } from '../../features/WomenSlice';
import { toast } from 'react-toastify';
import './checkout.css';
import { getuserAsync, updateuserAsync } from '../../features/authSlice';
import { createOrderAsync, currentOrder } from '../../features/orderSlice';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, totalPrice, totalQuantity, shippingCost } = useSelector(
        (state) => state.womenData
    );

    const user = useSelector((state) => state.auth.user);
    const userID = user.id;

    // Create state to manage form data and address added status
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        city: '',
        stateProvince: '',
        zipPostal: '',
    });

    // Initialize the address in the textarea
    const [addressInTextarea, setAddressInTextarea] = useState(user.address);

    // console.log(formData);

    const [isAddressAdded, setIsAddressAdded] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart]);

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // handleAddAddress
    const handleAddAddress = (e) => {
        e.preventDefault();
        if (Object.values(formData).every((value) => value.trim() !== '')) {
            const formattedAddress = `${formData.address}, ${formData.city}, ${formData.stateProvince}, ${formData.zipPostal}`;

            // Include user's ID, name, and email in the user data
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                address: formattedAddress,
                phone: formData.phone,
            };

            // Set the address in the textarea
            setAddressInTextarea(formattedAddress);

            dispatch(updateuserAsync(userData))
                .then(() => {
                    dispatch(getuserAsync({ id: userID }));
                    setIsAddressAdded(true);
                    // console.log('userData', userData);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        } else {
            toast.warn('Fill all details in forms before adding an address.');
        }
    };


    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };


    // Handle "Order Now" button click
    const handleOrderNow = () => {
        if (!user.address) {
            toast.warn('Add an address before ordering.');
            return;
        }

        if (!selectedPaymentMethod) {
            toast.warn('Select a payment method before ordering.');
            return;
        }

        // Check if the user's address is empty
        if (user.address.trim() === '') {
            toast.warn('Your address is empty. Please add an address before ordering.');
            return;
        }

        // Create the order object with the required information
        const order = {
            items: cart,
            userID: user.id,
            name: user.name,
            address: user.address,
            phone: user.phone,
            paymentMethod: selectedPaymentMethod,
            totalAmount: totalPrice,
        };
        console.log('order', order);


        dispatch(createOrderAsync(order))
            .then((response) => {
                console.log('response', response);
                dispatch(currentOrder())
                dispatch(clearCart())
                navigate("/ordersuccess");
            })
            .catch((error) => {
                console.error('Error placing the order:', error);
            });
    };

    return (
        <>
            <section className="checkout py-4">
                <div className="container">
                    <div className="row mx-0 d-flex justify-content-between">
                        <div className="col-md-12 col-lg-5 checkout-left my-3">
                            <h3 className="checkout-left-heading text-center pt-2">Personal Information</h3>
                            <p className="text-center checkout-left-text">Use a permanent address where you can receive mail.</p>

                            <form className="checkout-form py-2" action="" method="post">
                                <div className="mb-3">
                                    <input
                                        type="numeric"
                                        className="form-control checkout-form-control"
                                        id="phone"
                                        name="phone"
                                        aria-describedby="phone"
                                        placeholder="Phone Number"
                                        required
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control checkout-form-control"
                                        id="address"
                                        name="address"
                                        aria-describedby="address"
                                        placeholder="Street Address"
                                        required
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control checkout-form-control"
                                        id="city"
                                        name="city"
                                        aria-describedby="city"
                                        placeholder="City"
                                        required
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control checkout-form-control"
                                        id="state/province"
                                        name="stateProvince"
                                        aria-describedby="state/province"
                                        placeholder="State / Province"
                                        required
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control checkout-form-control"
                                        id="zip/postal"
                                        name="zipPostal"
                                        aria-describedby="zip/postal"
                                        placeholder="Zip / Postal"
                                        required
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div className="checkout-submit d-flex justify-content-center py-3">
                                    <button className="btn checkout-submit-btn w-75" type="button" onClick={handleAddAddress}>
                                        Add Address
                                    </button>
                                </div>
                            </form>

                            {/* ADDRESS-BAR CONT */}
                            <div className="address-cont">

                                {/* PAYMENT METHOD */}
                                <h4 className='mb-3 address-cont-heading'>Choose Payment Method:</h4>
                                <div className="payment-method my-2 d-flex ">
                                    <div className="form-check mx-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault1"
                                            value="Cash on Delivery"
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Cash on Delivery
                                        </label>
                                    </div>
                                    <div className="form-check mx-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                            value="Card Payment"
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Card Payment
                                        </label>
                                    </div>
                                </div>
                                {/* <h5 className=''>Your Current Address</h5> */}
                                <h4 className='py-2 mt-4 fs-5'>Your Current Address:</h4>
                                <textarea
                                    className="address-bar mb-1"
                                    name="address-bar"
                                    id="address-bar"
                                    rows="3"
                                    placeholder="Your Address Display Here"
                                    readOnly
                                    defaultValue={addressInTextarea}

                                />


                            </div>
                        </div>

                        {/* CHECKOUT - SUMMARY */}
                        <div className="col-md-12 col-lg-5 my-3">
                            <h3 className="fs-2 fw-bold">Cart</h3>
                            <hr />
                            <div className="checkout-summary-item d-flex justify-content-between">
                                <span className="text">Subtotal</span>
                                <span className="price">Rs.{totalPrice + shippingCost}</span>
                            </div>
                            <div className="checkout-summary-item d-flex justify-content-between">
                                <span className="text">Total Items</span>
                                <span className="price">{totalQuantity}</span>
                            </div>
                            <button className="btn summary-ordernow-btn btn-lg btn-block shadow mt-4 w-100" onClick={handleOrderNow}>
                                Order Now
                            </button>
                            <span className="return-to-home-link d-flex justify-content-center py-3">
                                or <Link className="back-to-home text-decoration-none ps-2" to="/">
                                    Continue Shopping
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
