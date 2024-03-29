import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'

const CartPage = () => {
  const { cart } = useCartContext()
  if (cart.length < 1) {
    return (
      <div className='page-100 mt-20'>
        <div className='empty'>
          <h2 className='text-center'>Your cart is empty</h2>
          <Link to='/products' className='btn'>
            fill it
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className='empty-cart mt-20'>
      <PageHero title='cart' />
      <div className='page'>
        <CartContent></CartContent>
      </div>
    </div>
  )
}


export default CartPage
