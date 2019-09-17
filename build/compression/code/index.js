const fs = require('fs');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const log = require('fancy-log');
const { chalkPink, chalkBlue, chalkGreen, getDirFiles } = require('./utils.js');

log('Starting', `'${chalkBlue('CodeMin')}'...`);

const start = new Date();
const wxssMinify = require('./scripts/wxss-minifier.js');
const wxmlMinify = require('./scripts/wxml-minifier.js');
const wxjsMinify = require('./scripts/wxjs-minifier.js');
const folderPath = path.resolve('dist');
const files = getDirFiles(folderPath);

for (let file of files) {
  if (!fs.statSync(file).isFile()) continue;
  else if (file.endsWith(`.wxml`)) wxmlMinify.minify(file);
  else if (file.endsWith(`.wxss`)) wxssMinify.minify(file);
  else if (file.endsWith(`.js`))   wxjsMinify.minify(file);
}


log('Finished', `'${chalkBlue('CodeMin')}'`, 'after', chalkPink(new Date() - start), chalkPink('ms'));

