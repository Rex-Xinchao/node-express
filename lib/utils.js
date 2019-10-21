let moment = require('moment');

function camelCase (string) {
  // Support: IE9-11+ 驼峰
  return string.replace(/_([a-z])/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

function underlineToCamelCase (item) {
  if (item === null) {
    return '';
  }
  if (typeof item === 'function') {
    return toQueryString(item());
  }
  item = JSON.stringify(item);
  item = JSON.parse(item);
  if (item instanceof Array) {
    let newItem = [];
    item.forEach(function (element, index) {
      if (element instanceof Object) {
        newItem.push(underlineToCamelCase(element));
      } else {
        newItem.push(element);
      }
    });
    return newItem;
  } else {
    let newItem = {};
    for (let key in item) {
      if (item[key] instanceof Array) {
        newItem[camelCase(key)] = underlineToCamelCase(item[key]);
      }
      if (item[key] instanceof Object) {
        newItem[camelCase(key)] = underlineToCamelCase(item[key]);
      } else {
        if (key.indexOf('time') > 0) {
          item[key] = dateTimeFormat(item[key], 'YYYY-MM-DD HH:mm:ss');
        }
        newItem[camelCase(key)] = item[key];
      }
    }
    // console.log(newItem);
    return newItem;
  }
}

function dateTimeFormat (value, formatStr) {
  return moment(value).format(formatStr);
}

function setAddDateTime (value, formatStr) {
  return moment().add(value, 'days').format(formatStr);
}

function isEmpty (value) {
  return value === null || value === undefined;
}

function deepClone (value) {
  return JSON.parse(JSON.stringify(value))
}

module.exports = { underlineToCamelCase, isEmpty, setAddDateTime, deepClone };
