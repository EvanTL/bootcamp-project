import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import PageHero from './PageHero';
import ProductImages from './ProductImages';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default function GetProducts(){
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchData() {
        await fetch('http://localhost:8000/shop/product/65424e6b05ae1764ef3710e8',{
            crossDomain: true,
            // headers: {
            //     Authorization: "Bearer " + this.props.token
            // }
        })
        .then(response => response.json())
        .then(data => {
            setProduct(data)
            setError(null)
            console.log(product)
        })
        .catch(err => {
            setError(err.message)
            console.log(error)
            setProduct(null)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    if(loading){
        return <Loading/>
    }

    const {
        title,
        price,
        description,
        company,
        imageUrl,
        colors
      } = product;
    
      return (
        <>
        <div className='mt-20'>
        <PageHero title={title} product='products'/>
        <div className='pt-[5rem] mx-[174px]'>
          <div className='lg:grid lg:grid-cols-2 gap-5'>
            <section>
            <Link to='/products' className='w-fit float-left m-auto text-center bg-[#676767] text-white rounded-[var(--radius)]
            text-[0.875rem] px-3 py-[6px] mb-2 uppercase hover:opacity-50 transition-[var(--transition)]'>Back to Products</Link>
            </section>
            <section className='description mt-[35px]'>
              <h2 className='text-[#071952] mb-3'>{title}</h2>
              <h5 className='text-[var(--clr-grey-5)]'>{formatPrice(price)}</h5>
              <p>{description}</p>
            </section>
          </div>
        </div>
        </div>
        </>
      );
}