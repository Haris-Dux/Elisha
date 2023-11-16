import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import stitchedData from "./StitchedData";
import PretStyles from "../home/PretStyles";
import NewArrivals from "../home/NewArrivals";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import { getCategoryAsync, getCategoryTypeAsync } from "../../features/categorySlice";
import Top_Sales_cont from "../home/Top_Sales_cont";

const StitchedAllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [subCategories, setSubCategories] = useState([]);

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  const allProducts = useSelector(state => state.product.products);
  console.log('allProducts', allProducts);

  // FETCH STITCHED CATEGORY FROM STORE
  const womenCategoryId = useSelector(state => state.category.categories.find(category => category.name === "Stitched")?.id);

  // CALL TO GET ALL CATEGORIES-TYPES
  useEffect(() => {
    if (womenCategoryId) {
      dispatch(getCategoryTypeAsync({ category: womenCategoryId }));
    }
  }, [womenCategoryId, dispatch]);

  // Fetch the category types from the store
  const categoriesType = useSelector((state) => state.category.categoriesType);

  // Group products by category type
  const groupedProductsByType = allProducts.reduce((acc, product) => {
    const categoryType = categoriesType.find((type) => type.id === product.categoryType);
    if (categoryType) {
      if (!acc[categoryType.name]) {
        acc[categoryType.name] = [];
      }
      acc[categoryType.name].push(product);
    }
    return acc;
  }, {});


  // Sort the entries based on category type
  const sortedGroupedProducts = Object.entries(groupedProductsByType).sort(([a], [b]) => {
    // Adjust the sorting logic based on your specific category type names
    if (a === "Stitched 1pc") return -1;
    if (b === "Stitched 1pc") return 1;
    return a.localeCompare(b);
  });




  return (
    <>
      <section className="StitchedAllProducts py-4 my-3">
        <div className="container">
          {/* StitchedAllProducts -- HEADER */}
          <div className="StitchedAllProducts-header text-center">
            <h3 className="fs-3 fw-bold AllProducts-heading">WOMEN'S</h3>
            <h1 className="StitchedAllProducts-header-subtitle fw-bold my-3">
              Stitched Suit
            </h1>
            <p className="StitchedAllProducts-header-text my-2">
              Elisha offers a vast selection of women's clothing tos shop. Each
              season finds a careful assortment of clothing no matter the
              season, trend-driven and classic pieces are available. Elisha is
              committed to helping shoppers be their most stylish selves.
            </p>
          </div>

          {/* Un-StitchedAllProducts -- FILTER */}
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

          {/* StitchedAllProducts -- PERT STYLE */}
          <PretStyles heading="Categories" slide={3} />

          {/* StitchedAllProducts -- MAPPING BODY */}
          <div className="all-product-body">
            <div className="row mx-0">
              {sortedGroupedProducts.map(([categoryTypeName, products]) => (
                <div key={categoryTypeName}>
                  <h2 className="subcategory-heading text-center mt-3">{categoryTypeName}</h2>
                  <div className="row mx-0 my-4">
                    {products.map((product) => (
                      <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 ">
                        <div className="card all-product-body-card my-2">
                          <div onClick={() => handleItemClick(product.id)}>
                            <img src={product.image.secure_url} className="card-img-top shadow" alt="..." />
                          </div>
                          <div className="card-body d-flex justify-content-between align-item-center pt-3 px-0">
                            <div className="stitched-card-body-details">
                              <p className="card-data stitched-card-data my-0">{product.name}</p>
                              <p className="card-data stitched-card-data my-0">Rs.{product.price}</p>
                            </div>
                            <div className="stitched-card-body-button">
                              <button
                                className="btn stitched-card-body-button-btn"
                                onClick={() => dispatch(addToCart(product))}
                              >
                                <i className="fa-solid fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* StitchedAllProducts -- NEW ARRIVALS */}
          <NewArrivals heading="NEW ARRIVALS" />

          {/* StitchedAllProducts -- TOP SALES */}
          <Top_Sales_cont heading="TOP SALES" />

          {/* StitchedAllProducts -- PAGINATION */}
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
      </section>
    </>
  );
};

export default StitchedAllProducts;
