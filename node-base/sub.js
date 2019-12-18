process.on('message', (m) => {
    console.log('子进程收到消息', m);
    // process.kill(Number(m))
});

// 使父进程收到消息

process.send({
    foo: 'bar',
    baz: NaN
})

console.log('######子进程pid:%d', process.pid);


process.kill(process.pid)
