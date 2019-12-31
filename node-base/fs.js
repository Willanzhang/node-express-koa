const fs = require('fs');

// window 需要 管理员权限
// fs.unlink('./tmp/hello', (err) => {
//     if (err) throw err;
//     console.log('已成功删除  /tmp/hello');
//   });


// console.log(__dirname === process.cwd());

// 代开文件 fd 文件标识符
// fs.open(__dirname + '/tmp/index.js', 'r', (err, fd) => {
//     if (err) throw err;
//     console.log(fd);
//     fs.fstat(fd, (err, stat) => {
//       if (err) throw err;
//       // 使用文件属性。
//         console.log(stat);
//       // 始终关闭文件描述符！
//       fs.close(fd, (err) => {
//         if (err) throw err;
//       });
//     });
// })



// async function print(path) {
//   const dir = await fs.opendir(path); // v12.12 才添加的
//   console.log(dir, '--------');
//   for await (const dirent of dir) {
//     console.log(dirent.name);
//   }
// }
// print('/').catch(console.error);

// console.log(fs.readdirSync('tmp', {
//     withFileTypes: true
// })[1].name);

// 检测文件是否改变
// const watcher = fs.watch('./tmp/index.js', { encoding: 'utf8' }, (eventType, filename) => {
//     if (filename) {
//       console.log(filename);
//       // 打印: <Buffer ...>
//     }
//     if (eventType) {
//         console.log(eventType);
//     }
//   });

//   watcher.on('close', (err) => {
//       console.log('clllose--');
//   })

//   setTimeout(() => {
//     watcher.close();
//   }, 5000);


// fs.access(path[, mode], callback)   测试用户对 path 指定的文件或目录的权限
// http://nodejs.cn/api/fs.html#fs_file_access_constants 第二个参数  文件可访问性的常量   fs.constants.F_OK W_OK R_OK X_OK

const file = 'package.json';
// 检查当前目录中是否存在该文件。
fs.access(file, fs.constants.F_OK, (err) => {
    console.log(err);
    console.log(`${file} ${err ? '不存在' : '存在'}`);
})
// 检查文件是否可读。
fs.access(file, fs.constants.R_OK, (err) => {
    console.log(`${file} ${err ? '不可读' : '可读'}`);
});

// 检查文件是否可写。
fs.access(file, fs.constants.W_OK, (err) => {
    console.log(`${file} ${err ? '不可写' : '可写'}`);
});

// 检查当前目录中是否存在该文件，以及该文件是否可写。
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.error(
            `${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
    } else {
        console.log(`${file} 存在，且它是可写的`);
    }
});