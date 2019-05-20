import {
  registerApi,
  loginApi,
  updateApi,
  getUserinfo
} from '../api/user'
import {
  getRedirectPath
} from '../utils/util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, msg: '成功', redirectTo: getRedirectPath(action.payload), ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state, msg: action.msg, isAuth: false
      }
    case LOGOUT:
      return {
        ...initState, redirectTo: '/login'
      }
    default:
      return state
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

function authSuccess(obj) {
  const {pwd, ...data} = obj
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

export function register({
  user,
  pwd,
  repeatpwd,
  type
}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    registerApi({
      user,
      pwd,
      repeatpwd,
      type
    }).then(res => {
      if (res.code === 0) {
        dispatch(authSuccess({
          user,
          pwd,
          type
        }))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}

export function update(data) {
  return dispatch => {
    updateApi(data).then(res => {
      if (res.code === 0) {
        dispatch(authSuccess(res.data))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}

export function setUserinfo() {
  return dispatch => {
    getUserinfo().then(res => {
      if (res.code === 0) {
        dispatch(authSuccess(res.data))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}

export function logoutSubmit() {
  return {type: LOGOUT}
}

export function login({
  user,
  pwd
}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    loginApi({
      user,
      pwd
    }).then(res => {
      if (res.code === 0) {
        dispatch(authSuccess(res.data))
      } else {
        dispatch(errorMsg(res.msg))
      }
    })
  }
}
