// const assert = require('assert');
const http = require('http');
const async_hooks = require('async_hooks');
const { spawn } = require('child_process');
const notepad = spawn('notepad');

notepad.stdout.on('data', (data) => {
    subprocess.
  console.log(`stdout: ${data}`);
});

notepad.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

notepad.on('close', (code) => {
  console.log(`notepad子进程退出，使用退出码 ${code}`);
});

const tree = spawn('tree');

tree.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

tree.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

tree.on('close', (code) => {
  console.log(`tree子进程退出，使用退出码 ${code}`);
});



// const eid = async_hooks.executionAsyncId();

// http.get('http://blog.zhangbowen.club/api/proxy/get-proxy', (res) => {
//     const eid1 = async_hooks.executionAsyncId();
//     console.log(res, eid1);
// })

// http.createServer((req, res) => {
//     console.log('监听9999', eid);
//     res.end(JSON.stringify({
//         errCode: 1
//     }))
// }).listen(9999)
