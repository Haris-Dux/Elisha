import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const TopBar = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.product.products).slice(0, 20)

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="topbar my-4">
        <div className="topbar-cont">
          <div className="row mx-0 topbar-content">
            {products.map((product) => (
              <div key={product.id} className="phone-width col-sm-6 col-md-3">
                <div className="card all-product-body-card my-2">
                  <div onClick={() => handleItemClick(product.id)}>
                    <img
                      src={product.image.secure_url}
                      className="card-img-top shadow"
                      alt="..."
                    />
                  </div>

                  <div className="card-body d-flex justify-content-between pt-3 px-0">
                    <div className="card-body-details">
                      <p className="card-data stitched-card-data my-0">
                        {product.name}
                      </p>
                      <p className="card-data stitched-card-data my-0">
                        Rs.{product.price}
                      </p>
                    </div>
                    <div className="stitched-card-body-button">
                      <button
                        className="btn stitched-card-body-button-btn"
                        onClick={() => handleItemClick(product.id)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TopBar;
