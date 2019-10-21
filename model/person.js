const db = require('../datebase/db');
module.exports = {
  list: function (id, resolve, reject) {
    let query = {
      sql: 'SELECT * FROM person WHERE id = ?',
      timeout: 4000,
      values: [id]
    };
    db.row(query).then(function (dbRes) {
      resolve(dbRes);
    }, function (err) {
      reject(err);
    });
  }
};
