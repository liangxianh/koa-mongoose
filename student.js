const mongoose = require('./db')
const Schema = mongoose.Schema

const testSchema = new Schema({
  name: 'String',
  age: 'String',
  studentId: 'String'
})

const Student = mongoose.model('testone', testSchema)

class StudentDb {
  constructor() {}
  // 查询
  query() {
    return new Promise((resolve, reject) => {
      Student.find({}, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 保存
  save(obj) {
    const m = new Student(obj)
    return new Promise((resolve, reject) => {
      m.save((err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log(res)
      })
    })
  }
  // 按studentId查询
  where(obj) {
    const query = JSON.parse(JSON.stringify(obj))
    return new Promise((resolve, reject) => {
      console.log(query)
      Student.find({ studentId: query.studentId }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  }
  // 更新
  update(obj) {
    const query = JSON.parse(JSON.stringify(obj))
    return new Promise((resolve, reject) => {
      console.log('query', query)
      Student.updateOne({ _id: query._id }, { $set: query }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log('update=====', res)
      })
    })
  }
  // 删除
  del(obj) {
    const query = JSON.parse(JSON.stringify(obj))
    return new Promise((resolve, reject) => {
      Student.deleteOne({ _id: query._id }, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
        console.log(res)
      })
    })
  }
}
module.exports = new StudentDb()
