const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register(path) {
    const info = {};
    if (typeof path === 'string') {
      info.path = path;
      info.stack = slice.call(arguments, 1);
    } else{
      info.path = '/';
      info.stack = slice.call(arguments, 0);
    }
    console.log(info);
    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  handle(req, res, result) {
    const next = () => {
      const middleware = result.shift();
      if (middleware) {
        middleware(req, res, next);
      }
    }
    next();
  }

  match(method, url) {
    let stack = [];
    if (url === '/favicon.ico') {
      return;
    }
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]);
    console.log(method);
    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0)  {
        stack = stack.concat(routeInfo.stack);
      }
    })
    return stack
  }

  callback() {
    return (req, res) => {
      const method = req.method.toLowerCase();
      const url = req.url;
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json;charset=utf-8');
        res.end(
          JSON.stringify(data)
        )
      }
      const result = this.match(method, url);
      this.handle(req, res, result);
    }
  }

  listen(...arg) {
    const server = http.createServer(this.callback());
    server.listen(...arg)
  }
}

module.exports = () => {
  return new LikeExpress();
}