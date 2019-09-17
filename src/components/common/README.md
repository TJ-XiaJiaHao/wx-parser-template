#### 功能概览
```
// 组件
1. count-down：倒计时组件，共有两种模式
2. ellipsis-text：省略文本，超出指定行自动以省略号截断
3. hover-button：悬浮按钮，可拖拽，松手自动吸附左右边缘
4. sideslipping：测滑组件
5. toggle-text：点击可展开或关闭文本
6. wxlogin-wrap：微信登录外壳
7. drag-card：可拖拽卡片
8. image-previewer：九宫格图片预览器
9. image-selector：九宫格图片选择器
```

## 倒计时组件 - count-down

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
freeTime | Number | 0 | 倒计时剩余时间，单位为秒
split | Boolean | false | 是否拆分，拆分后天时分秒将各自独立
showDay | Boolean | false | 是否显示天，默认只显示时分秒
wrapStyle | String | '' | 组件整体样式
splitStyle | String | '' | 拆分后天时分秒的通用样式
splitDayStyle | String | '' | 倒计时拆分后日的样式
splitHouStyle | String | '' | 倒计时拆分后时的样式
splitMinStyle | String | '' | 倒计时拆分后分的样式
splitSecStyle | String | '' | 倒计时拆分后秒的样式

##### 内容槽

内容槽名 | 内容槽位置
---|---
splitAfterDay | 当组件拆分后，位于天和时之间，如果split为flase将无效
splitAfterHou | 当组件拆分后，位于时和分之间，如果split为flase将无效
splitAfterMin | 当组件拆分后，位于分和秒之间，如果split为flase将无效

##### 事件

事件名 | 参数 | 触发条件
---|---|---
countdownEnd | null | 倒计时结束

##### 样例

```
// 模式一
<count-down freeTime="12" bindcountdownEnd="countdownEnd"></count-down>

// 模式二
<count-down freeTime="54321" split="{{true}}"
    splitStyle="height:40rpx;line-height:40rpx;background:#FF6188;border-radius:8rpx;margin: 0rpx 12rpx;color:white;width: 50rpx;text-align: center;">
    <view slot="splitAfterHou">:</view>
    <view slot="splitAfterMin">:</view>
</count-down>
```

## 省略文本 - ellipsis-text

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
line | Number | 3 | 文本的最大行数
fontSize | Number | 24 | 文本字体大小
lineHeight | Number | 36 | 文本字体行高
fontWeight | Number | 400 | 文本字体粗细
fixHeight | Boolean | true | 当文本不足{line}行时是否保持{line}行高度
color | String | 'black' | 文本的颜色
textStyle | String | '' | 文本样式，优先级高于前面的样式设定

##### 样例

```html
<ellipsis-text line="3">这里是文本</ellipsis-text>
```

## 悬浮按钮 - hover-button

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
wrapStyle | String | '' | 悬浮框样式


##### 事件

事件名 | 参数 | 触发条件
---|---|---
tap | null | 点击该悬浮按钮

##### 样例

```html
<hover-button>
    <view class="hover-button">悬浮</view>
</hover-button>
```

## 测滑组件 - sideslipping

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
wrapStyle | String | '' | 测滑组件框样式
index | Number | 0 | 组件索引值
currentSlippingIndex | Number | -1 | 当前测滑组件索引值
maxSlip | Number | 60 | 最大测滑距离

** 想要关闭索引值为1的组件，只需要将currentSlippingIndex设置为非1的数字即可

##### 内容槽

内容槽名 | 内容槽位置
---|---
content | 上层可视区域的左边部分，可在该区域进行手势滑动功能
slip | 上层可视区域的右边部分，可在该区域进行手势点击功能
buttons | 下层遮蔽区域的按钮部分，滑动可出现在可视区域

##### 事件

事件名 | 参数 | 触发条件
---|---|---
itemTouch | 组件索引值{Number} | 点击slip区域或者触摸content区域
changeMovingStatus | 是否正在滑动{Boolean} | 滑动组件过程中或者滑动结束时触发
contentTap | 组件索引值{index} | 组件关闭时点击content区域

