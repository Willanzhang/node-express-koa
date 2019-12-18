const router = require('koa-router')()
const { redisClient, zrange} = require('../db/redis')


const { SuccessModel, ErrorModel } = require('../model/resModel')

// 前缀
router.prefix('/api/proxy')

router.get('/get-proxy', async function (ctx, next) {
//  const { username, password } = ctx.request.body;
// 	if (data.username) {              
// 			// 设置 session
// 			ctx.session.username = data.username
// 			ctx.session.realname = data.realname

// 			ctx.body = new SuccessModel()
// 			return
// 	}
	let data =await zrange('ips', 0, 10)
	console.log('index-----------', data);
	ctx.body = new SuccessModel(data)

})


module.exports = router
