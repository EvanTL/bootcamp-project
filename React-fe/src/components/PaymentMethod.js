import React, { useState } from "react";
import { Link } from "react-router-dom";

const PaymentMethod = () => {

    const [payment, setPayment] = useState('')
    const paymentclick = (ev) => {
        setPayment(ev.target.id)
    }

    return(
    <div className='rounded-lg bg-[#9EDDFF] p-3 w-[300px]'>
        <h4 className='font-semibold text-center'>Payment Method</h4>
        <form>
            <div className="mb-2">
                <input type="radio" id='paypal' name="payment" onClick={paymentclick}/><p className="inline">Paypal</p>
            </div>
            <div className="mb-2">
                <input type="radio" id='credit card' name="payment" onClick={paymentclick}/><p className="inline">Credit card</p>
            </div>
            <div className="mb-2">
                <input type="radio" id='bank transfer' name="payment" onClick={paymentclick}/><p className="inline">Bank Transfer</p>
            </div>
            <Link to='/checkout/revieworder' className='btn' onClick={() => localStorage.setItem('payment', payment)}>Continue</Link>
        </form>
    </div>
    )
}

export default PaymentMethod