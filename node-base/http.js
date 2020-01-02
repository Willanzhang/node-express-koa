// const http = require('http');
// http.get({
//     hostname: 'localhost',
//     port: 9999,
//     path: '/',
//     agent: false  // 仅为此一个请求创建一个新代理。
//   }, (res) => {
//     // 用响应做些事情。
//     res.on('data', data => {
//         console.log(Buffer.from(data).toString());
//     })
//     console.log();
//   });

// http.ClientRequest 类
// const http = require('http');
// const net = require('net');
// const { URL } = require('url');

// // 创建 HTTP 隧道代理。
// const proxy = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('--------------------响应内容');
// });
// proxy.on('connect', (req, cltSocket, head) => {
//   // 连接到原始服务器。
//   const { port, hostname } = new URL(`http://${req.url}`);
//   const srvSocket = net.connect(port || 80, hostname, () => {
//     cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
//                     'Proxy-agent: Node.js-Proxy\r\n' +
//                     '\r\n');
//     srvSocket.write(head);
//     srvSocket.pipe(cltSocket);
//     cltSocket.pipe(srvSocket);
//   });
// });

// // 代理正在运行。
// proxy.listen(1337, '127.0.0.1', () => {

//   // 向隧道代理发出请求。
//   const options = {
//     port: 1337,
//     host: '127.0.0.1',
//     method: 'CONNECT',
//     path: 'nodejs.cn:80'
//   };

//   const req = http.request(options);
//   req.end();

//   req.on('connect', (res, socket, head) => {
//     console.log('已连接');

//     // 通过 HTTP 隧道发出请求。
//     socket.write('GET / HTTP/1.1\r\n' +
//                  'Host: nodejs.cn:80\r\n' +
//                  'Connection: close\r\n' +
//                  '\r\n');
//     socket.on('data', (chunk) => {
//       console.log(chunk.toString());
//     });
//     socket.on('end', () => {
//       proxy.close();
//     });
//   });
// });


// 'information' 事件
const http = require('http');

const options = {
  host: '127.0.0.1',
  port: 9999,
  path: '/length_request'
};

// 发出请求。
const req = http.request(options);
req.setHeader('content-type', 'text/html');
const contentType = req.getHeader('Content-Type');
console.log(req.path);
req.end();

// req.on('information', (info) => {
//   console.log(`获得主响应之前的信息: ${info.statusCode}`);
// });