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
  CREATE_SINGLE_PRODUCT_BEGIN,
  CREATE_SINGLE_PRODUCT_SUCCESS,
  CREATE_SINGLE_PRODUCT_ERROR,
  UPDATE_SINGLE_PRODUCT_BEGIN,
  UPDATE_SINGLE_PRODUCT_SUCCESS,
  UPDATE_SINGLE_PRODUCT_ERROR,
  DELETE_PRODUCTS_BEGIN,
  DELETE_PRODUCTS_ERROR,
  DELETE_PRODUCTS_SUCCESS
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
  update_data: {}
}

const ProductsContext = React.createContext()

export const products_url = 'http://localhost:8000/admin/products'

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
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = ( productId ) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })

    axios.get(`http://localhost:8000/admin/product/${productId}`)
    .then(resp => {
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: resp.data })
    }).catch(error => {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: error.response.data })
    })
  }

  const createSingleProduct = (formData) => {
    dispatch({type: CREATE_SINGLE_PRODUCT_BEGIN})

    axios.post('http://localhost:8000/admin/add-product', formData, {
      headers: {
        'Content-Type': 'application/form-data'
      }
    }).then(resp => {
      dispatch({type: CREATE_SINGLE_PRODUCT_SUCCESS, payload: resp.data})
    }).catch(error => {
      dispatch({ type: CREATE_SINGLE_PRODUCT_ERROR, payload: error.response.data })
    })
  }

  const updateSingleProduct = (formData, productId) => {
    dispatch({type: UPDATE_SINGLE_PRODUCT_BEGIN})

    axios.post(`http://localhost:8000/admin/update-product/${productId}`, formData, {
      headers: {
        'Content-Type': 'application/form-data'
      },
    })
    .then(resp => {
      dispatch({type: UPDATE_SINGLE_PRODUCT_SUCCESS, payload: resp.data})
    }).catch(error => {
      dispatch({ type: UPDATE_SINGLE_PRODUCT_ERROR, payload: error.response.data })
    })
  }

  const deleteProducts = (productId) => {
    dispatch({type: DELETE_PRODUCTS_BEGIN})

    axios.delete(`http://localhost:8000/admin/delete-product/${productId}`)
    .then(resp => {
      dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: resp.data })
    }).catch(error => {
      dispatch({ type: DELETE_PRODUCTS_ERROR, payload: error.response.data })
    })
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
        fetchProducts,
        fetchSingleProduct,
        createSingleProduct,
        updateSingleProduct,
        deleteProducts,
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
