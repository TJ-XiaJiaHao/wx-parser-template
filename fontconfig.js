/*
 * 字体压缩配置文件，配置说明：
 * entry：字体入口，类型为html文件
 * output：字体压缩完成后scss文件的输出路径
 * fonts：具体的字体配置
 *     name：生成的字体名字，名字可自定义，与font-family保持一致即可
 *     path：未压缩的字体路径，格式为ttf格式，需与html中的字体路径保持一致

 * 在app.vue中引入output下的scss文件，即可使用对应字体
 */

module.exports = {
  entry: 'src/assets/fonts/font.html',
  output: 'src/assets/fonts/',
  fonts: [{
    name: 'SourceHanSerifCNMedium',
    path: 'src/assets/fonts/SourceHanSerifCNMedium/SourceHanSerifCN-Medium.ttf'
  }]
}
