import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Top_Sales_cont = ({ heading }) => {
    const navigate = useNavigate();

    const handleItemClick = (itemId) => {
        navigate(`/selectedItem/${itemId}`);
        window.scrollTo(0, 0);
    };


    const allProducts = useSelector(state => state.product.products)

    // Filter only top sales products
    const topSalesProducts = allProducts.filter(product => product.topSales === true).slice(0, 4)


    return (
        <>
            <section className="new-arrivals">
                <h3 className="new-arrivals-title text-center mt-5 mb-4 fw-bold fs-1 ">
                    {heading}
                </h3>
                <div className="container new-arrivals-cont">
                    <div className="row mx-0">
                        {/* FIRST IMAGE  */}
                        {topSalesProducts && topSalesProducts.length > 0 ? (
                            topSalesProducts.map((item) => {
                                return (
                                    <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 my-2">
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

export default Top_Sales_cont;
