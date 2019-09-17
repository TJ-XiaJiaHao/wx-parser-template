const fontConfig = require('./fontconfig.js');
module.exports = {
  tasks: [
    {
      name: 'imgMin',
      src: './src/assets/images/.images/**/*',
      dest: './src/assets/images',
      watch: false,
    },
    {
      name: 'iconFont',
      taskName: 'iconFont',
      src: './src/assets/iconfont/.iconfont',
      dest: './src/assets/iconfont/.catch',
      iconfont: {
        className: 'iconfont',
        fontPath: '',
      },
      watch: false,
    },
    {
      name: 'iconfontToBase64',
      taskName: 'iconfontToBase64',
      src: './src/assets/iconfont/.catch',
      dest: './src/assets/iconfont',
      watch: true,
    },
    {
      name: 'fontToBase64',
      taskName: 'fontToBase64',
      src: fontConfig.entry,
      dest: fontConfig.output,
      fonts: fontConfig.fonts,
    },
  ]
};
