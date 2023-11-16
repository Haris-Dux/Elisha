import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductByCategory = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.product.products);
  const filterdProducts = product.filter((item) => item.categoryType === id);

  const CategoriesType = useSelector((state) => state.category.categoriesType);
  const filterdCategoriesType = CategoriesType.filter((item)=>item.id === id)
 
  return (
    <>
      <section>
        <div className="StitchedAllProducts-header pt-5 text-center">
         {filterdCategoriesType.map((item)=>(
            <h1 className="StitchedAllProducts-header-subtitle fw-bold my-3">
           {item.name}
            </h1>
         )) }
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
                          onClick={() => dispatch(addToCart(product))}
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

export default ProductByCategory;
