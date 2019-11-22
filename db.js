const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/testone'

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
var db = mongoose.connection
db.on('connected', function() {
  console.log('Mongoose connection open to ' + DB_URL)
})

// 连接异常数据库报错
db.on('error', function(err) {
  console.log('Mongoose connection error:' + err)
})

// 连接断开 disconnected 连接异常断开
db.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose
