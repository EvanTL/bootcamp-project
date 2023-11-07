import React, { useContext, useEffect, useState, useReducer } from 'react'
import reducer from '../reducers/user_reducer'
import axios from "axios";


const UserContext = React.createContext()

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


export const UserProvider = ({ children }) => {

  const [userState, dispatch] = useReducer(reducer, initialState)
  
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
  
  
  const register = (name, email, password) => {
      dispatch({type: 'USER_REGISTER_REQUEST'});  

      const userData = {name:name, email: email,password: password};

      axios.post(`http://localhost:8000/auth/signup`,userData).then(resp => {

          dispatch({ type: 'USER_REGISTER_SUCCESS', payload: resp });
      
        }).catch(err => {

          dispatch({type: 'USER_REGISTER_FAIL', payload: err.message,
          });

      })
  };

  
  
  return (
    <UserContext.Provider
      value={{ userState, login, logout }}
    >
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
