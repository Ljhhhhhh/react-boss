const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utility = require('utility')

Router.get('/list', function(req, res) {
  const {type} = req.query
  User.find({type}, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})

Router.get('/getmsglist', function(req, res) {
  //'$or': [{from: user, to: user}]
  const user = req.cookies.userid
  User.find({}, function(err, userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    Chat.find({'$or': [{from: user}, {to: user}]}, function(err, doc) {
      if (!err) {
        return res.json({code: 0, msgs: doc, users})
      }
    })
  })
})

Router.post('/register', function(req, res) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function(err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名已存在'})
    }
    User.create({user, pwd: md5Pwd(pwd), type}, function(err, doc) {
      if (err) {
        return res.json({code: 1, msg: '创建用户出错'})
      } else {
        res.cookie('userid', doc._id)
        return res.json({code: 0, msg: ''})
      }
    })
  })
})

Router.post('/login', function(req, res) {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, {'pwd': 0}, function(err, doc) {
    if (doc) {
      res.cookie('userid', doc._id)
      return res.json({code: 0, msg: '登录成功', data: doc})
    } else {
      res.json({code: 1, msg: '登录失败'})
    }
  })
})

Router.post('/readmsg', function(req, res) {
  const userid = req.cookies.userid
  const {from} = req.body
  Chat.update(
    {from, to: userid}, 
    {'$set': {read: true}}, 
    {'multi': true},
    function(err, doc) {
    if (!err) {
      return res.json({code: 0, num: doc.nModified})
    } else {
      return res.json({code: 1, msg: '修改失败'})
    }
  })
})

Router.post('/update', function(req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    if (err) {
      return {code: 1, msg: '修改失败'}
    }
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

Router.get('/info', function(req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1})
  }
  User.findById(userid, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})

function md5Pwd(pwd) {
  const salt = '13287!*d^&*$zlhaqre~#$@dljl)(++-'
  return utility.md5(pwd + salt)
}

module.exports = Router
