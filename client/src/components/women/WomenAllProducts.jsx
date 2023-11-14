import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import { getProductAsync } from "../../features/ProductSlice";
import { getCategoryAsync } from "../../features/categorySlice";

const WomenAllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryAsync());
  }, []);

  // Get all products
  const allProducts = useSelector(state => state.product.products);

  // Get the "Women" category ID
  const womenCategoryId = useSelector(state => state.category.categories.find(category => category.name === "Women")?.id);

  // Filter products that belong to the "Women" category
  const womenProducts = allProducts.filter(product =>
    product.category === womenCategoryId
  );

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getProductAsync());
  }, [dispatch]);

  return (
    <>
      <section className="all-product">
        <div className="container">
          <div className="all-product-header text-center my-3 py-2">
            <h2 className="fs-2 fw-bold">ALL PRODUCTS</h2>
          </div>

          <div className="all-product-body">
            <div className="row mx-0">
              {womenProducts.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card all-product-body-card my-2">
                    <div onClick={() => handleItemClick(product.id)}>
                      <img src={product.image.secure_url} className="card-img-top shadow" alt="..." />
                    </div>

                    <div className="card-body d-flex justify-content-between pt-3 px-0">
                      {/* ITEM DETAILS */}
                      <div className="card-body-details">

                        <p className="card-data stitched-card-data my-0">{product.name}</p>
                        <p className="card-data stitched-card-data my-0">Rs.{product.price}</p>

                      </div>
                      {/* Button */}
                      <div className="stitched-card-body-button">
                        <button className="btn stitched-card-body-button-btn" onClick={() => dispatch(addToCart(product))}>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WomenAllProducts;
