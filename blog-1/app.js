const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

const serverHandle = (req, res) => {

    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 处理path
    const url = req.url;
    res.path = url.split('?')[0];

    const resData = {
        name: 'willima',
        site: 'blog',
        env: process.env.NODE_ENV
    }

    // 处理blog路由
    const blogData = handleBlogRouter(req, res);
    if (blogData) {
        res.end(
            JSON.parse(blogData)
        );
        return;
    }

    // 处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
        res.end(
            JSON.parse(userData)
        );
        return;
    }

    // 未命中路由
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write('404 not found\n');
    res.end();
    return;
}

module.exports = serverHandle

// process.env.NODE_ENV
