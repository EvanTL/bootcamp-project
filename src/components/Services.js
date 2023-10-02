import React from 'react'
import { services } from '../utils/constants'
import './services.css'

const Services = () => {
  return (
    <div className='mx-[150px] py-[3rem]'>
    <h3 className='ml-2 font-semibold mt-4 mb-0'>We also have custom service tailored</h3>
    <h3 className='ml-2 font-semibold'>to your requests</h3>
    <div className='services-center'>
      {services.map(content => {
        return(
          <div key={content.id} className='service'>
            <span>
              {content.icon}
            </span>
            <h4>{content.title}</h4>
            <p>{content.text}</p>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Services
