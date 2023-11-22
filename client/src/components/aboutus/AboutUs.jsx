import React, { useEffect, useState } from "react";
import logo from "./no-bg-logo.png";
import aboutUsData from "./AboutUsData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./About.css";

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

const AboutUs = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
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
      <section className="aboutus">
        {/* SHOP-BY-TYPE BODY */}
        <div className="container">
          <div className="shop-by-type-content">
            <div className="row mx-0 shop-by-type-content-cont d-flex justify-content-center align-item-center">
              <Slider {...settings}>
                {aboutUsData.map((data) => (
                  <div key={data.id} className="shop-by-type-boxes col-sm-5 col-md-3 col-lg-3 col-xl-2 mx-2 my-2">
                    <div className="card aboutus-card">
                      <div className="parent-box">
                        <div className="child-box d-flex justify-content-center align-item-center">
                          <div className="child-box-text-cont">
                            {data.first_letter}
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h5 className="aboutus-card-title text-center">
                          {data.post}
                        </h5>
                        <a href="#" className="btn aboutus-cards-buttons">
                          {data.name}
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



      <section className="aboutusData">
        <div className="container">
          <h2 className="aboutus-title pt-2">Message From Managing Director:</h2>

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseZero" aria-expanded="true" aria-controls="collapseZero">
                  Dear valued fashion enthusiasts,
                </button>
              </h2>
              <div id="collapseZero" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <p> Fashion forward, trendsetters - the future belongs to Elisha! Be a
                    part of this captivating venture, and let's redefine fashion in
                    Pakistan and beyond.</p>

                  <p>Exciting news awaits you as we are thrilled to introduce our
                    brand-new clothing venture - Elisha! We are on the verge of
                    launching an online fashion emporium that will redefine your style,
                    elegance, and individuality.</p>

                  <p> At Elisha, we believe that fashion is more than just clothing; it's
                    a form of self-expression and an art of embracing one's uniqueness.
                    Our carefully curated collection will cater to all your fashion
                    desires, ensuring you step into the spotlight wherever you go.</p>

                  <p> Our team has worked tirelessly to bring you a diverse range of
                    high-quality apparel and accessories that embody the latest trends
                    and timeless classics. From chic casual wear to sophisticated formal
                    ensembles, we have something special in store for every occasion and
                    every taste.</p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Meet the Mastermind:
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  Allow me to introduce myself, Mehak Tariq, the Managing Director of
                  Elisha. With an unwavering passion for fashion and a vision to bring
                  forth a brand that resonates with the modern generation, I am
                  delighted to embark on this sartorial journey with you.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Stay Connected:
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  As the launch of our online store approaches rapidly, we encourage
                  you to stay connected with us. Bookmark our website domain -
                  theelisha.com - and be the first to e xperience our exclusive
                  collection. Additionally, you can reach out to us through the
                  provided contact details for any inquiries or to join our mailing
                  list.
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Visit Our Office:
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  For our patrons in Lahore, Pakistan, we invite you to our office
                  located at Landmark Plaza, Jail road. Come and get a sneak peek into
                  the world of Elisha while we prepare to unveil our digital
                  wonderland.
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Get Ready for Elisha:
                </button>
              </h2>
              <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  We are counting down the days until our grand opening, and we cannot
                  wait to share the Elisha experience with all of you. Your unwavering
                  support will be our guiding light as we embark on this exciting
                  journey together.
                </div>
              </div>
            </div>



            <p className="aboutus-text mt-5 pe-2">--</p>
            <h5>Mehak Tariq</h5>
            <p className="aboutus-text my-0 py-0">Managing Director, Elisha</p>
            <p className="aboutus-text my-0 py-0">Contact: +92 306 4313804</p>
            <p className="aboutus-text my-0 mb-5 py-0">Email: info@theelisha.com</p>


          </div>
        </div>


      </section>
    </>
  );
};

export default AboutUs;
