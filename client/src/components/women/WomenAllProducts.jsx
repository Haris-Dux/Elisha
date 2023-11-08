import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import Womendata from "./Womendata";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import { useEffect } from "react";
import { getProductAsync } from "../../features/ProductSlice";

const WomenAllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const Womendata = useSelector(state => state.product.products);
  // console.log("Womendata", Womendata);


  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };



  // useEffect(() => {
  //   dispatch(getProductAsync());
  // }, [dispatch]);



  return (
    <>
      <section className="all-product">
        <div className="container">
          <div className="all-product-header text-center my-3 py-2">
            <h2 className="fs-2 fw-bold">ALL PRODUCTS</h2>
          </div>

          <div className="all-product-body">
            <div className="row mx-0">

              {/* {Womendata.map((Womendata) => {
                return (
                  <div key={Womendata.id} className="col-sm-6 col-md-4 col-lg-4">
                    <div className="card all-product-body-card my-2">
                      <div onClick={() => handleItemClick(Womendata.id)}>
                        <img src={Womendata.image.secure_url} className="card-img-top shadow" alt="..." />
                      </div>

                      <div className="card-body card-body-detail-section">
                        <div className="card-body-detail d-flex flex-column">
                          <h5 className="card-data">
                            {Womendata.name}
                          </h5>
                          <h5 className="card-data">
                            {Womendata.itemCode}
                          </h5>
                          <h5 className="card-data">
                            Rs.{Womendata.price}
                          </h5>
                        </div>
                        <div className="card-body-button mx-0">
                          <button className="btn women-card-body-button-btn" onClick={() => dispatch(addToCart(Womendata))}>
                            Add Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WomenAllProducts;
