import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  UPDATE_SINGLE_PRODUCT_BEGIN,
  UPDATE_SINGLE_PRODUCT_SUCCESS,
  UPDATE_SINGLE_PRODUCT_ERROR,
  DELETE_PRODUCTS_BEGIN,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR,
  CREATE_SINGLE_PRODUCT_BEGIN,
  CREATE_SINGLE_PRODUCT_SUCCESS,
  CREATE_SINGLE_PRODUCT_ERROR,
} from '../components/actions'

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }

  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const featured_products = action.payload.filter(
      (product) => product.featured === true
    )
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    }
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true }
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    }
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    }
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    }
  }
  if (action.type === CREATE_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    }
  }
  if (action.type === CREATE_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: false,
      update_data: action.payload
    }
  }
  if (action.type === CREATE_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
      update_data: action.payload
    }
  }
  if (action.type === UPDATE_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    }
  }
  if (action.type === UPDATE_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: false,
      update_data: action.payload
    }
  }
  if (action.type === UPDATE_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
      update_data: action.payload
    }
  }
  if (action.type === DELETE_PRODUCTS_BEGIN) {
    return {
      ...state,
      products_loading: true
    }
  }
  if (action.type === DELETE_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products_loading: false,
      update_data: action.payload
    }
  }
  if (action.type === DELETE_PRODUCTS_ERROR) {
    return {
      ...state,
      products_loading: false,
      products_error: true
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
