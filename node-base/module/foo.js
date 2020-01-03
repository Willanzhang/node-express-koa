const m = require('./foom.mjs');

// 是否直接执行
if (require.main === module) {
    console.log('这里是主模块');
}


console.log(require.main.filename);
console.log(module.paths);
module.exports = exports =  {
    a: 123
}
exports.c = 'ccc';
