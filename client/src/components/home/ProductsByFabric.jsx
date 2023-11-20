import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const ProductsByFabric = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.products);
  const filterdProducts = product.filter((item) => item.fabric === id);

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section>
        <div className="StitchedAllProducts-header pt-5 text-center">
          <h1 className="StitchedAllProducts-header-subtitle fw-bold my-3">
            {id}
          </h1>
        </div>
      </section>
      <section>
        {/* UnStitchedAllProducts -- MAPPING BODY */}
        <div className="container">
          <div className="all-product-body">
            <div className="row mx-0">
              {filterdProducts.map((product) => (
                <div key={product.id} className="col-md-3">
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
        </div>
      </section>
    </>
  );
};

export default ProductsByFabric;
