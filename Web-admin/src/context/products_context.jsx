import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  DELETE_SINGLE_PRODUCT_BEGIN,
  DELETE_SINGLE_PRODUCT_SUCCESS,
  DELETE_SINGLE_PRODUCT_ERROR
} from '../components/actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const products_url = 'http://localhost:8000/admin/products'

export const single_product_url = 'http://localhost:8000/admin/products'

export const delete_single_product = 'http://localhost:8000/admin/delete-product'

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async (products_url) => {
    
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(products_url)
      const products = response.data
      console.log(products)
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async (single_product_url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(single_product_url)
      const singleProduct = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  const deleteSingleProduct = async (delete_single_product) => {
    dispatch({type: DELETE_SINGLE_PRODUCT_BEGIN})
    try{
      const response = await axios.delete(delete_single_product)
      const singleProduct = response.data
      dispatch({ type: DELETE_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: DELETE_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts(products_url)
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        deleteSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
