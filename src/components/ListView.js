import React from 'react'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import './listview.css'
import styled from 'styled-components'
import Stars from './Stars'

const ListView = ({ products }) => {
  return (
    <section className='list'>
      {products && products.map(content => {
        return(
          <>
          <div key={content.id} className='grid grid-cols-7 gap-4 mt-4 mb-4 p-3 rounded-lg bg-[#6499E9]'>
          <Link to={`/products/${content.id}`} className='link float-left col-span-2 transition-[var(--transition)]'>
            <img src={content.image} className='rounded-lg hover:opacity-50 transition-[var(--transition)]' />
          </Link>
            <section className='description float-left col-span-5'>
              <h3 className='font-semibold'>{content.name}</h3>
              <Stars stars={content.stars}/>
              <p>{formatPrice(content.price)}</p>
              <p>{content.description}</p>
              <Link to={`/products/${content.id}`} className='w-fit float-left m-auto text-center bg-[#676767] text-white rounded-[var(--radius)]
        text-[0.875rem] px-3 py-[6px] mb-2 uppercase hover:opacity-50 transition-[var(--transition)]'>Details</Link>
            </section>
          </div>
          <hr className='border-black'/>
          </>
        )
      })}
    </section>
  )
}

export default ListView
