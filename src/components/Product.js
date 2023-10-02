import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import Stars from './Stars'
const Product = ({ image, name, price, id, stars, company }) => {
  return (
    <Wrapper>
      <Link to={`/products/${id}`} className='link'>
      <div className='container content-center'>
        <img src={image} alt={name} />
      <footer>
        <h5>{name}</h5>
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
  .container {
    position: relative;
    height: fit-content;
    background-color: #6499E9;
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
  }
  .company{
    display: none;
    transition: var(--transition)
  }
  .container:hover .company{
    display: block
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
