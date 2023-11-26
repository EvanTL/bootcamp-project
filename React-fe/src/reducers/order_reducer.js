  

const order_reducer = (state, action) => {

    if (action.type === 'CREATE_ORDER_REQUEST') {
        return {...state, loading: true}
    }

    if (action.type === 'CREATE_ORDER_SUCCESS') {
        
        let remove = ['cart', 'delivery', 'payment']
        remove.forEach(k => {
            localStorage.removeItem(k)
        })
        return {...state, loading: false, data: action.payload}
    }

    if (action.type === 'CREATE_ORDER_FAIL') {
        
        return {...state, loading: false, error: action.payload}
    }

    if (action.type === 'GET_ORDERS_REQUEST') {
        return {...state, loading: true}
    }

    if (action.type === 'GET_ORDERS_SUCCESS') {
    
        return {...state, loading: false, orders: action.payload}
    }

    if (action.type === 'GET_ORDERS_FAIL') {
        
        return {...state, loading: false, error: action.payload}
    }

    if (action.type === 'GET_SINGLE_ORDER_REQUEST') {
        return {...state, loading: true}
    }

    if (action.type === 'GET_SINGLE_ORDER_SUCCESS') {
    
        return {...state, loading: false, single_order: action.payload}
    }

    if (action.type === 'GET_SINGLE_ORDER_FAIL') {
        
        return {...state, loading: false, error: action.payload}
    }
    
    
}

export default order_reducer
  