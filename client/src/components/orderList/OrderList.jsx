import React, { useEffect } from 'react'
import all_product_3 from "./all_product_3.jpg";
import "./orderlist.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderForUserAsync } from '../../features/orderSlice';

const OrderList = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);


    const orderList = useSelector((state) => [...state.order.allOrderForUsers]).reverse();

    useEffect(() => {
        dispatch(getAllOrderForUserAsync({ userID: user.id }));
    }, []);



    return (
        <>
            <section className="orderList py-4">
                <div className="orderList-cont">
                    <div className="orderList-header">
                        <h2 className='orderList-header-title py-2'>Orders Lists</h2>
                    </div>
                    <div className="orderList-body">
                        {/* PERFORM MAPPING HERE */}
                        {orderList.map((order) => {
                            return (
                                <div className="row mx-0 my-4 orderList-body-cont" key={order.id}>
                                    <div className="col-md-12 py-4">

                                        <h2 className='mb-3 order_id'>
                                            <span className="fw-bold">Order Id: </span>
                                            <p className="order-id-text pt-2">{order.id}</p>
                                        </h2>

                                        <h4 className='fs-4 order_status'>
                                            <span className="fw-bold">Order Status: </span>
                                            {order.status}
                                        </h4>

                                        <div className="orderList-displayer">
                                            {order.items.map((item) => {
                                                return (
                                                    <>
                                                        <div className="order_list_box d-flex justify-content-start py-2">
                                                            {/* IMAGE DISPLAY HERE */}
                                                            <div className="order_list_details-left me-5">
                                                                <img src={item.image.secure_url} alt="" width="170px" height="250px" />
                                                            </div>
                                                            {/* CONTENT DISPLAY HERE */}
                                                            <div className="order_list_details-right">
                                                                <div className="orderList-body-content">
                                                                    <h5 className='py-1 fs-4'>Order Details</h5>

                                                                    <p className='mb-2'><span className="fw-bold">Name: </span>{item.name}</p>
                                                                    <p className='mb-2'><span className="fw-bold">Price: </span>{item.price}</p>
                                                                    <p className='mb-2'><span className="fw-bold">Quantity: </span>{item.quantity}</p>
                                                                    <p className='mb-2'><span className="fw-bold">Selected Size: </span>{item.selectedSize}</p>
                                                                    <p className='mb-2'><span className="fw-bold">Item Code: </span>{item.itemCode}</p>
                                                                    <p className='mb-2'><span className="fw-bold">Description: </span>{item.description}</p>
                                                                    <div className="divider"><hr /></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>

                                        <div className="orderList-displayer-total">
                                            {/* SUBTOTAL */}
                                            <div className="subtotal d-flex justify-content-between align-item-center">
                                                <span className='orders-total'>Subtotal</span>
                                                <span className='orders-total'>Rs. {order.totalAmount}</span>
                                            </div>
                                            {/* SHIPPING ADDRESS */}
                                            <div className="shipping-address my-1 py-2">
                                                <h4 className='mb-3'>Shipping Address</h4>
                                                <textarea className='shipping-address-bar' name="" rows="3" value={order.address} placeholder='Shipping Address Show Here'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderList
