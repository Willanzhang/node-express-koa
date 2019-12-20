const cp = require('child_process');


const child = cp.fork(`${__dirname}/sub.js`);

child.on('message', m => {
	console.log('\t 父进程收到消息', m)
})

console.log('######父进程pid:%d', process.pid);
console.log('######子进程pid:%d', child.pid);

// http://nodejs.cn/api/child_process.html#child_process_example_sending_a_server_object 发送 server 对象 和 socket 对象
child.send(process.pid)

child.on('close', (code) => {
	console.log('\t 子进程退出退出码是%d', code);
})

console.log('\t 子进程 IPC通道', child.channel);
process.on('exit', code => {
	console.log('\t 父进程退出退出码是%d', code);
})


// setTimeout(() => {
//     process.exit(0)
//     // 退出子进程
//     child.kill();
// }, 2000);