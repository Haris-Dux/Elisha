import React from "react";
import topbar_img1 from "./topbar_img1.jpg";
import topbar_img2 from "./topbar_img2.jpg";
import topbar_img3 from "./topbar_img3.jpg";

const TopBar = () => {
  return (
    <>
      <section className="topbar my-4">
        <div className="container">
          <div className="row mx-0 topbar-content">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4">
              <div className="card topbar-card">
                <img
                  src={topbar_img1}
                  className="card-img-top"
                  alt="..."
                  width="100%"
                  height="100%"
                />
                <div className="card-body topbar-card-body d-flex justify-content-between">
                  <span className="topbar-dress-code">ZCE23-1A</span>
                  <span className="topbar-dress-price">Rs.9,030</span>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4">
              <div className="card topbar-card">
                <img
                  src={topbar_img2}
                  className="card-img-top"
                  alt="..."
                  width="100%"
                  height="100%"
                />
                <div className="card-body topbar-card-body d-flex justify-content-between">
                  <span className="topbar-dress-code">ZCE23-1A</span>
                  <span className="topbar-dress-price">Rs.9,030</span>
                </div>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4">
              <div className="card topbar-card">
                <img
                  src={topbar_img3}
                  className="card-img-top"
                  alt="..."
                  width="100%"
                  height="100%"
                />
                <div className="card-body topbar-card-body d-flex justify-content-between">
                  <span className="topbar-dress-code">ZCE23-1A</span>
                  <span className="topbar-dress-price">Rs.9,030</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopBar;
