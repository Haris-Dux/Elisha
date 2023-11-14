import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const RelatedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  const item = useSelector(state => state.product.products).slice(0, 5)

  return (
    <>
      <section className="relatedProduct my-4 py-3">
        <div className="container text-center">
          <h3 className="fs-2 fw-bold">RELATED PRODUCTS</h3>
          <div className="relatedProduct-display">
            <div className="row mx-0 py-4 d-flex justify-content-around">
              {item.map((item) => {
                return (
                  <div key={item.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-2">
                    <div className="card relatedProduct-card mx-0 ">
                      <div onClick={() => handleItemClick(item.id)} style={{ cursor: "pointer" }}>
                        <img src={item.image.secure_url} className="card-img-top" alt="..." />
                      </div>
                      <div className="stitched-card-body-details text-start">
                        <p className="card-data stitched-card-data my-0">{item.name}</p>
                        <p className="card-data stitched-card-data my-0">Rs.{item.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedProducts;
