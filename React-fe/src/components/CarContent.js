import React from 'react'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
import './carcontent.scss'
const CartItems = () => {
  const { cart, clearCart } = useCartContext()

  return (
    <div className='mx-auto w-10/12'>
      <div>
        <CartColumns/>
        <hr/>
        {cart && cart.map(item => {
          return <CartItem {...item}/>
        })}
      </div>
      <section>
        <div className='link-container'>
          <Link to='/products' className='link-btn'>Continue Shopping</Link>
          <button onClick={clearCart} className='link-btn clear-btn'>Clear Cart</button>
        </div>
      </section>
      <CartTotals/>
    </div>
  )
}

export default CartItems
