import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToCart } from "../../features/WomenSlice";
import {
  getCategoryAsync,
  getCategoryTypeAsync,
} from "../../features/categorySlice";
import { getProductAsync } from "../../features/ProductSlice";

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

const UnStitchedAllProducts = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryType, selectedCategoryType] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [discountedProducts, setdiscountedProducts] = useState("");

  const [price, setPrice] = useState("");
  const productsref = useRef(null);
  useEffect(() => {
    dispatch(getCategoryAsync());
  }, []);

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
  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  // GET ALL PRODUCT
  const allProducts = useSelector((state) => state.product.products);

  // FILTER ALL PRODUCTS FOR UNSTITCHED PRODUCTS
  const unStitchedId = useSelector(
    (state) =>
      state.category.categories.find(
        (category) => category.name === "Unstitched"
      )?.id
  );

  // Filter products that belong to the "Women" category
  const unStitchedProducts = allProducts.filter(
    (product) => product.category === unStitchedId
  );

  let products = [];
  if (filteredProducts.length > 0) {
    products = filteredProducts;
  } else {
    products = unStitchedProducts;
  }

  useEffect(() => {
    if (unStitchedId) {
      dispatch(getCategoryTypeAsync({ category: unStitchedId }));
    }
  }, [dispatch, unStitchedId]);

  useEffect(() => {
    if (discountedProducts || (price && productsref.current)) {
      productsref.current.scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
    }
  });
  const categoriesType = useSelector((state) => state.category.categoriesType);

  const handleCategoyFiltering = (id) => {
    selectedCategoryType(id);
    const filteredProducts = allProducts.filter((product) => {
      return product.categoryType === id;
    });
    setFilteredProducts(filteredProducts);
  };

  const filterbyDiscount = () => {
    const discunted = unStitchedProducts.filter(
      (item) => item.discount === true
    );
    setdiscountedProducts(discunted);
    setFilteredProducts(discunted);
  };

  const filterbyPrice = (range) => {
    setPrice(range);
    let productsByPrice;
    if (range === "Low To High") {
      productsByPrice = unStitchedProducts
        .slice()
        .sort((a, b) => a.price - b.price);
    } else if (range === "High To Low") {
      productsByPrice = unStitchedProducts
        .slice()
        .sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(productsByPrice);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    dispatch(
      getProductAsync({ currentPage, limit, category: unStitchedId })
    ).then((response) => {
      setTotalPages(response.payload.productData.totalPages);
    });
  }, [dispatch, currentPage, limit, unStitchedId]);
  

  // Function to handle page navigation
  const goToPage = (currentPage) => {
    setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generating page number buttons
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li key={i}>
        <button
          onClick={() => goToPage(i)}
          className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
            currentPage === i
              ? "bg-[#E0D7CE] text-black"
              : "hover:bg-[#E0D7CE] hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
        >
          {i}
        </button>
      </li>
    );
  }

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

        {/* UnStitchedAllProducts -- MAPPING BODY */}
        <div ref={productsref} className="all-product-body">
          <div className="row mx-0">
            {products.map((product) => (
              <div key={product.id} className="col-md-3">
                <div className="card all-product-body-card my-2">
                  <div onClick={() => handleItemClick(product.id)}>
                    <img
                      src={product.image.secure_url}
                      className="card-img-top shadow"
                      alt="..."
                    />
                  </div>

                  <div className="card-body d-flex justify-content-between pt-3 px-0">
                    {/* ITEM DETAILS */}
                    <div className="card-body-details">
                      <p className="card-data stitched-card-data my-0">
                        {product.name}
                      </p>
                      <p className="card-data stitched-card-data my-0">
                        Rs.{product.price}
                      </p>
                    </div>
                    {/* Button */}
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

        {/* UnStitchedAllProducts -- PAGINATION */}
        <div className="container my-5">
          <nav aria-label="Page navigation example pagination-bar">
            <ul className="pagination d-flex justify-content-center align-items-center">
              <li className="page-item">
                <a className="page-link d-flex flex-row focus-ring focus-ring-light">
                  {pages.map((page) => page)}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UnStitchedAllProducts;
