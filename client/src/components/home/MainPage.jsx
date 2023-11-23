import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerImgData from "./BannerImgData.jsx";
import "./component.css";


const MainPage = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };


  return (
    <>
      <section className="main_page">
        <div className="img-cont" style={{ cursor: "pointer" }}>
          <Slider {...settings}>
            {BannerImgData.map((BannerImg) => (
              <img
                key={BannerImg.id}
                className="main_page_img d-flex justify-content-center align-item-center"
                src={BannerImg.cover}
                alt={BannerImg.altText}

              />
            ))}
          </Slider>

        </div>
      </section>
    </>
  );
};

export default MainPage;
