import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import denim from '../assets/denim.png'
import hoodie from '../assets/hoodie.png'
const Hero = () => {
  return (
    <section className='section-center grid grid-cols-2'>
      <article className='content'>
        <h1 className='text-[#071952] font-bold'>Cek Toko Sebelah</h1>
        <h1 className='text-[#071952] font-bold normal-case'>#1 Fashion store in Indonesia</h1>
        <p className='normal-case text-xl mb-5'>
          We serve both large and small cities within Indonesia. All of our products are authentic and affordable
        </p>
        <Link to='/products' className='btn hero-btn float-left'>Shop Now</Link>
      </article>
      <article className='img-container'>
        <img src={denim} className='w-[100%] h-[550px] relative left-[10%] bottom-[3%]' />
        <img src={hoodie} className=' absolute bottom-[10%] left-[50%] w-[250px] h-[250px]'/>
      </article>
    </section>
  )
}



export default Hero
