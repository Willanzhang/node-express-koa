'use strict'

console.log('__dirname', __dirname);
console.log('__filename', __filename);


// exports 是 module.exports 的简称
console.log(module.exports === exports);

queueMicrotask((err) => {
    console.log(err);
})