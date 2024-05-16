import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import Stars from './Stars'
import { base } from '../utils/constants'
const Product = ({ imageUrl, title, price, _id, stars, company }) => {
  return (
    <Wrapper>
      <Link to={`/products/${_id}`} className='link'>
      <div className='container content-center bg-slate-100'>
        <img src={`${base}/${imageUrl}`} alt={title} />
      <footer>
        <h5>{title}</h5>
        <div className='stars'>
          <Stars stars={stars}/>
        </div>
        <p className='company'>{company}</p>
        <p>{formatPrice(price)}</p>
      </footer>
      </div>
      </Link>
    </Wrapper>
  )
}
const Wrapper = styled.article`
  width: 275px;
  .container {
    position: relative;
    height: fit-content;
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: var(--transition);
    cursor: pointer;
  }
  .container:hover img {
    opacity: 0.5;
  }
  .stars{
    transition: var(--transition)
  }
  .container:hover .stars{
    display: none;
    transition: var(--transition);
  }
  .company{
    display: none;
  }
  .container:hover .company{
    display: block
    transition: var(--transition);
  }
  footer {
    margin-top: 0.5rem;
    padding: 3px;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    color: black;
  }
  footer h5{
    font-weight: 600;
  }
  footer p {
    letter-spacing: var(--spacing);
    font-weight: 400;
  }
`
export default Product
