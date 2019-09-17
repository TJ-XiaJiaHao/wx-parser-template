<!--
  悬浮按钮
  @param wrapStyle  {String} 自定义样式
-->
<config> { "component": true } </config>

<template>
  <view class="hover-button"
        catchtouchstart="touchStart"
        catchtouchmove="touchmove"
        catchtouchend="touchend"
        style="left:{{left}}px;right:{{right}}px;top:{{top}}px;bottom:{{bottom}}px;  transform:translate({{translateX}}px, {{translateY}}px);transition: {{transition}}ms;{{wrapStyle}}">
    <slot></slot>
  </view>
</template>

<script>
Component({
  properties: {
    wrapStyle: {
      type: String,
      value: ''
    },
  },
  data: {
    touchStartX: -1,
    touchStartY: -1,
    touchStartTime: null,

    offsetX: 0,
    offsetY: 0,

    translateX: 0,
    translateY: 0,
    transition: 0,

    left: null,
    right: 8,
    top: null,
    bottom: 4,
  },
  methods: {
    touchStart(evt) {
      if(evt.touches.length === 1) {
        this.setData({
          touchStartX: evt.touches[0].clientX,
          touchStartY: evt.touches[0].clientY,
          offsetX: evt.touches[0].clientX - evt.currentTarget.offsetLeft,
          offsetY: evt.touches[0].clientY - evt.currentTarget.offsetTop,
          touchStartTime: new Date()
        });
      }
    },
    touchmove(evt) {
      this.triggerEvent('move');
      this.setData({ transition: 0 });
      this.setData({
        translateX: evt.touches[0].clientX - this.data.touchStartX,
        translateY: evt.touches[0].clientY - this.data.touchStartY,
      });
    },
    touchend(evt) {
      this.triggerEvent('end');
      const clientWidth = wx.getSystemInfoSync().windowWidth;
      const clientHeight = wx.getSystemInfoSync().windowHeight;
      const clientX = evt.changedTouches[0].clientX;
      const clientY = evt.changedTouches[0].clientY;

      const left = clientX * 2 > clientWidth ? null : 8;
      const right = left ? null : 8;

      let top = clientY - this.data.offsetY;
      if (top < 4) top = 4;
      if (top + 162 > clientHeight) top = null;

      this.setData({ left, top, right, translateY: 0, translateX: 0 });

      // 如果时间较短，则认为是点击
      if (new Date() - this.data.touchStartTime < 150) this.onTap();
    },
    onTap() {
      this.triggerEvent('tap');
    },
  },
});
</script>

<style lang="scss">
.hover-button {
  position: fixed;
  right: 16rpx;
  bottom: 8rpx;
  z-index: 10000;
  width: 72rpx;
  height: 72rpx;
}
</style>
