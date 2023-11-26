import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/order_reducer'

const initialState = {
  isSidebarOpen: false,
  data: "",
  loading: false,
  error: "",
  orders: [],
  single_order: {}
}

const OrdersContext = React.createContext()

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const getOrders = () => {
    dispatch({type: "GET_ORDERS_REQUEST"})

    axios.get(`http://localhost:8000/admin/orders`).then(resp => {

        dispatch({ type: 'GET_ORDERS_SUCCESS', payload: resp.data });
    
      }).catch(err => {

        if (!err.response) {
          dispatch({type: 'GET_ORDERS_FAIL', payload: "Server No Response",
          });

        }else{
          dispatch({type: 'GET_ORDERS_FAIL', payload: err.response.data,
          });

        }
    })
  }

  const getSingleOrder = (orderId) => {
    dispatch({type: "GET_SINGLE_ORDER_REQUEST"})

    axios.get(`http://localhost:8000/admin/order/${orderId}`).then(resp => {
      dispatch({ type: 'GET_SINGLE_ORDER_SUCCESS', payload: resp.data });
  
    }).catch(err => {

      if (!err.response) {
        dispatch({type: 'GET_SINGLE_ORDER_FAIL', payload: "Server No Response",
        });

      }else{
        dispatch({type: 'GET_SINGLE_ORDER_FAIL', payload: err.response.data,
        });

      }
  })
  }

  useEffect(() => {
    getOrders()
  }, [])


  return (
    <OrdersContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        getOrders,
        getSingleOrder
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
// make sure use
export const useOrdersContext = () => {
  return useContext(OrdersContext)
}
