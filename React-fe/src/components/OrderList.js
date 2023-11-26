import { useCartContext } from '../context/cart_context'
import { useOrderContext } from "../context/order_context";
import { formatPrice } from "../utils/helpers";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import PageHero from './PageHero';

const OrderList = () => {
    const { token } = JSON.parse(localStorage.getItem('userInfo'))
    const {getOrders, orderState, loading} = useOrderContext()
    const { orders } = orderState
    const navigate = useNavigate()

    useEffect(() => {
        getOrders(token)
    }, [])

    if (loading) {
        return <Loading/>
    }

    if (orders.length < 1) {
        return (
          <div className='page-100 mt-20'>
            <div className='empty'>
              <h2 className='text-center'>No orders yet</h2>
              <p className='text-center mb-2'>Orders you made will be shown here</p>
              <Link to='/products' className='btn'>
                Go shopping
              </Link>
            </div>
          </div>
        )
      }

    return (
        <div className='empty-cart mt-20'>
          <PageHero title='orders' />
          <div className='page'>
            {orders && orders.map(order => {
                const  { items } = order
            return (
                <>
                <div className='grid grid-cols-2'>
                <span className='mx-4 py-2 font-bold'>Order: {order._id}</span>
                <button 
                className='rounded-lg mx-auto w-20 text-white transition-[var(--transition)] self-center bg-[var(--clr-primary-1)]
                hover:bg-[var(--clr-primary-6)]'
                onClick={() => navigate(`/orders/${order._id}`)}
                    >Details
                </button>
                </div>
                <div className='grid md:grid-cols-[300px_1fr_1fr_1fr] mx-4 py-2' key={order._id}>
                    <span className='text-center font-bold hidden md:block'>Item</span>
                    <span className='text-center font-bold hidden md:block'>Price</span>
                    <span className='text-center font-bold hidden md:block'>Amount</span>
                    <span className='text-center font-bold hidden md:block'>Subtotal</span>
                    {items.map(item => {
                        return(
                            <>
                            <div className='col-start-1 grid grid-cols-2 mb-3 md:mb-0'>
                            <img src={`http://localhost:8000/${item.image}`} alt='' className='h-24'/>
                            <div className='self-center h-fit'>
                                <h5>{item.name}</h5>
                                <p>
                                    Color: <div style={{background: item.color}} className='w-[0.7rem] h-[0.7rem] inline-block rounded-full'/>
                                </p>
                            </div>
                            </div>
                            <p className='self-center text-center'><span className='md:hidden'>Price: </span>{formatPrice(item.price)}</p>
                            <p className='self-center text-center'><span className='md:hidden'>Amount: </span>{item.amount}</p>
                            <p className='self-center text-center mb-1 md:mb-0'>
                                <span className='md:hidden'>Subtotal: </span>{formatPrice(item.amount * item.price)}
                            </p>
                            <hr className='col-span-4 my-2'/>
                            </>
                        )
                    })}
                </div>
                <hr className='bg-black h-1 mb-3'/>
                </>
            )
            })}
          </div>
        </div>
      )

}

export default OrderList