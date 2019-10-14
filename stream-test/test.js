// const fs = require('fs');
// const path = require('path');

// const fileName1 = path.resolve(__dirname, 'data.txt');
// const fileName2 = path.resolve(__dirname, 'data-bak.txt');

// const readStream = fs.createReadStream(fileName1);
// const writeStream = fs.createWriteStream(fileName2);

// readStream.pipe(writeStream);

// readStream.on('data', data => {
// 	console.log(data.toString());
// })

// readStream.on('end', () => {
// 	console.log('拷贝完成');
// })

const fs = require('fs');
const path = require('path');
const http = require('http');
const fileName1 = path.resolve(__dirname, 'data.txt');

const readStream = fs.createReadStream(fileName1);

const server = http.createServer((req, res) => {
	if (req.method === 'GET')  {
		// 设置请求头， 防止中文乱码
		res.setHeader('Content-type', 'text/plain; charset=utf-8');
		readStream.pipe(res);
	}
})
server.listen(8888);