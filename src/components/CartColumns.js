import React from 'react'
const CartColumns = () => {
  return (
    <div className='grid grid-cols-[300px_1fr_1fr_1fr_50px] mx-4 py-2'>
    <span className='text-center font-bold'>Item</span>
    <span className='text-center font-bold'>Price</span>
    <span className='text-center font-bold'>Qty</span>
    <span className='text-center font-bold'>Subtotal</span>
    </div>
  )
}


export default CartColumns
