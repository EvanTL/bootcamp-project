import React from 'react'
import { formatPrice } from '../utils/helpers'
import AmountButtons from './AmountButtons'
import { FaTrash } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
const CartItem = ({ id, image, name, color, price, amount }) => {
  const { removeItem, toggleAmount } = useCartContext()
  const increase = () => {
    toggleAmount(id, 'inc')
  }
  const decrease = () => {
    toggleAmount(id, 'dec')
  }
  return (
    <>
    <div className='grid grid-cols-[300px_1fr_1fr_1fr_50px] mx-4 py-2' key={id}>
    <div className='col-start-1 grid grid-cols-2'>
      <img src={image} alt='' className='h-24'/>
      <div className='self-center h-fit'>
        <h5>{name}</h5>
        <p>Color: <div style={{background: color}} className='w-[0.7rem] h-[0.7rem] inline-block rounded-full'/></p>
      </div>
    </div>
    <p className='self-center text-center'>{formatPrice(price)}</p>
    <div className='m-auto'><AmountButtons increase={increase} decrease={decrease} amount={amount}/></div>
    <p className='self-center text-center'>{formatPrice(amount * price)}</p>
    <button className='rounded-lg text-white transition-[var(--transition)] self-center bg-[var(--clr-red-dark)] hover:bg-red-600'
    onClick={() => removeItem(id)}><FaTrash/></button>
    </div>
    <hr/>
    </>
  )
}

export default CartItem
