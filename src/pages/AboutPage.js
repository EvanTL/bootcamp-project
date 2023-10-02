import React from 'react'
import { PageHero } from '../components'
import toko from '../assets/hero-bcg.jpeg'
import './aboutpage.css'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='about' />
      <section className='grid grid-cols-2 mx-[200px] gap-6 my-[30px]'>
        <img src={toko} alt='nice desk' className='w-fit h-fit' />
        <article>
          <div className='title'>
            <h2>About us</h2>
          </div>
          <p className='text-md mt-4 normal-case'>
           From the heart of Denpasar for Indonesia, Cek Toko Sebelah was founded in 2015. We started from a small store serving the area of Denpasar, we grew as a
           company, and now we have more than 100 stores serving 300 cities.
          </p>
          <p className='text-md mt-2 normal-case'>
            We launched our online storefront in 2020 just before the pandemic that forced us to close the majority of our stores, allowing
            our customer to shop safely at home.
          </p>
        </article>
      </section>
    </main>
  )
}

export default AboutPage
