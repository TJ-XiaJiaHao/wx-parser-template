#!/user/bin/env node
const path = require('path');
const chalk = require('chalk'); // 有颜色的字
const ora = require('ora');     // 菊花转
const fs = require('fs');
const mimeType = require('mime-types');
const fontSpider = require('font-spider');

module.exports = (options) => {
  let config = {
    src: 'src/assets/fonts/font.html',
    dest: 'src/assets/fonts/',
    fonts: []
  }

  config = Object.assign(config, options);

  // 压缩字体，读取文件，利用font-spider压缩字体
  function fontCompression(filePath) {

    console.log(chalk.blue('[font-compression]'), '- Compressed files');

    const spinner = ora(`  ${filePath}\n`);

    spinner.start();

    fontSpider(filePath).then(() => {
      spinner.stop();

      console.log(chalk.green(`  ${filePath}`));

      fontTransform();
    });
  }


  // 字体转换为base64
  function fontTransform() {
    for (let i = 0; i < config.fonts.length; i++) {

      const filePath = path.resolve(config.fonts[i].path);

      var data = fs.readFileSync(filePath);

      data = new Buffer(data).toString('base64');

      let base64 = 'data:' + mimeType.lookup(filePath) + ';base64,' + data;

      console.log(chalk.blue('\n[font-compression]'), '- Transform file');

      console.log(chalk.green(`  ${filePath}`));

      base64ToFile(config.fonts[i].name, base64);
    }
  }

  // base64转换为scss文件
  function base64ToFile(name, content) {

    const filePath = path.resolve(`${config.dest}${name}.scss`);

    const template = `@font-face { font-family: '${name}'; src: url(${content}) format('truetype');font-weight: 500;font-style: normal;}`

    fs.writeFile(filePath, template, () => {

      console.log(chalk.blue('\n[font-compression]'), '- Output file');

      console.log(chalk.green(`  ${filePath}`));
    });
  }

  return fontCompression(path.resolve(config.src));
};




















