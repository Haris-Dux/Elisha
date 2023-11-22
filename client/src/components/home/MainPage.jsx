import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./component.css";
import main_page_img from "./main_page_img.jpg";
// import Mainbanner from "./Mainbanner.jpg";
// import Mainbanner from "./Mainbanner2.jpg";
import BannerImgData from "./BannerImgData.jsx";


const MainPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    autoplay: true,
  };


  return (
    <>
      <section className="main_page my-1">
        <div className="img-cont">
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
