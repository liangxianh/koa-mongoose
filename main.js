const Koa = require('koa')
const Router = require('koa-router')
// bodyParser 处理post请求
const bodyParser = require('koa-bodyparser')
const NodEnv = require('./config').NODEENV
const port = require('./config').PORT
// 引入定义的数据库相关的部分
const StudentDb = require('./db')

const router = new Router()
const app = new Koa()

// 设置app的环境变量
app.env = NodEnv
console.log(app.env)

app.use(bodyParser())

router.get('/index', ctx => {
  ctx.body = '首页'
})
app.use(router.routes())
app.use(router.allowedMethods())
/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头
 *
 */
/*
 * 接口定义部分，包含对学生的增删改查
 */
// 查询所有内容接口
router.get('/testMogodb/query', async ctx => {
  let data = await StudentDb.query()
  ctx.body = data
})
// 按条件查询接口
router.post('/testMogodb/search', async ctx => {
  const queryPars = ctx.request.body
  console.log('queryPars', queryPars)
  let data = await StudentDb.where(queryPars)
  ctx.body = data
})
// 添加接口
router.post('/testMogodb/add', async ctx => {
  const studentObj = {
    name: ctx.request.body.name,
    age: ctx.request.body.age,
    studentId: ctx.request.body.studentId
  }
  let code, message
  try {
    await StudentDb.save(studentObj)
    code = 0
    message = 'Add successful'
  } catch (error) {
    code = -1
    message = error || 'Add failure'
  }
  ctx.body = {
    code,
    message
  }
})
// 更新已有内容的接口
router.post('/testMogodb/update', async ctx => {
  let code, message
  const result = await StudentDb.update({
    name: ctx.request.body.name,
    age: ctx.request.body.age,
    studentId: ctx.request.body.studentId,
    _id: ctx.request.body._id
  })
  try {
    await result
    code = 0
    message = 'Update successful'
  } catch (error) {
    code = -1
    message = error || 'Update failure'
  }
  ctx.body = {
    code,
    message
  }
})
// 删除指定内容接口
router.post('/testMogodb/del', async ctx => {
  const studentObj = {
    studentId: ctx.request.body.studentId,
    _id: ctx.request.body._id
  }
  let code, message
  try {
    await StudentDb.del(studentObj)
    code = 0
    message = 'Delete successful'
  } catch (error) {
    code = -1
    message = error || 'Delete failure'
  }
  ctx.body = {
    code,
    message
  }
})

// 错误监控
app.on('error', (err, ctx) => {
  console.log('server error', err, ctx)
})
app.listen(port)

/* 利用koa-router用于定义路由 可能是一般的页面路由类似我们web vue-router
 * 也可以是定义接口的地址路由
 * router.post('/users', ctx => {
 *   // ....
 * })
 * .put('/user/:id', ctx => {
 *   // ....
 * })
 * .del('/user/:id', ctx => {
 *   // ....
 * })
 * .all('/user/:id', ctx => {
 *   // ....
 * });
 */
