// 标准输入输出
// process.stdin.pipe(process.stdout);

const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'POST')  {
    console.log(12);
    // 将输入 输出通过管到连接
    req.pipe(res);
  }
})
server.listen(8888);