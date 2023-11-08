import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import RelatedProducts from "./RelatedProducts";
import { addToCart } from "../../features/WomenSlice";
import { toast } from 'react-toastify';
import "./SelectedItem.css";


const SelectedItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);

  // Getting all data from slice
  const productData = useSelector(state => state.product.products);

  // filter given id's data in from all data 
  const product = productData.filter((item) => item.id === id);
  // console.log("filter", product);


  // HANDLE TO CART FUNCTION
  const handleAddToCart = () => {
    if (selectedSize) {
      const productWithSize = {
        ...product[0],
        selectedSize: selectedSize
      };

      dispatch(addToCart({ productWithSize: productWithSize }));

      console.log('productWithSize', productWithSize);

      toast.success('Product Added Successfully');
    } else {
      toast.error('Please select a size before adding to the cart.');
    }
  };


  return (
    <>
      <section className="selectedItem">
        <div className="container">

          {/* IMAGE-COLUMN-DISPLAYER */}
          {product.map((item) => {
            return (
              <>
                <div className="row mx-0 d-flex justify-content-evenly py-3" key={item.id}>
                  {/* Image Side */}
                  <div className="col-md-5 col-lg-6 my-2 selectedItem-img-cont">
                    <div className="selectedItem-img-cont-box">
                      <img src={item.image.secure_url} alt="" width="375px" />
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-5 py-5 selectedItem-img-details my-2 shadow">
                    <div className="selectedItem-img-details px-1">
                      <p className="item_name item-details">{item.name}</p>
                      <p className="item_type item-details">{item.categoryType}</p>
                      <p className="item_desc item-details">{item.description}</p>
                      <p className="item_price item-details py-2">Rs.{item.price}</p>

                      <p className="item_availability"><span className="fw-bold">Availability: </span>In stock</p>
                      <h5 className="fs-5 mt-4">Other Details:</h5>
                      <p className="item_code py-2"><span className="fw-bold">Code: </span>{item.itemCode}</p>

                      <p className="sizes-title pt-2 pb-0 mt-3 mx-2 fw-bold fs-4">Sizes</p>

                      <div className="sizes-bar my-2 py-2">
                        <ul className="size-buttons-list">
                          {item.size.map((item, index) => (
                            <li
                              key={index}
                              className={`size-button`}
                              onClick={() => {
                                setSelectedSize(item);
                                toast.success("Size Selected");
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="add-to-bag-cont d-flex justify-content-evenly align-items-center">

                        <div className="add-to-bag-button-cont py-2">
                          <button className="btn add-to-bag-button fs-6" onClick={handleAddToCart}>+ ADD TO BAG</button>
                        </div>
                      </div>

                      <div className="details-section my-3 py-2">
                        <h5 className="fs-3">Details:</h5>
                        <p className="item-detail">{item.productDetail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </section >

      <section className="reltedProduct">
        <RelatedProducts />
      </section>
    </>
  );
};

export default SelectedItem;
