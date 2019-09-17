<!--
  可展开关闭的文字
  @param line  {Number} 最多显示的行数，超出该行时会以省略号结尾
  @param color {String} 文字的颜色
  @param fontSize {Number} 文字的大小
  @param lineHeight {Number} 文字的行高
  @param fontWeight {Number} 文字的粗细
  @param textStyle {String} 自定义文字样式
-->
<config>
{
  'component': true
}
</config>
<template>
  <view
    class="toggle-text"
    style="font-size: {{fontSize}}rpx; color: {{color}}; line-height: {{lineHeight}}rpx;font-weight: {{fontWeight}};{{textStyle}}"
    catchtap="toggleAllText">
    <view id="visibleText" class="visible-text" style="-webkit-line-clamp: {{isShowAll ? 1000 : line}}">
      <text>{{text}}</text>
    </view>

    <text id="hiddenText" class="hidden-text">{{text}}</text>

    <view class="toggle-wrap">
      <slot wx:if="{{isOverflow && !isShowAll}}"></slot>
    </view>
  </view>
</template>

<script>
Component({
  properties: {
    text: {
      type: String,
      value: '',
      observer: 'onTextchange'
    },
    line: {
      type: Number,
      value: 3
    },
    color: {
      type: String,
      value: 'black',
    },
    fontSize: {
      type: Number,
      value: 24,
    },
    lineHeight: {
      type: Number,
      value: 36,
    },
    fontWeight: {
      type: Number,
      value: 400,
    },
    textStyle: {
      type: String,
      value: '',
    },
  },
  data: {
    isOverflow: false,
    isShowAll: false,
  },
  methods: {
    toggleAllText() {
      this.setData({ isShowAll: !this.data.isShowAll });
      this.triggerEvent('change', this.data.isShowAll);
    },
    // 读取文本标签所占高度
    onTextchange() {
      let visibleHeight = -1;
      let hiddenHeight = -1;

      setTimeout(() => {
        const query = wx.createSelectorQuery().in(this);
        query.select('#hiddenText').boundingClientRect(res => {
          hiddenHeight = res.height;
          if (visibleHeight !== -1) {
            this.checkOverflow(visibleHeight, hiddenHeight);
          }
        });
        query.select('#visibleText').boundingClientRect(res => {
          visibleHeight = res.height;
          if (hiddenHeight !== -1) {
            this.checkOverflow(visibleHeight, hiddenHeight);
          }
        });
        query.exec();

      }, 200);
    },
    // 判断是否隐藏超出部分
    checkOverflow(visibleHeight, hiddenHeight) {
      this.setData({
        isOverflow: hiddenHeight > visibleHeight,
        isShowAll: !(hiddenHeight > visibleHeight)
      });
      this.triggerEvent('change', this.data.isShowAll);
    },
  }
})
</script>
<style>
.toggle-text{
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  line-height: 40rpx;
  position: relative;
  word-break: break-all;
}
.visible-text {
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.hidden-text {
  position: absolute;
  width: 100%;
  left: -1000rpx;
  z-index:  -100;
  visibility: hidden;
}
.toggle-wrap {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 32rpx 0 0 0;
}
.toggle-icon {
  color: #C9C9C9;
  padding-left: 60rpx;
  background: linear-gradient(to right, rgba(255,255,255,0) 20%, #ffffff 50%);
}
</style>
