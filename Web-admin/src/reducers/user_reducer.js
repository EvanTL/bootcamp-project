  import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_SINGLE_USER_BEGIN,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_ERROR,
} from '../components/actions'

const user_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false }
  }

  if (action.type === GET_USERS_BEGIN) {
    return { ...state, users_loading: true }
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      users_loading: false,
      users: action.payload,
    }
  }
  if (action.type === GET_USERS_ERROR) {
    return { ...state, users_loading: false, users_error: true }
  }
  if (action.type === GET_SINGLE_USER_BEGIN) {
    return {
      ...state,
      single_user_loading: true,
      single_user_error: false,
    }
  }
  if (action.type === GET_SINGLE_USER_SUCCESS) {
    return {
      ...state,
      single_user_loading: false,
      single_user: action.payload,
    }
  }
  if (action.type === GET_SINGLE_USER_ERROR) {
    return {
      ...state,
      single_user_loading: false,
      single_user_error: true,
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default user_reducer