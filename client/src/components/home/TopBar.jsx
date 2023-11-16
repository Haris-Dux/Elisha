import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const TopBar = () => {
  const navigate = useNavigate();
  const products = useSelector(state => state.product.products).slice(0,12)

  const handleItemClick = (itemId) => {
    navigate(`/selectedItem/${itemId}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="topbar my-4">
        <div className="container">
          <div className="row mx-0 topbar-content">
          {products.map((data)=>(
            <div  onClick={()=>handleItemClick(data.id)} style={{cursor:'pointer'}} className="col-xs-6 col-sm-6 col-md-6 col-lg-3">
                <div className="card topbar-card">
                <img
                  src={data.image.secure_url}
                  className="card-img-top"
                  alt="..."
                  width="100%"
                  height="80%"
                />
                <div className="card-body topbar-card-body d-flex justify-content-between">
                  <span className="topbar-dress-code">{data.name}</span>
                  <span className="topbar-dress-price">RS {data.price}</span>
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
