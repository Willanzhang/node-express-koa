// const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// // 创建链接对象
// const con = mysql.createConnection(MYSQL_CONF)

// // 开始链接
// con.connect()

// // 统一执行 sql 的函数
// function exec(sql) {
//     const promise = new Promise((resolve, reject) => {
//         con.query(sql, (err, result) => {
//             if (err) {
//                 reject(err)
//                 return
//             }
//             resolve(result)
//         })
//     })
//     return promise
// }

// module.exports = {
//     exec,
//     escape: mysql.escape
// }

var mysql = require('mysql');

// 创建 mysql 连接池资源
var pool = mysql.createPool(MYSQL_CONF);

// exports.query = function (sql, arr, callback) {
//     //建立链接
//     pool.getConnection(function (err, connection) {
//         if (err) { throw err; return; }
//         connection.query(sql, arr, function (error, results, fields) {
//             //将链接返回到连接池中，准备由其他人重复使用
//             connection.release();
//             if (error) throw error;
//             //执行回调函数，将数据返回
//             resolve(results);
//         });
//     });
// }

function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        //建立链接
        pool.getConnection(function (err, connection) {
            if (err) {
                throw err;
            }
            connection.query(sql, function (error, results) {
                //将链接返回到连接池中，准备由其他人重复使用
                connection.release();
                if (error) {
                    throw error
                };
                //执行回调函数，将数据返回
                resolve(results);
            });
        });
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}
