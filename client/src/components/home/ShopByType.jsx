import React from "react";
import topbar_img1 from "./topbar_img1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";

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


const ShopByType = ({ heading, slide }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slidesToShow, setSlidesToShow] = useState(slide);
  const allProducts = useSelector(state => state.product.products)

  // Filter only top sales products
  const filterdNames = allProducts.map((item) => item.fabric);
  const handleItemClick = (item) => {
    navigate(`/productbyfabric/${item}`);
    window.scrollTo(0, 0);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    // slidesToShow: 4,
    slidesToScroll: 1,
    slidesToShow: slidesToShow,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // autoplay: true,
  };

  // Update the number of slides based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSlidesToShow(4); // Full Desktop view
      } else if (window.innerWidth >= 1024) {
        setSlidesToShow(3); // Desktop view
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










  return (
    <>
      <section className="shop-by-type">
        <div className="container">
          {/* SHOP-BY-TYPE HEADER */}
          <div className="shop-by-type-header text-center">
            <h5 className="shop-by-type-title">SHOP BY FABRIC TYPE</h5>
          </div>

          {/* SHOP-BY-TYPE BODY */}
          <div className="shop-by-type-content px-3">
            <div className="row mx-0 shop-by-type-content-cont d-flex justify-content-center align-item-center">
              <Slider {...settings}>
                {filterdNames.map((item) => (
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-2 mx-3 my-2">
                    <div className="card shop-by-type-card">
                      <div className="parent-box">
                        <div className="child-box d-flex justify-content-center align-item-center">
                          <div className="child-box-img-cont">
                            <img
                              className="child-box_img"
                              src={topbar_img1}
                              alt=""
                              width="100%"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body shop-by-type-card-body">
                        <h5 className="card-title shop-by-type-card-title text-center">{item}</h5>
                        <a onClick={() => handleItemClick(item)} className="btn shop-by-type-cards-buttons">
                          SHOP NOW
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopByType;
