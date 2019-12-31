const http = require('http');
http.get({
    hostname: 'localhost',
    port: 9999,
    path: '/',
    agent: false  // 仅为此一个请求创建一个新代理。
  }, (res) => {
    // 用响应做些事情。
    res.on('data', data => {
        console.log(Buffer.from(data).toString());
    })
    console.log();
  });

// http.ClientRequest 类