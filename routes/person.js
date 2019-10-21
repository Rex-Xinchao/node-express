const express = require('express');
const router = express.Router();
const person = require('../model/person');
const ERROR = require('../lib/error');
const utils = require('../lib/utils');
/* GET users listing. */
router.get('/list', function(req, res, next) {
  // console.log(req.headers) 请求头
  if (utils.isEmpty(req.query.id)) {
    res.status(400).send(ERROR.errorParams);
  }
  person.list(req.query, function (dbRes) {
    res.send(utils.underlineToCamelCase(dbRes));
  }, function (err) {
    res.status(400).send(err);
  });
});

module.exports = router;
