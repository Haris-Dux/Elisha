import React, { useEffect, useState } from 'react'
import "./AdminOrderList.css";
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderForAdminAsync, updateOrderAsync } from '../../features/orderSlice';

const AdminOrderList = () => {
    const dispatch = useDispatch();

    // ALL ORDER DETAILS GET HERE
    const AllOrders = useSelector((state) => state.order.allOrderForAdmin);
    console.log("AllOrders", AllOrders);

    const [selectedStatus, setSelectedStatus] = useState({});

    const handleStatusChange = (orderId, newStatus, address, phone) => {
        setSelectedStatus({
            ...selectedStatus,
            [orderId]: newStatus,
        });

        const data = {
            id: orderId,
            status: newStatus,
            address: address,
            phone: phone,
        };

        // Dispatch the action to update the order status
        dispatch(updateOrderAsync(data))
            .then(() => {
                dispatch(getAllOrderForAdminAsync());
            })
    };

    return (
        <>
            <section className="admin_order_list py-5 px-5">
                {/* <div className="container"> */}
                <div className="admin_order_list-header mb-3">
                    <h3 className='text-center'>Admin Order List</h3>
                </div>
                <div className="admin_order_list-body py-4">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className='py-2 table-header' scope="col">Order ID</th>
                                <th className='py-2 table-header' scope="col">Name</th>
                                <th className='py-2 table-header' scope="col">Phone</th>
                                <th className='py-2 table-header' scope="col">Items</th>
                                <th className='py-2 table-header' scope="col">Total Amount</th>
                                <th className='py-2 table-header' scope="col">Address</th>
                                <th className='py-2 table-header' scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* ALL ORDER MAPPING HERE */}
                            {Array.isArray(AllOrders) ? (
                                AllOrders.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.phone}</td>
                                            <td>{order.items.map((item) => {

                                            })}</td>
                                            <td>{order.totalAmount}</td>
                                            <td>{order.address}</td>
                                            <td>
                                                <select
                                                    className="form-select"
                                                    value={selectedStatus[order.id] || order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value, order.address, order.phone)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatch">Dispatch</option>
                                                    <option value="delayed">Delayed</option>
                                                    <option value="canceled">Canceled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : null}

                        </tbody>
                    </table>
                </div>
                {/* </div> */}
            </section>
        </>
    )
}

export default AdminOrderList;
