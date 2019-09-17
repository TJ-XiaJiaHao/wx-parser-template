#!/user/bin/env node
const path = require('path');
const chalk = require('chalk'); // 有颜色的字
const ora = require('ora');     // 菊花转
const fs = require('fs');
const mimeType = require('mime-types');
const fontSpider = require('font-spider');
const log = require('fancy-log');

// 默认配置初始化
let config = {
  entry: 'src/assets/fonts/font.html',
  output: 'src/assets/fonts/',
  fonts: []
}

// 自定义配置
const confPath = path.join(process.cwd(), 'fontconfig.js');

if (fs.existsSync(confPath)) config = Object.assign(config, require(confPath));

// 执行字体压缩
fontCompression(path.resolve(config.entry));

// 绿色字符串
function chalkGreen(str) {
  return chalk.green(str);
}

// 蓝色字符串
function chalkBlue(str) {
  return chalk.hex('#0099FF')(str);
}

// 粉色字符串
function chalkPink(str) {
  return chalk.hex('#FF0099')(str);
}

// 压缩字体，读取文件，利用font-spider压缩字体
function fontCompression(filePath) {

  const start = new Date();

  log('Starting', `'${chalkBlue('fontMin')}'...`);

  fontSpider(filePath).then(() => {

    log('font-spider:', chalkGreen(config.entry));

    log('Finished', `'${chalkBlue('fontMin')}'`, 'after', chalkPink(new Date() - start), chalkPink('ms'));

    fontTransform();
  });
}


// 字体转换为base64
function fontTransform() {

  const start = new Date();

  log('Starting', `'${chalkBlue('fontTransform')}'...`);

  for (let i = 0; i < config.fonts.length; i++) {

    const filePath = path.resolve(config.fonts[i].path);  // ttf文件

    const outputName = config.fonts[i].name;

    const outputPath = `${config.output}${outputName}.scss`;

    let data = fs.readFileSync(filePath);

    data = new Buffer(data).toString('base64');

    let base64 = 'data:' + mimeType.lookup(filePath) + ';base64,' + data;

    base64ToFile(outputName, outputPath, base64);

    log('font-transform:', chalkGreen(config.fonts[i].path.split('/').slice(-1)), chalkGreen('->'), chalkGreen(outputPath.split('/').slice(-1)));
  }

  log('Finished', `'${chalkBlue('fontTransform')}'`, 'after', chalkPink(new Date() - start), chalkPink('ms'));
}

// base64转换为scss文件
function base64ToFile(name, outputPath, content) {

  const filePath = path.resolve(outputPath);

  const template = `@font-face { font-family: '${name}'; src: url(${content}) format('truetype');font-weight: 500;font-style: normal;}`;

  fs.writeFile(filePath, template, () => {

    log('create-file:', chalkGreen(outputPath));

  });
}

