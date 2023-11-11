import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'
import './addtocart.css'


const AddToCart = ({ product }) => {
  // add to cart
  const { addToCart } = useCartContext()
  const { id, stock, colors } = product
  const [mainColor, setMainColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1
      if (tempAmount > stock) {
        tempAmount = stock
      }
      return tempAmount
    })
  }
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount
      if (oldAmount > 1){
        tempAmount = oldAmount - 1
      }
      if (oldAmount === 0){
        tempAmount = 1
      }
      return tempAmount
    })
  }
  return (
    <div className='addtocart'>
      <div className='colors'>
        <span>colors :</span>
        <div className='flex flex-row'>
          {colors && colors.map((c) =>{
            return (
              <button
                style={{ background: c }}
                className={`${
                  mainColor === c ? 'color-btn active' : 'color-btn'
                }`}
                data-color={c}
                onClick={() => setMainColor(c)}
              >
                {mainColor === c ? <FaCheck /> : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amount}
        />

        <Link
          to='/cart'
          className='btn'
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </div>
  )
}

export default AddToCart
