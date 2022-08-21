/*
包含n个能操作mongodb数据库集合的model的模块
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 定义对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 向外暴露获取Model的方法
 */
// 1. 连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://gshop_user:gshop_user@192.168.63.37:27017/phone_gshop')
const conn = mongoose.connection
conn.on('connected', function () {
  console.log('数据库连接成功!')
})

// 2. 得到对应特定集合的Model: UserModel
const userSchema = mongoose.Schema({
  // 用户名
  'name': {type: String},
  // 密码
  'pwd': {type: String},
  // 类型
  'phone': {'type': String}
})
UserModel = mongoose.model('users', userSchema)

// 3. 向外暴露
module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}



// const userModel = new UserModel({name: '17717812656', pwd: '123456','phone':'17717812656'})
// userModel.save(function (err, user) {
//   // 向浏览器端返回cookie(key=value)
//   // res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
//   // const data = {_id: user._id, name: user.name}
//   // 3.2. 返回数据(新的user)
//   console.log(user)
// })




// //在Schma里定义数据类型
// var BookSchma = new mongoose.Schema({ //定义一个Schema
//   name: String,
//   author: String,
//   publishTime:Date
// });
//
// mongoose.model('Book',BookSchma);//将该Schema发布为Model
//
// var Book = mongoose.model('Book');//Book为model name
//
// var book = new Book({
//   name: 'MEAN Web Development',
//   author: 'trigkit4',
//   publishTime: new Date()
// });
//
// book.save(function (err) {
//   console.log(err)
//   console.log('save status:',err ? 'failed' : 'success');
// });
//
