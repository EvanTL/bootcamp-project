import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6'
import styled from 'styled-components'
const Footer = () => {
  return (
    <Container>
      <div className='grid grid-cols-2 gap-96'>
        <div className=''>
          <h5>
            &copy; 2015-{new Date().getFullYear()}
            <span> Cek Toko Sebelah </span>
            All rights reserved
          </h5>
        </div>
        <div>
          <div className='grid grid-cols-[125px_1fr]'>
            <h5 className='w-fit inline'>Follow us on: </h5>
            <div className='grid grid-cols-[30px_30px_30px_30px]'>
              <FaXTwitter className='text-white text-xl my-auto'/>
              <FaFacebook className='text-white text-xl my-auto'/>
              <FaInstagram className='text-white text-xl my-auto'/>
              <FaTiktok className='text-white text-xl my-auto'/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.footer`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  span {
    color: #6499E9;
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer
