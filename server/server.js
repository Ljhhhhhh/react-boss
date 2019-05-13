const express = require('express')

const app = express()

app.get('/', function(req, res) {
  res.send('<h1>hello world</h1>')
})

app.get('/json', function(req, res) {
  res.json({name:'ljh'})
})

app.listen(9093, function() {
  console.log('Node app start at port 9093')
})