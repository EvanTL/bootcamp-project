import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import './pagehero.css'

const PageHero = ({ title, product }) => {
  return (
    <div className='section-hero mb-3 z-10 lg:w-full'>
      <div className={styled}>
        <h3 className='ml-[5rem] mb-0 font-bold'>
          <Link to='/'>Home </Link>
          {product && <Link to='/products'>/ Products</Link>}/ {title}
        </h3>
      </div>
    </div>
  )
}


export default PageHero
