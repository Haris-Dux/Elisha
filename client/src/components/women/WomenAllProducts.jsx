import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import { getProductAsync } from "../../features/ProductSlice";
import { getCategoryAsync, getCategoryTypeAsync } from "../../features/categorySlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const WomenAllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [dataToShow, setDataToShow] = useState("womenProducts");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryType, selectedCategoryType] = useState("");
  const productsref = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    // slidesToShow: 4,
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

  let products = [];
  if (filteredProducts.length > 0) {
    products = filteredProducts;
  } else {
    products = womenProducts;
  }

  useEffect(() => {
    if (womenCategoryId) {
      dispatch(getCategoryTypeAsync({ category: womenCategoryId }));
    }
  }, [dispatch, womenCategoryId]);

  const categoriesType = useSelector((state) => state.category.categoriesType);

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getProductAsync());
  }, [dispatch]);


  const handleCategoyFiltering = (id) => {
    selectedCategoryType(id);
    const filteredProducts = allProducts.filter((product) => {
      return product.categoryType === id;
    });
    setFilteredProducts(filteredProducts);
  };

  return (
    <>
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

      <section className="all-product">
        <div className="container">
          <div className="all-product-header text-center my-3 py-2">
            <h2 className="fs-2 fw-bold">PRODUCTS</h2>
          </div>

          <div ref={productsref} className="all-product-body">
            <div className="row mx-0">
              {products.map((product) => (
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
