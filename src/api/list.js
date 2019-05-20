import Request from '../utils/request'

export const userListApi = type => {
  return Request({
    url: '/user/list',
    method: 'get',
    params: {
      type
    }
  })
}

export const userMsgApi = () => {
  return Request({
    url: '/user/getmsglist',
    method: 'get'
  })
}

export const readMsgApi = data => {
  return Request({
    url: '/user/readmsg',
    method: 'post',
    data
  })
}