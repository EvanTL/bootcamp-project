import React, { useEffect } from "react";
import { FaLocationArrow, FaTruck, FaUserAlt } from "react-icons/fa";
import { useCartContext } from '../context/cart_context'
import { useOrderContext } from "../context/order_context";
import { formatPrice } from "../utils/helpers";
import Loading from "./Loading";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
    const { getSingleOrder, orderState } = useOrderContext()
    const { orderId } = useParams();
    const navigate = useNavigate()
    const { token } = JSON.parse(localStorage.getItem('userInfo'))
    const {single_order, loading} = orderState

    useEffect(() => {
        getSingleOrder(orderId, token)
    }, [orderId])

    const {items, delivery, userData, totalpay} = single_order
    console.log(delivery)

    if (loading) {
        return <Loading/>
    }

    if (!loading) {
        return(
            <div className="w-full mt-20">
                <h2 className="font-semibold text-center">Order Detail: {single_order._id}</h2>
                <div className="grid grid-cols-3 gap-4 bg-blue-300 rounded-lg p-5 mt-5 mb-[5rem]">
                    <div className="grid grid-cols-2">
                        <FaUserAlt className="w-[3rem] h-[3rem] mx-auto"/>
                        <div>
                            <h4 className="font-semibold">Customer</h4>
                            <p className="font-semibold">Name: {userData.name}</p>
                            <span className="font-semibold">Email: {userData.email}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <FaTruck className="w-[3rem] h-[3rem] mx-auto"/>
                        <div>
                            <h4 className="font-semibold">Shipping info</h4>
                            <p className="font-semibold">Shipping: {delivery.country}</p>
                            <p className="font-semibold">Payment method: {userData.payment}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <FaLocationArrow className="w-[3rem] h-[3rem] mx-auto"/>
                        <div>
                            <h4 className="font-semibold">Delivery Address</h4>
                            <p className="font-semibold">{delivery.address}, {delivery.city}</p>
                            <p className="font-semibold">Postal code: {delivery.postal_code}</p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <h4 className="font-semibold text-center">Your Cart</h4>
                        <div className="grid grid-cols-4">
                            <p className="col-start-3 text-center uppercase mb-2">Qty</p>
                            <p className="col-start-4 text-center uppercase">Subtotal</p>
                            {items && items.map(item => {
                            return(
                            <>
                                <img src={`http://localhost:8000/${item.image}`} className="col-start-1 rounded-lg w-[131px] h-fit mx-auto py-1"/>
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
                            <p className="mb-3">{formatPrice(totalpay.subtotal)}</p>
                        </>
                        <>
                            <p>Shipping:</p>
                            <p className="mb-3">{formatPrice(totalpay.shipping)}</p>
                        </>
                        <>
                            <p>Tax:</p>
                            <p className="mb-3">{formatPrice(totalpay.tax)}</p>
                        </>
                        <>
                            <p>Total:</p>
                            <p className="mb-3">{formatPrice(totalpay.subtotal + totalpay.shipping + totalpay.tax)}</p>
                        </>
                        </div>
                        <button className="btn col-start-3" onClick={() => navigate('/orders')}>Back to order list</button>
                    </div>
                </div>
            </div>
        )   
    }
}

export default OrderDetail