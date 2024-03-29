import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
const CartButton = () => {
  const { closeSidebar } = useProductsContext()
  const { total_items, clearCart } = useCartContext()
  const { loginWithRedirect, myUser, logout } = useUserContext()
  return (
    <div className='cart-btn-wrapper'>
    <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
      Cart
      <span className='cart-container'>
        <FaShoppingCart />
      </span>
    </Link>
  </div>
  )
}


export default CartButton
