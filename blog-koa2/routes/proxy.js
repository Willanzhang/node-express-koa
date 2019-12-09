const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')

// 前缀
router.prefix('/api/proxy')

router.get('/get-proxy', async function (ctx, next) {
//   const { username, password } = ctx.request.body;
// 	if (data.username) {              
// 			// 设置 session
// 			ctx.session.username = data.username
// 			ctx.session.realname = data.realname

// 			ctx.body = new SuccessModel()
// 			return
// 	}
	ctx.body = new SuccessModel("1234545")
})


module.exports = router
