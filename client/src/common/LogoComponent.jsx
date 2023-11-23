import { useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartTotal } from "../features/WomenSlice";
import { clearUser, logoutuserAsync } from "../features/authSlice";
import { getAllOrderForUserAsync } from '../features/orderSlice';

const LogoComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // GET USER DATA
  const user = useSelector((state) => state.auth.user);

  const { cart, totalQuantity } = useSelector((state) => state.womenData);



  const handleOrderList = () => {
    dispatch(getAllOrderForUserAsync({ userID: user.id }))
      .then((response) => {
        console.log('response', response);
        navigate("/orderlist");
      })
  }


  // handle Logout
  const handleLogout = () => {
    dispatch(logoutuserAsync()).then(() => {
      dispatch(clearUser());
      dispatch(clearCart());

    });
  }



  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);

  return (
    <>
      <section className="logoComponent pt-2 ">
        <div className="row mx-0 ">
          {/* LOGOCOMPONENT LEFT */}
          <div className="col-md-9 logoComponent-left">
            <div className="logo-img-cont d-flex justify-content-center align-items-center">
              <Link to="/">
                <img
                  src={logo}
                  className="logo-img-cont-img"
                  alt=""
                  width="100px"
                />
              </Link>
            </div>
          </div>
          {/* LOGOCOMPONENT LEFT */}
          <div className="col-md-3 logoComponent-right d-flex justify-content-center align-items-center">
            <div className="cart-buttons py-3">

              {/* USER PROFILE ICON*/}
              <Link to="/signup">
                {user ? (
                  <>
                    <div className="dropdown username-dropdown">
                      <button
                        className="btn dropdown-toggle username-dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.name ? user.name.charAt(0) : 'Loading...'}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button onClick={handleOrderList} className="dropdown-item">
                            Order List
                          </button>
                        </li>
                        <li>
                          <h5 className="dropdown-item" onClick={handleLogout}>
                            Logout
                          </h5>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <i className="user fa-solid fa-user mx-3 fs-5"></i>
                )}
              </Link>


              {/* CART ICON */}
              <Link to="/cartpage" type="button" className="btn cart-button ps-0 position-relative">
                <i className="fa-solid fa-cart-shopping mx-2 fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQuantity}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogoComponent;
