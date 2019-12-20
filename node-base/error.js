// const net = require('net');
// const write = require('stream');

// try {

//     const connection = net.connect('localhost');
// } catch(e) {
//     console.log('123');
// }

// // 添加一个 'error' 事件句柄到一个流：
// connection.on('error', (err) => {
//   // 如果连接被服务器重置，或无法连接，或发生任何错误，则错误会被发送到这里。 
//   console.error(err);
// });


// connection.pipe(process.stdout);

// ---------------------------------------------------------
// const EventEmitter = require('events');
// const ee = new EventEmitter();

// setImmediate(() => {
//   // 这会使进程崩溃，因为还为添加 'error' 事件句柄。
//   ee.emit('error', new Error('这会崩溃'));
// });
// ee.on('error', (e) => {
//     console.log('12');
// })

// ################################################################
// 这不可行：
const fs = require('fs');
try {
    fs.readFile('./index.jsx', (err, data) => {
        if (err) {
            throw '123';
        }
        // let result = Buffer.from(data).toString('utf8');
        // console.log(result);
    });
} catch(e) {
    console.log(e);
}

// 捕获未捕获的错误
process.on('uncaughtException', (e) => {
    console.log('----------');
    console.log(e)
})
https://cn6.343480.com/20191220/q2lGmxgj/800kb/hls/Fgrqi8xR.ts  46

https://cn6.343480.com/ppvod/eQy2PiQe