import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import './stars.css'


const Stars = ({ stars }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index} className='star pt-[0.25rem]'>
        {stars > number ? (
          <BsStarFill/>
        ): stars > index ? (
          <BsStarHalf/>
        ): (<BsStar />)}
      </span>
    )
  })
  return (
    <div className='star-container'>
      <div className='stars flex flex-row'>{tempStars} <p className='text-sm'>({stars}/5)</p></div>
    </div>
  )
}


export default Stars
