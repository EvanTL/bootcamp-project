  

const order_reducer = (state, action) => {

    if (action.type === 'CREATE_ORDER_REQUEST') {
        return {...state, loading: true}
    }

    if (action.type === 'CREATE_ORDER_SUCCESS') {

        return {...state, loading: false, data: action.payload}
    }

    if (action.type === 'USER_LOGIN_FAIL') {
        
        return {...state, loading: false, error: action.payload}
    }
    
    
}

export default order_reducer
  