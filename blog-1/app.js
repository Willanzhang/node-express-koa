const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 处理 post data
const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
        if (rq.method !== 'POST') {
            resolve({});
            return;
        } 
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                return resolve({});
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {

    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json');

    // 处理path
    const url = req.url;
    res.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);

    // 处理postData
    getPostData(req).then(postData => {
        req.body = postData;

        // 处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                 res.end(
                    JSON.parse(blogData)
                );
                return;
            })
        }

        // if (blogData) {
        //     res.end(
        //         JSON.parse(blogData)
        //     );
        //     return;
        // }
    
        // 处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                );
                return;
            })
        }
        
        // const userData = handleUserRouter(req, res);
        // if (userData) {
        //     res.end(
        //         JSON.parse(userData)
        //     );
        //     return;
        // }
    
        // 未命中路由
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write('404 not found\n');
        res.end();
        return;
    })
}

module.exports = serverHandle

// process.env.NODE_ENV
