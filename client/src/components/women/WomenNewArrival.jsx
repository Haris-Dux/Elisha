import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/WomenSlice";
import women_newArrivals_1 from "./women_newArrivals_1.jpg";
// import women_newArrivals_2 from "./women_newArrivals_2.jpg";
// import women_newArrivals_3 from "./women_newArrivals_3.jpg";
// import women_newArrivals_4 from "./women_newArrivals_4.jpg";
// import women_newArrivals_5 from "./women_newArrivals_5.jpg";

const WomenNewArrival = () => {

  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);

    window.scrollTo(0, 0);
  };

  const dispatch = useDispatch();
  const Womendata = useSelector(state => state.womenData.item).slice(17, 21);
  return (
    <>
      <section className="new-arrivals">
        <div className="container">
          <div className="all-product-header text-center my-3 py-2">
            <h2 className="fs-1 fw-bold">NEW ARRIVALS</h2>
          </div>
          <div className="new-arrivals-body">
            <div className="row mx-0">

              <div className="col-md-6 new-arrivals-body-left">
                <img src={women_newArrivals_1} alt="" width="90%" />
              </div>
              <div className="col-md-6 new-arrivals-body-right">
                <div className="row mx-0">

                  {Womendata.map((item) => {
                    return (
                      <div key={item.id} className="col-md-6 my-4" style={{ cursor: "pointer" }}>
                        <div onClick={() => handleItemClick(item.id)}>
                          <img src={item.image} alt="" width="90%" />
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
