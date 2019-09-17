<!--
  超出行数的文字将会以省略号的形式展现
  @param line  {Number} 最多显示的行数，超出该行时会以省略号结尾
  @param color {String} 文字的颜色
  @param fontSize {Number} 文字的大小
  @param lineHeight {Number} 文字的行高
  @param fontWeight {Number} 文字的粗细
  @param fixHeight {Boolean} 是否固定高度，如果为true则未满设置行数也会用空白补足
  @param textStyle {String} 自定义样式
-->
<config> { "component": true } </config>

<template>
  <view class="ellipsis-text-wrap">
    <view
      class="ellipsis-text"
      style="-webkit-line-clamp: {{line}}; font-size: {{fontSize}}rpx; color: {{color}}; line-height: {{lineHeight}}rpx;height: {{fixHeight ? line * lineHeight + 'rpx' : ''}};font-weight: {{fontWeight}};display:-webkit-box;word-break:break-all;{{textStyle}}">
      <slot></slot>
    </view>
  </view>
</template>

<script>
Component({
  properties: {
    line: {
      type: Number,
      value: 3,
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
    fixHeight: {
      type: Boolean,
      value: true,
    },
    textStyle: {
      type: String,
      value: '',
    },
  },
});
</script>

<style lang="scss">
.ellipsis-text-wrap {
  position: relative;

  .ellipsis-text {
    overflow : hidden;
    -webkit-box-orient: vertical;
    text-overflow:ellipsis;
  }

}
</style>
