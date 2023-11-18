import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import NewArrivals from "../home/NewArrivals";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCategoryAsync, getCategoryTypeAsync } from "../../features/categorySlice";
import Top_Sales_cont from "../home/Top_Sales_cont";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa fa-long-arrow-alt-right"></i>
      </button>
    </div>
  );
};
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa fa-long-arrow-alt-left"></i>
      </button>
    </div>
  );
};

const StitchedAllProducts = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [subCategories, setSubCategories] = useState([]);

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 2,
    slidesToShow: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // autoplay: true,
  };
  // Update the number of slides based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4); // Desktop view
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // Tablet view
      } else {
        setSlidesToShow(1); // Mobile view
      }
    };

    // Initial update
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const allProducts = useSelector(state => state.product.products);
  // console.log('allProducts', allProducts);

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
  let sortedGroupedProducts = Object.entries(groupedProductsByType).sort(([a], [b]) => {
    // Adjust the sorting logic based on your specific category type names
    if (a === "Stitched 1pc") return -1;
    if (b === "Stitched 1pc") return 1;
    return a.localeCompare(b);
  });

  const [categoryType, selectedCategoryType] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [discountedProducts, setdiscountedProducts] = useState("");
  const [price, setPrice] = useState("");


  const filterbyPrice = (range) => {
    setPrice(range);
    console.log(range);
    let productsByPrice;
    if (range === "Low To High") {
      productsByPrice = sortedGroupedProducts
        .slice()
        .sort((a, b) => a.price - b.price);
    } else if (range === "High To Low") {
      productsByPrice = sortedGroupedProducts
        .slice()
        .sort((a, b) => b.price - a.price);
    }
    console.log(productsByPrice);
    setFilteredProducts(productsByPrice);
  };

  const filterbyDiscount = () => {
    const discunted = sortedGroupedProducts.filter(
      (item) => item.discount === true
    );
    //setdiscountedProducts(discunted);
    //setFilteredProducts(discunted);
  };

   //sortedGroupedProducts = [];
  if (filteredProducts.length > 0) {
    sortedGroupedProducts = filteredProducts;
  } else {
    sortedGroupedProducts = sortedGroupedProducts;
  }



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
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {price.length > 0 ? price : "Price"}
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => filterbyPrice("Low To High")}
                    >
                      Low To High
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => filterbyPrice("High To Low")}
                    >
                      High To Low
                    </a>
                  </li>
                </ul>
              </div>
               {/* DISCOUNT-BUTTON */}
              <button
                className="btn buttons-list-btn my-2"
                onClick={filterbyDiscount}
              >
                On Discount
              </button>
               
               
              </div>
            </div>
          </div>


          {/* CATEGORY-TYPE SLIDER */}
          <div className="scroll-bar">
            <section className="pert-style my-5">
              <div className="pret-style-header text-center">
                <h5 className="pret-style-title fs-1">Categories</h5>
              </div>

              <div className="pert-style-content">
                <Slider {...settings}>
                  {categoriesType.map((pretStyles) => {
                    return (
                      <div
                        className="container pert-style-cont my-5 py-3"
                        key={pretStyles.id}
                      >
                        <div className="card pert-style-card mx-0">
                          <div className="parent-box">
                            <div className="child-box d-flex justify-content-center align-item-center">
                              <div className="child-box-img-cont">
                                <img
                                  className="child-box_img"
                                  src={pretStyles.image.secure_url}
                                  alt=""
                                  width="100%"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="card-body pert-style-card-body">
                            <h5 className="card-title text-center">
                              {pretStyles.name}
                            </h5>
                            <a
                              onClick={() =>
                                handleCategoyFiltering(pretStyles.id)
                              }
                              className="btn shop-by-type-cards-buttons"
                            >
                              SHOP NOW
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </section>
          </div>


          {/* StitchedAllProducts -- MAPPING BODY */}
          <div className="all-product-body">
            <div className="row mx-0">
              {sortedGroupedProducts.map(([categoryTypeName, products]) => (
                <div key={categoryTypeName} id={categoryTypeName}>
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
