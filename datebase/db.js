'use strict';
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'nodejs'
});

//将结果已对象数组返回
const row = (sql) => {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      console.log(err)
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, function (error, res) {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  });
};

//模块导出
module.exports = { row };
