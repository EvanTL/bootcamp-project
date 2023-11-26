  

const order_reducer = (state, action) => {

    if (action.type === 'GET_ORDERS_REQUEST') {
        return {...state, loading: true}
    }

    if (action.type === 'GET_ORDERS_SUCCESS') {
    
        return {...state, loading: false, orders: action.payload, error: false}
    }

    if (action.type === 'GET_ORDERS_FAIL') {
        
        return {...state, loading: false, error: true}
    }

    if (action.type === 'GET_SINGLE_ORDER_REQUEST') {
        return {...state, loading: true}
    }

    if (action.type === 'GET_SINGLE_ORDER_SUCCESS') {
    
        return {...state, loading: false, single_order: action.payload, error: false}
    }

    if (action.type === 'GET_SINGLE_ORDER_FAIL') {
        
        return {...state, loading: false, error: action.payload, error: false}
    }
    
    
}

export default order_reducer
  