##### 样例
```
<sideslipping maxSlip="80" index="0" currentSlippingIndex="{{currentSlippingIndex}}"
              binditemTouch="onSideslippignTouch">
  <view slot="content" class="sideslipping-content">可滑动区域</view>
  <view slot="slip" class="sideslipping-slip">
    <image src="../assets/images/common/ellipsis.svg"></image>
  </view>
  <view slot="buttons" class="sideslipping-buttons">
    <view class="btn btn1">按钮1</view>
    <view class="btn btn2">按钮2</view>
  </view>
</sideslipping>
<sideslipping maxSlip="80" index="1" currentSlippingIndex="{{currentSlippingIndex}}"
              binditemTouch="onSideslippignTouch">
  <view slot="content" class="sideslipping-content">可滑动区域</view>
  <view slot="slip" class="sideslipping-slip">
    <image src="../assets/images/common/ellipsis.svg"></image>
  </view>
  <view slot="buttons" class="sideslipping-buttons">
    <view class="btn btn1">按钮1</view>
    <view class="btn btn2">按钮2</view>
  </view>
</sideslipping>
```

## 开闭文本 - toggle-text

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
line | Number | 3 | 文本的最大行数
fontSize | Number | 24 | 文本字体大小
lineHeight | Number | 36 | 文本字体行高
fontWeight | Number | 400 | 文本字体粗细
color | String | 'black' | 文本的颜色
textStyle | String | '' | 文本样式，优先级高于前面的样式设定
moreStyle | String | '' | 展开区域框的样式
bottomStyle | String | '' | 底部按钮区域框的样式

##### 内容槽

内容槽名 | 内容槽位置
---|---
text | 主体文本区域
more | 闭合时处于组件区域的右下角
buttons | 展开时处于组件区域的最下边

##### 事件

事件名 | 参数 | 触发条件
---|---|---
toggle | 是否展开{Boolean} | 点击文本区域展开或关闭文本

##### 样例

```html
<toggle-text line="3" bottomStyle="position: absolute; bottom: 0rpx;width: 100%;" bindtoggle="toggle">
  <view slot="text">--- 请点击这段文字 --- 灵异这事儿，我觉得就如同开了脑洞，没开时，常做些人神共愤的事，一但开了，人就会越来越谦卑。又如同向左走、向右走，没方向时自会洞悉那种力量。但愿今日的回忆，不是那扇门的重新开启。第三卷《九门外章》全开，第三卷《九门外章》全开隐秘于历史的真相，脱胎，玉蛊，鬼引，云葬，妖楼，隐尸……为你一一道来，精彩前行。《院上坟》群号391232505《三十四号大院》V群号425300087（需一万粉丝值）</view>
  <view slot="more"><view class="toggle-text-more"> ...展开 </view></view>
  <view slot="bottom"><view class="toggle-text-bottom">《 点击阅读更多 》</view></view>
</toggle-text>
```

## 微信登录 - wxlogin-wrap

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
wrapStyle | String | '' | 微信登录框样式

##### 登录成功回调的两种方式
1. 执行微信登录功能前通过login util设置微信登录成功的回调
2. 监听该组件的wxLoginSuc事件

##### 样例

```html
<wxlogin-wrap bindwxLoginSuc="wxLoginSuc"><view class="login-button">微信登录</view></wxlogin-wrap>
```

## 可拖拽卡片 - drag-card

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
x | Number | 0 | 卡片x轴位置
y | Number | 0 | 卡片y轴位置
customStyle | String | '' | 卡片自定义样式
movalbe | Boolean | true | 是否可拖拽

##### 内容槽

内容槽名 | 内容槽位置
---|---
默认内容槽 | 卡片主体部分

##### 事件

事件名 | 参数 | 触发条件
---|---|---
out | 滑出方向{Object} | 移动卡片出指定区域

##### 样例

```html
<drag-card x="125" y="200" bindout="nextCard" customStyle="{{item.style}}" movable="{{item.active}}">
  <view class="card" style="{{item.scale}}">
    <image class="card-image" src="/assets/images/common/cover.png"/>
  </view>
</drag-card>
```

## 九宫格图片预览器 - image-previewer

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
images | Array | [] | 预览图片数组
width | Number | 0 | 每个图片的宽度
height | Number | 0 | 每个图片的高度，不填则取width值
gap | Number | 0 | 图片之间的空隙

##### 样例

```html
<image-previewer images="{{images}}" width="218" gap="16"></image-previewer>
```

## 九宫格图片选择器 - image-selector

##### 组件参数

参数名 | 参数类型 | 默认值 | 参数功能
---|---|---|---
images | Array | [] | 预览图片数组
max | Number | 6 | 最多可选择多少张图片

##### 事件

事件名 | 参数 | 触发条件
---|---|---
chooseImage | 无 | 点击选择按钮
delete | 图片索引值 | 点击图片删除按钮

##### 样例

```html
<image-selector
  max="9"
  images="{{choosedImagesPaths}}"
  binddelete="deleteImage"
  bindchooseImage="chooseImage"></image-selector>
```
