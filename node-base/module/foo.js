
if (require.main === module) {
    console.log('这里是主模块');
}


console.log(require.main.filename);
module.exports = {
    a: 123
}