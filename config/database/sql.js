var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

function sql(file) {
  return new QueryFile(path.join(__dirname, 'sql', file + '.sql'), { minify: true });
}

module.exports = sql;
