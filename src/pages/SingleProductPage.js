import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { product_reviews as reviews_url } from '../utils/constants'
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductReviews from '../components/ProductReviews';
const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
    reviews_loading,
    reviews_error,
    reviews,
    fetchReviews,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    fetchReviews(`${reviews_url}?product_id=${id}`);
    // eslint-disable-next-line
  }, [id]);
  
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    name,
    price,
    description,
    stock,
    stars,
    id: sku,
    company,
    images,
    image,
  } = product;
  return (
    <div className='mt-20'>
    <PageHero title={name} product='products'/>
    <div className='pt-[3rem] mx-[174px]'>
      <div className='product-center lg:grid lg:grid-cols-2 gap-5'>
        <section>
        <Link to='/products' className='w-fit float-left m-auto text-center bg-[#676767] text-white rounded-[var(--radius)]
        text-[0.875rem] px-3 py-[6px] mb-2 uppercase hover:opacity-50 transition-[var(--transition)]'>Back to Products</Link>
          <ProductImages images={images} />
        </section>
        <section className='description mt-[35px]'>
          <h2 className='text-[#071952] mb-3'>{name}</h2>
          <Stars stars={stars}/>
          <p className='mb-2'>{reviews.length} customer {reviews.length > 1 ? <>reviews</> : <>review</>}</p>
          <h5 className='text-[var(--clr-grey-5)]'>{formatPrice(price)}</h5>
          <p>{description}</p>
          <p><span className='font-semibold'>Availability: </span>{stock > 0 ? <>{stock}</> : <span className='text-[var(--clr-red-dark)]'>Out of Stock</span>}</p>
          <p><span className='font-semibold'>ID: </span>{sku}</p>
          <p><span className='font-semibold'>Brand: </span>{company}</p>
          <hr/>
          {stock > 0 && <AddToCart product={product}/>}
        </section>
      </div>
      <ProductReviews reviews={reviews} loading={reviews_loading} error={reviews_error}/>
    </div>
    </div>
  );
};


export default SingleProductPage;
