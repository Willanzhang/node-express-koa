// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {

// }

// const myEmitter = new MyEmitter();

// myEmitter.on('event', () => {
//     console.log('触发事件');
// });

// myEmitter.emit('event');


// const http = require('http');
// const util = require('util');
// const server = http.createServer((req, res) => {
//     res.end('123');
// });
// server.listen(2222);
// server.on('connection', (stream) => {
//     console.log('有链接');
// })

// console.log(util.inspect(server.listeners('connection')));


const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('错误信息');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('出错', err);
  }
}

run();