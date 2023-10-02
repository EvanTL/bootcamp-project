import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
  {
    id: 4,
    text: 'Contact',
    url: '/contact',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'Types',
    text:
      'We have many options available for customization.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'Colors and sizes',
    text:
      'Over 100 colors and 5 sizes are available.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'COD',
    text:
      'Ship and pay COD with your preferred option.',
  },
]

export const services_id = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'Pilih Jenis',
    text:
      'Pilih jenis barang yang ingin kamu custom.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'Pilih Warna dan Ukuran',
    text:
      'Temukan lebih dari 100 macam warna dan 5 ukuran.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'COD',
    text:
      'Kirim dengan kurir favorit kamu dan bayar COD.',
  },
]

export const products_url = 'https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/products'
//'https://course-api.com/react-store-products'

export const single_product_url = 'https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/products/'
//`https://course-api.com/react-store-single-product?id=`

export const product_reviews = 'https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/reviews'