import React from 'react'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
const CartTotals = () => {
  const { total_amount, shipping_fee } = useCartContext()
  const { myUser, loginWithRedirect } = useUserContext()

  return (
    <div className='border-4 border-black rounded-lg w-[500px] p-3 my-5'>
      <h5>Subtotal: {formatPrice(total_amount)}</h5>
      <h5>Shipping fee: {formatPrice(shipping_fee)}</h5>
      <hr/>
      <h5 className='font-semibold pt-3'>Total: {formatPrice(total_amount + shipping_fee)}</h5>
      <Link className='btn' to='/checkout'>Proceed to checkout</Link>
    </div>
  )
}



export default CartTotals
