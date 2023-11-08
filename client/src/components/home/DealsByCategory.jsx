import React from "react";
import deals_by_category1 from "./deals_by_category1.jpg";
import deals_by_category2 from "./deals_by_category2.jpg";
import deals_by_category3 from "./deals_by_category3.jpg";
import poster from "./poster.jpg";

const DealsByCategory = () => {
  return (
    <>
      <section className="DealsByCategory">
        <div className="DealsByCategory-header text-center">
          <h5 className="DealsByCategory-title">Deals By Category</h5>
        </div>
        <div className="container DealsByCategory-cont">
          <div className="row mx-0 topbar-content">
            <div className="col-md-4 my-2">
              <div className="card DealsByCategory-card">
                <img
                  src={deals_by_category1}
                  className="card-img-top"
                  alt="..."
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            <div className="col-md-4 my-2">
              <div className="card DealsByCategory-card">
                <img
                  src={deals_by_category2}
                  className="card-img-top"
                  alt="..."
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            <div className="col-md-4 my-2">
              <div className="card DealsByCategory-card">
                <img
                  src={deals_by_category3}
                  className="card-img-top"
                  alt="..."
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="DealsByCategory-poster pb-5">
        <div className="container">
          <div className="img-cont">
            <img
              className="main_page_img d-flex justify-content-center align-item-center"
              src={poster}
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DealsByCategory;
