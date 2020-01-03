const net = require('net');

const server = net.createServer((socket) => {
    socket.end('再见\n');
  }).on('error', (err) => {
    // 处理错误
    throw err;
  });
  
  // 获取任意未使用的端口。
  server.listen(() => {
    console.log('打开服务器', server.address());
  });

  server.getConnections((err, count) => {
      console.log(count);
  })