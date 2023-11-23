import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    getCartTotal,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
} from '../../features/WomenSlice';
import './CartPage.css';
import cartImg from './cart_1.png';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // GET USER DATA
    const user = useSelector((state) => state.auth.user);

    // Get cart data
    const { cart, totalPrice, totalQuantity, shippingCost } = useSelector(
        (state) => state.womenData
    );
    // console.log('cart', cart);

    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart]);


    const handleCheck = () => {
        if (user) {
            navigate("/checkout");
            window.scrollTo(0, 0);
        }
        else {
            navigate("/login?from=cart");
            window.scrollTo(0, 0);
        }
    }

    return (
        <>
            {cart && cart.length > 0 ? (
                <section className="shopping-cart dark">
                    <div className="container">
                        <div className="block-heading">
                            <h2 className="shopping-cart-heading">Shopping Cart</h2>
                        </div>
                        <div className="content">
                            <div className="row mx-0 d-flex justify-content-between ">
                                <div className="col-md-12 col-lg-7 px-0">
                                    <div className="items">
                                        <div className="product">
                                            {cart.map((cartItem) => {
                                                // console.log('cartItem_img', cartItem.image.secure_url);
                                                const { selectedSize, quantity, id } = cartItem;

                                                return (
                                                    <div className="row" key={id}>
                                                        <div className="cart-content py-2 d-flex justify-content-between align-item-center">
                                                            <div className="col-xs-6 col-sm-6 col-md-4 cartPage-img-cont">
                                                                <img className="img-fluid mx-0 d-block image cart-image" src={cartItem.image.secure_url} alt="img" width="90%" height="90%" />
                                                            </div>

                                                            <div className="col-md-8">
                                                                <div className="info py-2 cart-details-cont">
                                                                    <div className="row d-flex justify-content-between ">
                                                                        <div className="col-md-7 product-name">

                                                                            {/* PRODUCTS DETAILS */}
                                                                            <div className="product_details mt-4">
                                                                                <h5><span className="value">{cartItem.name}</span></h5>
                                                                                <h5><span className="value">Rs. {cartItem.price}</span></h5>
                                                                                <h5 className="fs-5"> Desc: <span className="value fs-6"> {cartItem.description} </span></h5>

                                                                                {selectedSize && (
                                                                                    <h5>Selected Size: <span className="value">{selectedSize}</span></h5>
                                                                                )}

                                                                            </div>

                                                                        </div>

                                                                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-center cart-functions">
                                                                            <label className="form-label mb-3 cart-form-label" htmlFor="form1">Quantity</label>

                                                                            <div className="d-flex justify-content-center mb-4" style={{ maxWidth: '300px' }}>
                                                                                <button className="btn cart-btn me-2"
                                                                                    onClick={() => dispatch(decreaseItemQuantity({ id, selectedSize }))}>
                                                                                    <i className="fas fa-minus"></i>
                                                                                </button>

                                                                                <div className="form-outline">
                                                                                    <input
                                                                                        id="form1"
                                                                                        min="0"
                                                                                        name="quantity"
                                                                                        value={quantity}
                                                                                        type="number"
                                                                                        className="cart-form-control"
                                                                                        readOnly
                                                                                    />
                                                                                </div>

                                                                                <button className="btn cart-btn ms-2"
                                                                                    onClick={() => dispatch(increaseItemQuantity({ id, selectedSize }))}>
                                                                                    <i className="fas fa-plus"></i>
                                                                                </button>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn trash-btn btn-sm me-1 fs-4"
                                                                                    data-mdb-toggle="tooltip"
                                                                                    title="Remove item"
                                                                                    onClick={() => { dispatch(removeItem({ id, selectedSize })); toast.error("Product remove from cart") }}
                                                                                >
                                                                                    <i className="fas fa-trash"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-4 px-0">
                                    <div className="summary summary-details">
                                        <h3>Summary</h3>
                                        <div className="summary-item ">
                                            <span className="text">Quantity</span>
                                            <span className="price">{totalQuantity}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="text">Shipping</span>
                                            <span className="price">{shippingCost}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="text">Total</span>
                                            <span className="price">{totalPrice + shippingCost}</span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleCheck}
                                            className="btn summary-checkout-btn btn-md btn-block shadow mt-4"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="container">
                    <div className="row mx-0 text-center">
                        <div className="col-md-12 py-5">
                            <img src={cartImg} alt="No Item In Cart" width="170px" height="170px" />
                            <h3 className="no-item-in-cart ">
                                No Item In Cart: <br />
                                <span>Shop Now</span>
                                <Link to="/">
                                    <i className="fa-solid fa-bag-shopping px-3 py-4"></i>
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CartPage;
