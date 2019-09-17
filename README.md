## 运行

```bash
# 安装依赖
npm install

# 运行
npm run dev

# 打开开发者工具，选择dist目录，查看效果
```

## 你必须要做的三件事！

#### NO.1：配字体！
本模板提供了字体压缩功能，配一配，单车变摩托！只需要配置基本的参数，就能将几兆十几兆的字体源文件转化为我们爱不释手的scss文件，然后小手这么一导，就能在代码中使用了！

本模板默认配置了字体思源宋（ SourceHanSerifCNMedium ）和 汉义大宋简（ HYDSJ ），有不需要的，删！有新增加的，添！有不符合的，改！具体如何增删改，请自行翻找字体教程区域 - 在下面！

#### NO.2：配接口环境
每个人心中都有自己的秘密，就如每个项目都有不同的接口。请找到 `src/config.js`，配置不同环境下的接口地址！
```
// 接口地址，请配置dev、oa、pre和pro下的接口地址
// 如果需要切换环境，只需要修改prefix的值即可
const prefix = '';        // 环境，['','dev','oa','pre']
const hosts = {
  'dev': 'https://test.com/api',
  'oa': 'https://test.com/api',
  'pre': 'https://test.com/api',
  'pro': 'https://test.com/api'
}
```

#### NO.3：配地址
1. 你猜的没错，我们要登录地址了，请找到 `src/config.js`，修改 `wxloginUrl` 对应的地址

##### **就是这么洒脱，到此为止你已经完成了所有你需要做的事情了，请愉快地开始开发吧！如果你比较闲，就继续听我吹吹b吧！**

## 我们为你做的事
#### NO.1：封装http请求
如何使用：我们增强了 `Page` 的能力，在Page中可直接调用 `this.$http`
```javascript
// get
this.$http.get('url', {params: ''}).then((res) => {}).catch((err) => {});

// post
this.$http.post('url', {params: ''}).then((res) => {}).catch((err) => {});
```
如果是在 `Component` 里，需要先引入http文件
```
http.js路径：src/plugins/http.js
```

#### NO2：封装弹窗（成功、失败、加载中）
成功弹窗和失败弹窗应该是比较常见的应用场景，放心，我们包了，在 `Page` 中可直接通过 `this.$showSuccess` 和 `this.$showError` 来触发弹窗

```
// { title, needHideLoading }
this.$showSuccess('操作成功', false);

// { title, content, needHideLoading}
this.showError('操作失败', '操作失败，请稍后重试', false);

this.$showLoading('数据加载中...');
this.$hideLoading();
```

#### NO.3：字体压缩 - 配置教程

> 步骤一：基本配置 - 仅在使用新的字体类型时进行配置

1. ttf字体文件配置：将ttf格式的字体文件放到指定路径，并将路径配置到`fontconfig.js`文件中

```
建议路径：src/assets/fonts/XXXX/XXXX.ttf
```

2. 入口文件和输出路径的配置：在`fontconfig.js`中配

```
入口文件默认配置：src/assets/fonts/font.html

输出路径默认配置：src/assets/fonts/
```

3. 配置样例 - `fontconfig.js`

```
module.exports = {
  entry: 'src/assets/fonts/font.html',
  output: 'src/assets/fonts/'
  fonts: [{
    name: 'SourceHanSerifCNMedium',
    path: 'src/assets/fonts/SourceHanSerifCNMedium/SourceHanSerifCN-Medium.ttf'
  }]
}
```

> 步骤二：字体使用

在入口文件中使用新增字体，格式如下：

```
<!DOCTYPE html>
<html>
<head>
<style>
  @font-face {
    font-family: 'SourceHanSerifCNMedium';
    src: url('SourceHanSerifCNMedium/SourceHanSerifCN-Medium');
    src:
      url('SourceHanSerifCNMedium/SourceHanSerifCN-Medium.eot?#font-spider') format('embedded-opentype'),
      url('SourceHanSerifCNMedium/SourceHanSerifCN-Medium.woff') format('woff'),
      url('SourceHanSerifCNMedium/SourceHanSerifCN-Medium.ttf') format('truetype'),
      url('SourceHanSerifCNMedium/SourceHanSerifCN-Medium.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  #SourceHanSerifCNMedium {
    font-family: SourceHanSerifCNMedium;
  }
</style>
</head>
<body>
  <div id="SourceHanSerifCNMedium">
    这里是需要使用字体的文字
  </div>
</body>
</html>
```

> 步骤三：执行压缩命令

执行完成后，会在配置的output路径下生成对应的scss文件，在小程序中引入该scss文件就可以使用对应字体了
```
npm run fontCompression
```

#### NO.4：图片压缩 - 配置教程
1. 将原图片放在```src/assets/images/.images```文件夹中;

2. 执行imgMin task后，生成的压缩后的图片在```src/assets/images```文件夹中，使用时直接引入图片即可

```bash
# parse命令会完成字体压缩、图片压缩和字体图片
npm run parse
```

#### NO.5：代码压缩

下面的命令会自动压缩dist文件夹下的所有代码（wxml、wxss、js），上传代码前请使用该命令

```
npm run codeCompression
```

#### 注意

mp-parse 需使用1.1.4及以上的版本，copy功能会过滤掉以```.```开头的文件夹内容

## 模板概览

```tree
.
├── README.md
├── build
│   └── compression                                                             // 压缩相关代码
├── gulpconfig.js                                                               // gulp 配置文件
├── gulpfile.js                                                                 // gulp 入口文件
├── libs                                                                        // gulp 任务对应文件
│   ├── fontToBase64.js
│   ├── iconFont.js
│   ├── iconfontToBase64.js
│   └── imgMin.js
├── package-lock.json
├── package.json
└── src                                                                         // 小程序项目文件夹
    ├── app.vue                                                                 // 小程序入口文件
    ├── assets
    │   ├── fonts                                                               // 字体相关
    │   │   └── font.html
    │   ├── iconfont                                                            // iconfont 相关
    │   └── images                                                              // 图片相关
    ├── components                                                              // 组件文件夹
    │   ├── common                                                              // 字体相关
    │   │   └── README.md                                                       // 组件使用说明
    ├── plugins                                                                 // http和cookie封装
    ├── utils                                                                   // 公共方法
    └── pages                                                                   // 小程序各页面文件夹
        └── index.vue

```
