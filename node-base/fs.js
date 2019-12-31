const fs = require('fs');

// fs.unlink('./tmp/hello', (err) => {
//     if (err) throw err;
//     console.log('已成功删除  /tmp/hello');
//   });


// console.log(__dirname === process.cwd());

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


async function print(path) {
  const dir = await fs.opendir(path);
  console.log(dir, '--------');
  for await (const dirent of dir) {
    console.log(dirent.name);
  }
}
print('/').catch(console.error);