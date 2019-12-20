const cluster = require('cluster');
const http = require('http');

const numCPUs = require('os').cpus().length;

// 主进程 负责分配任务
if (cluster.isMaster) {
	console.log(`主进程 ${process.pid} 正在运行`);

	// 衍生进程
	for (let i = 0; i < numCPUs; i++) {
		let worker = cluster.fork();
		worker.send(i);
		if (i < 6) {
			// worker.exit()
			setTimeout(() => {
				// 关闭子进程
				worker.kill();
			}, 2000);
		}
		// worker.on('online', (cc) => {
		//     console.log('\t 工作进程上线');
		// })
	}
	// 获取工作进程
	// console.log(`\t 有哪些工作进程`, cluster.workers);
	cluster.on('exit', (worker, code, signal) => {
		console.log(`工作进程 ${worker.process.pid} 已退出 ${signal} code ${code}`);
	});
} else {
	// 工作进程
	process.on('message', (m) => {
		console.log(`子进程 ${process.pid} 接受数据:  ${m}`);
		http.createServer((req, res) => {
			res.writeHead(200);
			res.end('hello world\n');
		}).listen(8000);

		console.log(`工作进程 ${process.pid} 已启动`);
	})
	process.on('exit', (code) => {
		console.log(`工作进程 ${process.pid} 关闭 code: ${code}`);
	})
}
