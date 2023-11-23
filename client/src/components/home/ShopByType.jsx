import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import fabric images
import SilkImage from "./fabric_images/Silk.jpg";
import JamawarImage from "./fabric_images/Jamawar.jpg";
import CottonImage from "./fabric_images/Cotton.jpg";
import KhaddarImage from "./fabric_images/Khaddar.jpg";
import WoolImage from "./fabric_images/Wool.jpg";
import LinenImage from "./fabric_images/Linen.jpg";
import LawnImage from "./fabric_images/Lawn.jpg";
import ChiffonImage from "./fabric_images/Chiffon.jpg";
import FleeceImage from "./fabric_images/Fleece.jpg";

const fabricData = [
  { id: 1, image: SilkImage, name: "Silk" },
  { id: 2, image: JamawarImage, name: "Jamawar" },
  { id: 3, image: CottonImage, name: "Cotton" },
  { id: 4, image: KhaddarImage, name: "Khaddar" },
  { id: 5, image: WoolImage, name: "Wool" },
  { id: 6, image: LinenImage, name: "Linen" },
  // { id: 7, image: VelvetImage, name: "Velvet" },
  { id: 8, image: LawnImage, name: "Lawn" },
  // { id: 9, image: SatinImage, name: "Satin" },
  { id: 10, image: ChiffonImage, name: "Chiffon" },
  { id: 11, image: FleeceImage, name: "Fleece" },
];

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
  const allProducts = useSelector((state) => state.product.products);
  const [slidesToShow, setSlidesToShow] = React.useState(slide);

  const handleItemClick = (item) => {
    navigate(`/productbyfabric/${item}`);
    window.scrollTo(0, 0);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slidesToShow,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  React.useEffect(() => {
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
          <div className="shop-by-type-header text-center">
            <h5 className="shop-by-type-title">{heading}</h5>
          </div>
          <div className="shop-by-type-content px-3">
            <div className="row mx-0 shop-by-type-content-cont d-flex justify-content-center align-item-center">
              <Slider {...settings}>
                {fabricData.map((item) => (
                  <div key={item.id} className="col-xs-12 col-sm-4 col-md-4 col-lg-2 my-2">
                    <div className="card shop-by-type-card">
                      <div className="parent-box ">
                        {/* <div className="child-box d-flex justify-content-center align-item-center"> */}
                        {/* <div className="child-box-img-cont"> */}
                        <img className="child-box_img1" src={item.image} alt={item.name} width="100%" height="100%" />
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                      <div className="card-body shop-by-type-card-body">
                        <h5 className="card-title shop-by-type-card-title text-center">{item.name}</h5>
                        <a onClick={() => handleItemClick(item.name)} className="btn shop-by-type-cards-buttons">
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
