const https = require('https');
const fs = require('fs');

// const options = {
//     key: fs.readFileSync('密钥.pem'),
//     cert: fs.readFileSync('cert.crt')
// };

// https.createServer(options, (req, res) => {
//     // req.pipe(res);
//     res.writeHead(200);
//     res.end('hello world\n');
// }).listen(8000);


https.get('https://encrypted.google.com/', (res) => {
  console.log('状态码:', res.statusCode);
  console.log('请求头:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});

process.stdout.write('123')