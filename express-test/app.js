const express = require('express');

// 本次 http 请求的实例
const app = express();

app.use((req, res, next) => {
	console.log('请求开始、、、、', req.method, req.url);
	next();
})

app.use((req, res, next) => {
	// 假设处理 cookie
	req.cookie = {
		userId: 'abc123'
	}
	next();
})

app.use((req, res, next) => {
	// 假设处理postData
	// 异步
	console.log('处理postData 异步');
	setTimeout(() => {
		req.body = {
			a: 100,
			b: 200
		}
		next();
	}, 1000);
})

app.use('/api', (req, res, next) => {
	console.log('处理 /api 路由');
	next();
})

app.get('/api', (req, res, next) => {
	console.log('get  /api 路由');
	next();
})

app.post('/api', (req, res, next) => {
	console.log('post  /api 路由');
	next();
})



// 模拟登陆成功  这里可以做登陆校验
function loginCheck(req, res, next) {
	console.log('模拟登陆成功');
	setTimeout(() => {
		next();
	});
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
	console.log('get /api/get-cookie');
	res.json({
		errno: 0,
		data: req.cookie
	})
})

app.post('/api/get-post-data', (req, res, next) => {
	console.log('post /api/get-post-cookie');
	res.json({
		errno: 0,
		data: req.body
	})
})

app.use((req, res, next) => {
	console.log('处理404');
	res.json({
		errno: -1,
		data: '404 not found'
	})
})

app.listen(3000, () => {
	console.log('listen 3000');
})