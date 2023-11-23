import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const NewArrivals = ({ heading }) => {
  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  // const item = useSelector(state => state.womenData.item).slice(12, 16)
  const Womendata = useSelector(state => state.product.products).slice(0, 4)

  return (
    <>
      <section className="new-arrivals">
        <h3 className="new-arrivals-title text-center mt-1 mb-4 fw-bold fs-1 ">
          {heading}
        </h3>
        <div className="new-arrivals-cont">
          <div className="row mx-0">
            {/* FIRST IMAGE  */}
            {Womendata && Womendata.length > 0 ? (
              Womendata.map((item) => {
                return (
                  <div key={item.id} className="new-arrival-box col-sm-6 col-md-4 col-lg-3 my-2">
                    <div className="card new-arrivals-card">
                      <div onClick={() => handleItemClick(item.id)}>
                        <img
                          src={item.image.secure_url}
                          className="card-img-top shadow"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Handle the case when Womendata is null or empty
              <div className="col-12 text-center">
                <p>No data available.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewArrivals;
