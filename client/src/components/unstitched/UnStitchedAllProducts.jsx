import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import unstitchedData from "./UnStitchedData";
import PretStyles from "../home/PretStyles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import { getCategoryAsync } from "../../features/categorySlice";

const UnStitchedAllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCategoryAsync());
  // }, []);

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  // Get all products
  const allProducts = useSelector(state => state.product.products);


  // Get the "Women" category ID
  const womenCategoryId = useSelector(state =>
    state.category.categories.find(category => category.name === "Unstitched")?.id
  );


  // Filter products that belong to the "Women" category
  const unStitchedProducts = allProducts.filter(product =>
    product.category === womenCategoryId
  );




  return (
    <section className="UnstitchedAllProducts py-4 my-3">
      <div className="container">
        {/* StitchedAllProducts -- HEADER */}
        <div className="StitchedAllProducts-header text-center">
          <h3 className="fs-3 fw-bold AllProducts-heading">WOMEN'S</h3>
          <h1 className="unStitchedAllProducts-header-subtitle fw-bold my-3">
            Unstitched Suit
          </h1>
          <p className="unStitchedAllProducts-header-text my-2">
            Elisha offers a vast selection of women's clothing tos shop. Each
            season finds a careful assortment of clothing no matter the season,
            trend-driven and classic pieces are available. Elisha is committed
            to helping shoppers be their most stylish selves.
          </p>
        </div>

        {/* UnStitchedAllProducts -- FILTER */}
        <div className="unStitchedAllProducts-filter">
          <div className="filter">
            <div className="buttons-list d-flex justify-content-center align-items-center flex-wrap py-2 my-5">
              {/* FILTER-BUTTON */}
              <button className="btn buttons-list-btn">
                <i className="fa-solid fa-filter me-2"></i>
                <span>Filter</span>
              </button>
              {/* SIZE-BUTTON */}
              <div className="dropdown my-2">
                <a
                  className="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Size
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                </ul>
              </div>
              {/* PRICE-BUTTON */}
              <div className="dropdown my-2">
                <a
                  className="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Price
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                </ul>
              </div>
              {/* DISCOUNT-BUTTON */}
              <div className="dropdown my-2">
                <a
                  className="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discount
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                </ul>
              </div>
              {/* SORT-BUTTON */}
              <button className="btn buttons-list-btn my-2">
                <span> Sort By</span>
              </button>
            </div>
          </div>
        </div>

        <PretStyles heading="Categories" slide={3} />

        {/* UnStitchedAllProducts -- MAPPING BODY */}
        <div className="all-product-body">
          <div className="row mx-0">
            {unStitchedProducts.map((product) => (
              <div key={product.id} className="col-md-3">
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

        {/* UnStitchedAllProducts -- PAGINATION */}
        <div className="container my-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination d-flex justify-content-center align-items-center flex-wrap">
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  Page
                </a>
              </li>
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  6
                </a>
              </li>
              <li className="page-item">
                <a className="page-link focus-ring focus-ring-light" href="#">
                  7
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section >
  );
};

export default UnStitchedAllProducts;
