import React from 'react'
import logo from '../assets/cek-toko-sebelah.png'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useUserContext } from '../context/user_context'
import './navbar.css'

const Nav = () => {
  const { openSidebar } = useProductsContext()
  const { userState } = useUserContext()

  // TODO
  
  return (
    <div className='nav rounded-full lg:w-full fixed z-10 top-0'>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} />
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          {links.map((link) => {
            const { id, text, url } = link
            return (
              <li key={id} className='main'>
                <Link to={url}>{text}</Link>
              </li>
            )
          })}
          {userState.token && (
            <>
              <li id='checkout'>
                <Link to='/checkout'>checkout</Link>
              </li>
              <li id='logout'>
              <Link to='/logout'>Logout</Link>
            </li>
          </>
          )}
          {!userState.token && (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
          </>
          )}
        </ul>
        <Link to='/cart'><CartButtons /></Link>
      </div>
    </div>
  )
}


export default Nav
