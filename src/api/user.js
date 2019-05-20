import Request from '../utils/request'

export const registerApi = data => {
  return Request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export const loginApi = data => {
  return Request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const updateApi = data => {
  return Request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export const getUserinfo = () => {
  return Request({
    url: '/user/info'
  })
}
