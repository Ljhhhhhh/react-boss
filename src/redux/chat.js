import { userMsgApi, readMsgApi } from "../api/list";
import io from 'socket.io-client'

const socket = io('ws://localhost:9090')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
}

export function chat(state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
      }
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1: 0
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
    case MSG_READ:
      const {from, num} = action.payload
      return {
        ...state, 
        chatmsg: state.chatmsg.map(v => ({...v, read: from=== v.from ? true : v.read})), 
        unread: state.unread - num
      }
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}}
}

function msgRecv(msg, userid) {
  return {type: MSG_RECV, payload: msg, userid}
}

function msgRead({from, userid, num}) {
  console.log(from, userid, num, '123');
  return {type: MSG_READ, payload: {from, userid, num}}
}

export function readMsg(from) {
  return (dispatch, getState) => {
    readMsgApi({from}).then(res => {
      const userid = getState().user._id;
      if (res.code === 0) {
        dispatch(msgRead({userid, from, num: res.num}))
      }
    })
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    userMsgApi().then(res => {
      if (res.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.msgs, res.users, userid))
      }
    })
  }
}