import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
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

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    shipping: false,
    featured: false,
    colors: [],
    description: "",
    image: null
  })

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
      console.log(resp)
      const data = resp.data
      setForm({
        name: data.title || "",
        price: data.price || "",
        stock: resp.data.stock || "",
        category: resp.data.category || "",
        shipping: resp.data.shipping || false,
        featured: data.featured ||false,
        colors: data.colors || [],
        description: data.description ||"",
        image: data.imageUrl || null
      })
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: resp.data })
    }).catch(error => {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: error.response.data })
    })
  }

  const createSingleProduct = (formData) => {
    dispatch({type: CREATE_SINGLE_PRODUCT_BEGIN})

    axios.post('http://localhost:8000/admin/add-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(resp => {
      dispatch({type: UPDATE_SINGLE_PRODUCT_SUCCESS, payload: resp.data})
    }).catch(error => {
      dispatch({ type: UPDATE_SINGLE_PRODUCT_ERROR, payload: error.response.data })
    })
  }

  const deleteProducts = async (productId) => {
    
    dispatch({ type: DELETE_PRODUCTS_BEGIN })
    try {
      const response = await axios.delete(`http://localhost:8000/admin/delete-product/${productId}`)
      const status = response.data
      console.log(status)

      dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: status })
      await fetchProducts(products_url)
    } catch (error) {
      console.log(error)
      dispatch({ type: DELETE_PRODUCTS_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts(products_url)
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        form,
        setForm,
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
