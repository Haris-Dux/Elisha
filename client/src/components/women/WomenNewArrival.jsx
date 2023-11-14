import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import women_newArrivals_1 from "./women_newArrivals_1.jpg";

const WomenNewArrival = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  const allProducts = useSelector(state => state.product.products);
  const BigImage = allProducts.filter(product => product.newArrival === true).slice(0, 1);
  const newArrival_left = allProducts.filter(product => product.newArrival === true).slice(1, 5);


  return (
    <>
      <section className="new-arrivals">
        <div className="container">
          <div className="all-product-header text-center my-3 py-2">
            <h2 className="fs-1 fw-bold">NEW ARRIVALS</h2>
          </div>
          <div className="new-arrivals-body">
            <div className="row mx-0">

              {BigImage.map((item) => {
                return (
                  <div className="col-md-6 new-arrivals-body-left" style={{ cursor: "pointer" }}>
                    <div onClick={() => handleItemClick(item.id)}>
                      <img src={item.image.secure_url} alt="" width="90%" />
                    </div>
                  </div>
                )
              })}
              <div className="col-md-6 new-arrivals-body-right">
                <div className="row mx-0">

                  {newArrival_left.map((item) => {
                    return (
                      <div key={item.id} className="col-md-6 my-4" style={{ cursor: "pointer" }}>
                        <div onClick={() => handleItemClick(item.id)}>
                          <img src={item.image.secure_url} alt="" width="90%" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WomenNewArrival;
