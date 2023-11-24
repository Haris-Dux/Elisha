import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PretStyles from "../home/PretStyles";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  getCategoryAsync,
  getCategoryTypeAsync,
} from "../../features/categorySlice";

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

const TopSalesAllProducts = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [size, selectedSize] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryType, selectedCategoryType] = useState("");
  const sizes = ["XS", "S", "M", "L", "XL"];
  const productsref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoryAsync())
  }, [dispatch])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 2,
    slidesToShow: slidesToShow,
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

  // GETTING ALL PRODUCTS
  const allProducts = useSelector((state) => state.product.products);


  const topSalesProducts = allProducts.filter(
    (product) => product.topSales === true
  );

  // HERE WE GET THE ALL THE CATEGORIES --> AND EXTRACT ALL THE CATEGORYTYPE OF EVERY CATEGORY 
  const categories = useSelector((state) => state.category.categories);
  const categoriesType = useSelector((state) => state.category.categoriesType);

  const ids = categories.map((category) => category.id);
  useEffect(() => {
    if (categories) {
      dispatch(getCategoryTypeAsync({ category: ids }));
    }
  }, [dispatch, categories]);


  const filterProductsByPrice = (range) => {
    setSelectedPriceRange(range);
    const filteredProducts = topSalesProducts.filter((product) => {
      const [min, max] = range.split(" - ");
      const price = parseInt(product.price);
      return price >= parseInt(min) && price <= parseInt(max);
    });
    setFilteredProducts(filteredProducts);
  };

  let products = [];
  if (filteredProducts.length > 0) {
    products = filteredProducts;
  } else {
    products = topSalesProducts;
  }
  useEffect(() => {
    if (selectedPriceRange || size || (categoryType && productsref.current)) {
      productsref.current.scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
    }
  });

  const filterProductsBySize = (size) => {
    selectedSize(size);
    const filteredProducts = topSalesProducts.filter((item) => {
      return item.size.includes(size);
    });
    setFilteredProducts(filteredProducts);
  };

  const handleCategoyFiltering = (id) => {
    selectedCategoryType(id);
    const filteredProducts = topSalesProducts.filter((product) => {
      return product.categoryType === id;
    });
    console.log(filteredProducts);
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
      <section className="StitchedAllProducts py-4 my-3">
        <div className="StitchedAllProducts-cont">
          {/* StitchedAllProducts -- HEADER */}
          <div className="StitchedAllProducts-header text-center">
            <h3 className="fs-3 fw-bold AllProducts-heading">WOMEN'S</h3>
            <h1 className="topsale-header-subtitle fw-bold my-3">Top Sales</h1>
            <p className="topsale-header-text fs-4 my-2">
              Elisha offers a vast selection of women's clothing tos shop. Each
              season finds a careful assortment of clothing no matter the
              season, trend-driven and classic pieces are available. Elisha is
              committed to helping shoppers be their most stylish selves.
            </p>
          </div>

          {/* TOPSALE -- FILTER */}
          <div className="unStitchedAllProducts-filter">
            <div className="filter">
              <div className="buttons-list d-flex justify-content-center align-items-center flex-wrap py-2 my-5">
                {/* SIZE-BUTTON */}
                <div className="dropdown my-2">
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {size.length > 0 ? size : "Size"}
                  </a>

                  <ul className="dropdown-menu">
                    {sizes.map((size) => (
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => filterProductsBySize(size)}
                        >
                          {size}
                        </a>
                      </li>
                    ))}
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
                    {selectedPriceRange.length > 0
                      ? selectedPriceRange
                      : "Price"}
                  </a>

                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" onClick={() => filterProductsByPrice("0 - 1500")}>
                        0 - 1500
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => filterProductsByPrice("1500 - 3000")}>
                        1500 - 3000
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={() => filterProductsByPrice("3000 - 100000")}>
                        3000 - 5000
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => filterProductsByPrice("5000 - 10000")}
                      >
                        5000 - 10000
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-bar">
            {/* PERTSTYLE */}
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
          <div ref={productsref} className="all-product-body">
            <div className="row mx-0">
              {products.map((item) => {
                return (
                  <div key={item.id} className="phone-width col-sm-4 col-md-3">
                    <div className="card all-product-body-card my-2">
                      <div onClick={() => handleItemClick(item.id)}>
                        <img
                          src={item.image.secure_url}
                          className="card-img-top shadow"
                          alt="..."
                        />
                      </div>
                      <div className="card-body d-flex justify-content-between pt-3 px-0">
                        {/* ITEM DETAILS */}
                        <div className="card-body-details">
                          <p className="card-data stitched-card-data my-0">
                            {item.name}
                          </p>
                          {/* <p className="card-data stitched-card-data my-0">{item.product_type}</p> */}
                          <p className="card-data stitched-card-data my-0">
                            Rs.{item.price}
                          </p>
                        </div>
                        {/* Button */}
                        <div className="stitched-card-body-button">
                          <button
                            className="btn stitched-card-body-button-btn"
                            onClick={() => handleItemClick(item.id)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopSalesAllProducts;
