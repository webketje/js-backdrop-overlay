var fs = require('fs');
var path = require('path');
var UglifyJS = require('uglify-js');

var contents = fs.readFileSync(
  path.join(process.cwd(), 'index.js'),
  'utf-8'
);

fs.writeFileSync(
  path.join(process.cwd(), 'index.min.js'),
  UglifyJS.minify(contents).code,
  'utf-8'
);

console.log('Minfication done')