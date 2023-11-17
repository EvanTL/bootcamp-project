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
  GET_SINGLE_USER_ERROR
} from '../components/actions'

const initialState = {
  isSidebarOpen: false,
  users_loading: false,
  users_error: false,
  users: [],
  single_user_loading: false,
  single_user_error: false,
  single_user: {},
}

const UsersContext = React.createContext()

export const users_url = 'http://localhost:8000/admin/users'

export const single_user_url = 'http://localhost:8000/admin/users'

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
      console.log(users)
      dispatch({ type: GET_USERS_SUCCESS, payload: users })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_USERS_ERROR })
    }
  }

  const fetchSingleUser = async (single_user_url) => {
    dispatch({ type: GET_SINGLE_USER_BEGIN })
    try {
      const response = await axios.get(single_user_url)
      const singleUser = response.data
      dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: singleUser })
    } catch (error) {
      dispatch({ type: GET_SINGLE_USER_ERROR })
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
