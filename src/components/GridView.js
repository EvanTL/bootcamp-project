import React from 'react'
import Product from './Product'
import './gridview.css'

const GridView = ({ products }) => {
  
  return (
    <div className='products-container'>
      <div className='grid grid-cols-3 gap-6'>
      {products && products.map(content => {
        return <Product key={content.id} {...content} />
      })}
      </div>
    </div>
  )
}

export default GridView
