import React, { useContext, useReducer } from 'react'
import reducer from '../reducers/order_reducer'
import axios from "axios";


const OrderContext = React.createContext()

const initialState = {
  data: "",
  loading: false,
  error: "",
  orders: [],
  single_order: {}
}


export const OrderProvider = ({ children }) => {

  const [orderState, dispatch] = useReducer(reducer, initialState)

  const createOrder = (cart, token, deliveryData, user, selectedmethod, totalpay) => {
    dispatch({type: 'CREATE_ORDER_REQUEST'})

      axios.post(`http://localhost:8000/shop/create-order`, {
        user: JSON.stringify({
          name: user.name,
          email: user.email,
          payment: selectedmethod,
        }),
        totalpay: JSON.stringify(totalpay),
        items: JSON.stringify(cart),
        delivery: JSON.stringify(deliveryData)
      }, {
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(resp => {

          dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: resp });
      
        }).catch(err => {

          if (!err.response) {
            dispatch({type: 'CREATE_ORDER_FAIL', payload: "Server No Response",
            });

          }else{
            dispatch({type: 'CREATE_ORDER_FAIL', payload: err.response.data,
            });

          }
      })
  }

  const getOrders = (token) => {
    dispatch({type: "GET_ORDERS_REQUEST"})

    axios.get(`http://localhost:8000/shop/orders`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      }).then(resp => {

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

  const getSingleOrder = (orderId, token) => {
    dispatch({type: "GET_SINGLE_ORDER_REQUEST"})

    axios.get(`http://localhost:8000/shop/order/${orderId}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).then(resp => {
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

  
  
  return (
    <OrderContext.Provider
      value={{ orderState, createOrder, getOrders, getSingleOrder }}
    >
      {children}
    </OrderContext.Provider>
  )
}
// make sure use
export const useOrderContext = () => {
  return useContext(OrderContext)
}
