import axios from 'axios'
import React, { useContext, useReducer } from 'react'
import reducer from '../reducers/auth_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE
} from '../components/actions'

let userId = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).userId
  : "";

let token = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).token
  : "";
 

const initialState = {
  user: userId,
  token: token,
  loading: false,
  error: ""
}

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const login = (email, password) => {

    dispatch({type: 'USER_LOGIN_REQUEST'})

    const userData = {email: email,password: password};

    axios.post(`http://localhost:8000/auth/login`,userData).then(resp => {

        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: resp.data });
    
      }).catch(err => {

        if (!err.response) {
          dispatch({type: 'USER_LOGIN_FAIL', payload: "Server No Response",
          });

        }else{
          dispatch({type: 'USER_LOGIN_FAIL', payload: err.response.data.message,
          });

        }
    })

};

const logout = () => {
  dispatch({ type: 'USER_LOGOUT' });
};

  return (
    <AuthContext.Provider
    value={{
      ...state,
      openSidebar,
      closeSidebar,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext)
}
