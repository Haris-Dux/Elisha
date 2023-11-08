import React, { useEffect, useState } from "react";
import pretStyles from "./PertStyleData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import topbar_img1 from "./topbar_img1.jpg";

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

const PretStyles = ({ heading, slide }) => {
  const [slidesToShow, setSlidesToShow] = useState(slide);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    // slidesToShow: 4,
    slidesToScroll: 2,
    slidesToShow: slidesToShow,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // autoplay: true,
  };

  // Update the number of slides based on screen size
  useEffect(() => {
    const handleResize = () => {
      // if (window.innerWidth >= 1200) {
      //   setSlidesToShow(4); // Full Desktop view
      // } else 
      if (window.innerWidth >= 1024) {
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
      <section className="pert-style my-5">
        <div className="pret-style-header text-center">
          <h5 className="pret-style-title fs-1">{heading}</h5>
        </div>

        <div className="pert-style-content">
          <Slider {...settings}>
            {pretStyles.map((pretStyles) => {
              return (
                <div className="container pert-style-cont my-5 py-3" key={pretStyles.id}>
                  <div className="card pert-style-card mx-0" >
                    <div className="parent-box" >
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
                    <div className="card-body pert-style-card-body">
                      <h5 className="card-title text-center">
                        {pretStyles.category}
                      </h5>
                      <a href="#" className="btn shop-by-type-cards-buttons">
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
    </>
  );
};

export default PretStyles;
