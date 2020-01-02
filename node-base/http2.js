const http2 = require('http2');
const fs = require('fs');

// 生成 秘钥和证书   https://blog.csdn.net/bbwangj/article/details/82503675

// 使用 已有RSA 私钥生成自签名证书
// openssl req -new -x509 -days 365 -key 密钥.pem -out cert.crt

const server = http2.createSecureServer({
  key: fs.readFileSync('密钥.pem'),
  cert: fs.readFileSync('cert.crt')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
  // 流是一个双工流。
  stream.respond({
    'content-type': 'text/html',
    ':status': 200
  });
  stream.end('<h1>你好世界</h1>');
});

server.listen(8443);