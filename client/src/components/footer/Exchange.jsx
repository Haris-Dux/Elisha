import React from 'react'

const Exchange = () => {
    return (
        <>
            <section className='exchange py-5'>
                <div className="container d-flex justify-content-between">
                    <div className="exchange_left">
                        <h2 className='exchange_headings'>Exchange Policy</h2>
                        <p className='exchange_text'>Items purchased from our online store can be exchanged either at our physical outlet or by contacting our customer service for courier return. Exchange requests are subject to the following conditions:</p>
                        <ul>
                            <li>The customer must submit a request for exchange within 7 working days of receiving the purchased item, stating the reason for exchange.</li>
                            <li>The item must be in its original packaging with the price tag intact.</li>
                            <li>The original invoice for the item must be sent along with the item.</li>
                            <li>The item must be in its original, unused condition with no signs of wear, odors, stains, or washing.</li>
                            <li>Sale items are not eligible for exchange at their sale price; they will be exchanged at their regular price.</li>
                            <li>ELISHA reserves the right to accept or deny exchange requests.</li>
                            <li>Upon approval of an exchange request, the customer will be notified by our customer service.</li>
                        </ul>
                        <p className='exchange_text'>Please note that this exchange policy does not apply to orders shipped outside Pakistan</p>

                        <h2 className='exchange_headings'>Refund Policy</h2>
                        <p className='exchange_text'>ELISHA strictly adheres to a 'NO refund' policy. Cashback is not available. The Exchange Policy is applicable once the customer has placed an order and received the parcel or when payment has been processed.</p>

                        <h2 className='exchange_headings'>Damage & Claims</h2>
                        <p className='exchange_text'>The exchange of damaged items is allowed if the received item(s) have manufacturing defects, wrong sizes, or wrong items shipped. Customers must raise complaints within 2 working days of receiving the parcel, along with the paper invoice, through a call, message, or email. Please allow up to one week for the processing of damage and claims. Please note that items purchased from our retail outlet cannot be exchanged via courier; they must be exchanged at the retail outlet in person. Thank you for choosing ELISHA. If you have any further questions or concerns, please do not hesitate to reach out to our customer service.</p>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Exchange
