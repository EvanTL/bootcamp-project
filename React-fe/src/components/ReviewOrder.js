import React, { useEffect } from "react";
import { FaLocationArrow, FaTruck, FaUserAlt } from "react-icons/fa";
import { useCartContext } from '../context/cart_context'
import { useOrderContext } from "../context/order_context";
import { formatPrice } from "../utils/helpers";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { base } from "../utils/constants";

const ReviewOrder = () => {

    const deliveryData = JSON.parse(localStorage.getItem('delivery'))
    const cart = JSON.parse(localStorage.getItem('cart'))
    const { user, token } = JSON.parse(localStorage.getItem('userInfo'))
    const selectedmethod = localStorage.getItem('payment')
    const { total_amount, shipping_fee } = useCartContext()
    const { createOrder, orderState } = useOrderContext()
    const tax = (total_amount + shipping_fee) * 0.11
    const navigate = useNavigate()

    async function handleOrder() {
        const totalpay = [{
            subtotal: total_amount,
            shipping: shipping_fee,
            tax: tax
        }]
        await createOrder(cart, token, deliveryData, user, selectedmethod, totalpay)
        alert(orderState.data)
        navigate('/orders')
    }

    if (orderState.loading) {
        return <Loading/>
    }

    return(
        <div className="w-full mx-10">
            <h2 className="font-semibold text-center">Review Order</h2>
            <div className="grid grid-cols-3 gap-4 bg-blue-300 rounded-lg p-5 mt-5 mb-[5rem]">
                <div className="grid grid-cols-2">
                    <FaUserAlt className="w-[3rem] h-[3rem] mx-auto"/>
                    <div>
                        <h4 className="font-semibold">Customer</h4>
                        <p className="font-semibold">Name: {user.name}</p>
                        <span className="font-semibold">Email: {user.email}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <FaTruck className="w-[3rem] h-[3rem] mx-auto"/>
                    <div>
                        <h4 className="font-semibold">Shipping info</h4>
                        <p className="font-semibold">Shipping: {deliveryData[0].country}</p>
                        <p className="font-semibold">Payment method: {selectedmethod}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <FaLocationArrow className="w-[3rem] h-[3rem] mx-auto"/>
                    <div>
                        <h4 className="font-semibold">Delivery Address</h4>
                        <p className="font-semibold">{deliveryData[0].address}, {deliveryData[0].city}</p>
                        <p className="font-semibold">Postal code: {deliveryData[0].postal_code}</p>
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
                            <img src={`${base}/${item.image}`} className="col-start-1 rounded-lg w-[131px] h-fit mx-auto py-1"/>
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
                    <button onClick={handleOrder} className="btn col-start-3">Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewOrder