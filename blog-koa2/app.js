const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs');
const morgan = require('koa-morgan')

const blog = require('./routes/blog')
const user = require('./routes/user')
const proxy = require('./routes/proxy')

const { REDIS_CONF } = require('./conf/db');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
	enableTypes:['json', 'form', 'text']
}))
app.use(json())
// logger 只是处理 console.log 成容易阅读的方式  没有记录日志文件的作用
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
	extension: 'pug'
}))

// morgan
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const ENV = process.env.NODE_ENV

if (ENV !== 'production') {
	// 开发环境， 测试环境
	app.use(morgan('dev'));
} else {
	// 线上环境
	const logFileName = path.join(__dirname, 'logs', 'access.log');
	const writeStream = fs.createWriteStream(logFileName, {
		flags: 'a'
	})
	// app.use(morgan('combined', {
	// 	// stream: process.stdout // 默认控制台输出
	// 	stream: writeStream
	// }));
}

// 写在 rooter 注册前
app.keys = ['#$&*ds13fsaW2><0']

app.use(session({
	// 配置cookie
	cookie: {
		path: '/',
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000
	},
	// 配置 redis
	store: redisStore({
		all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
		password: "123456"
	})
}))

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(proxy.routes(), proxy.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app
