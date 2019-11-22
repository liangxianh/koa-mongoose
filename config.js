var nodeEnv = process.env.NODE_ENV
nodeEnv = 'test'
var port, apiHost

// 线上
if (nodeEnv === 'prd') {
  port = 7001
  apiHost = 'https://www.baidu.com'
}
// 其他环境
else {
  port = 7001
  apiHost = 'http://www.baidu.com/'
}

module.exports = {
  // 端口号
  PORT: port,
  // 接口地址
  APIHOST: apiHost,
  // aws目录
  NODEENV: nodeEnv
}
