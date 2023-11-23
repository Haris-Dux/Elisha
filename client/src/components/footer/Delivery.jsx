import React from 'react'
import "./Footer.css";

const Delivery = () => {
    return (
        <section className='delivery'>
            <div className="container d-flex justify-content-between">

                <div className="delivery_left">
                    <h2 className='delivery_headings'>Delivery within Pakistan</h2>
                    <p className='delivery_text'>All orders within Pakistan are routed through TCS, Leopords, Call Courier and many others courier services. All our domestic clients will be provided with a tracking ID when the order is dispatched. Upon placing an order, you will receive a verification call or SMS from our Customer Service to confirm the order. If you fail to verify, your order will be automatically cancelled after 3 days (only applicable to purchases made through Cash on Delivery method). Once the order is verified, it will be dispatched within 1-2 working days and will be delivered to you within 4-5 working days. We offer free delivery on orders above Rs.3000 within Pakistan.</p>
                </div>
                
                <div className="delivery_right">
                    <h2 className='delivery_headings'>International <br /> Orders</h2>
                    <p className='delivery_text'>International orders are routed through DHL. All our international clients will be provided with a tracking ID when the order is dispatched. International clients shall also receive a sales invoice via email and notification of shipment via email. The customer shall bear any additional charges for custom clearance or any other variation in price beyond our control.</p>
                </div>
            </div>
        </section>
    )
}

export default Delivery
