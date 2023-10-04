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
    <div className='nav rounded-full w-full fixed z-10'>
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
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            )
          })}
          {userState.userId && (
            <>
              <li>
                <Link to='/checkout'>checkout</Link>
              </li>
              <li>
              <Link to='/logout'>Logout</Link>
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
