import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/user_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_SINGLE_USER_BEGIN,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_ERROR,
  DELETE_USERS_BEGIN,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  UPDATE_SINGLE_USER_BEGIN,
  UPDATE_SINGLE_USER_SUCCESS,
  UPDATE_SINGLE_USER_ERROR
} from '../components/actions'

const initialState = {
  isSidebarOpen: false,
  users_loading: false,
  users_error: false,
  users: [],
  single_user_loading: false,
  single_user_error: false,
  single_user: {},
  update_data: {}
}

const UsersContext = React.createContext()

export const users_url = 'http://localhost:8000/admin/users'

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchUsers = async (users_url) => {
    
    dispatch({ type: GET_USERS_BEGIN })
    try {
      const response = await axios.get(users_url)
      const users = response.data
      dispatch({ type: GET_USERS_SUCCESS, payload: users })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_USERS_ERROR })
    }
  }

  const fetchSingleUser = async (userId) => {
    dispatch({ type: GET_SINGLE_USER_BEGIN })
    try {
      const response = await axios.get(`http://localhost:8000/admin/user/${userId}`)
      const singleUser = response.data
      dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: singleUser })
    } catch (error) {
      dispatch({ type: GET_SINGLE_USER_ERROR })
    }
  }

  const updateUser = (userId, name, email, password) => {
    dispatch({type: UPDATE_SINGLE_USER_BEGIN})

    const userData = {newName:name, newEmail: email, newPassword: password}

    axios.post(`http://localhost:8000/admin/update-user/${userId}`, userData)
    .then(resp => {
      dispatch({ type: UPDATE_SINGLE_USER_SUCCESS, payload: resp.data })
    }).catch(error => {
      dispatch({ type: UPDATE_SINGLE_USER_ERROR, payload: error.response.data })
    })
  }

  // const deleteUsers = (userId) => {
  //   dispatch({type: DELETE_USERS_BEGIN})

  //   axios.delete(`http://localhost:8000/admin/delete-user/${userId}`)
  //   .then(resp => {
  //     dispatch({ type: DELETE_USERS_SUCCESS, payload: resp.data })
  //   }).catch(error => {
  //     dispatch({ type: DELETE_USERS_ERROR, payload: error.response.data })
  //   })
  // }

  const deleteUsers = async (userId) => {
    
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
    fetchUsers(users_url)
  }, [])


  return (
    <UsersContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleUser,
        updateUser,
        deleteUsers
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
// make sure use
export const useUsersContext = () => {
  return useContext(UsersContext)
}
