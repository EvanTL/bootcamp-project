import React from "react";
import { FaLocationArrow, FaTruck, FaUserAlt } from "react-icons/fa";
import { useCartContext } from '../context/cart_context'
import { formatPrice } from "../utils/helpers";

const ReviewOrder = () => {

    const data = JSON.parse(localStorage.getItem('delivery'))
    const cart = JSON.parse(localStorage.getItem('cart'))
    const selectedmethod = localStorage.getItem('payment')
    const { total_amount, shipping_fee } = useCartContext()
    const tax = (total_amount + shipping_fee) * 0.11

    return(
        <div className="w-full mx-10">
            <h2 className="font-semibold text-center">Review Order</h2>
            <div className="grid grid-cols-3 gap-4 bg-blue-300 rounded-lg p-5 mt-5 mb-[5rem]">
                <div className="grid grid-cols-2">
                    <FaUserAlt className="w-[3rem] h-[3rem] mx-auto"/>
                    <div>
                        <h4 className="font-semibold">Customer</h4>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <FaTruck className="w-[3rem] h-[3rem] mx-auto"/>
                    <div>
                        <h4 className="font-semibold">Shipping info</h4>
                        <p className="font-semibold">Shipping: {data.country}</p>
                        <p className="font-semibold">Payment method: {selectedmethod}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <FaLocationArrow className="w-[3rem] h-[3rem] mx-auto"/>
                    <div>
                        <h4 className="font-semibold">Delivery Address</h4>
                        <p className="font-semibold">{data.address}, {data.city}</p>
                        <p className="font-semibold">Postal code: {data.postal_code}</p>
                    </div>
                </div>
                <div className="col-span-2">
                    <h4 className="font-semibold text-center">Your Cart</h4>
                    <div className="grid grid-cols-4">
                        <p className="col-start-3 text-center uppercase mb-2">Qty</p>
                        <p className="col-start-4 text-center uppercase">Subtotal</p>
                        {cart && cart.map(item => {
                        return(
                        <>
                            <img src={item.image} className="col-start-1 rounded-lg w-[131px] h-fit mx-auto py-1"/>
                            <div className="col-start-2 border-l-2 border-black pl-5">
                                <p>{item.name}</p>
                                <p>Color: <div style={{background: item.color}} className='w-[0.7rem] h-[0.7rem] inline-block rounded-full'/></p>
                            </div>
                            <p className="col-start-3 text-center border-l-2 border-black">{item.amount}</p>
                            <p className="col-start-4 text-center border-l-2 border-black">{formatPrice(item.price * item.amount)}</p>
                        </>
                        )
                    })}
                    </div>
                </div>
                <div className="w-[250px] mx-auto">
                    <div className="bg-slate-200 p-2 grid grid-cols-2 h-fit mb-3 mt-9">
                    <>
                        <p>Subtotal:</p>
                        <p className="mb-3">{formatPrice(total_amount)}</p>
                    </>
                    <>
                        <p>Shipping:</p>
                        <p className="mb-3">{formatPrice(shipping_fee)}</p>
                    </>
                    <>
                        <p>Tax:</p>
                        <p className="mb-3">{formatPrice(tax)}</p>
                    </>
                    <>
                        <p>Total:</p>
                        <p className="mb-3">{formatPrice(total_amount + shipping_fee + tax)}</p>
                    </>
                    </div>
                    <button className="btn col-start-3">Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewOrder