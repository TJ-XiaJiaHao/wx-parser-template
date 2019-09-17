<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'hover-button': '/components/common/hover-button',
  }
}
</config>
<template>
  <view>
    <navigation title="悬浮按钮组件"></navigation>
    <hover-button wrapStyle="width: 144rpx;height:144rpx;" bindmove="onMove" bindend="onEnd">
      <view class="hover-button {{isdragging ? 'active' : ''}}">{{isdragging ? '松手吸附' : '点击拖拽'}}</view>
    </hover-button>
  </view>
</template>

<script>
Page({
  data: {
    isdragging: false,
  },
  onMove() {
    this.setData({ isdragging: true });
  },
  onEnd() {
    this.setData({ isdragging: false });
  }
})
</script>

<style>
  .hover-button {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 54rpx;
    font-size: 40rpx;
    border-radius: 50%;
    color: white;
    background: red;
    letter-spacing: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hover-button.active {
    opacity: 0.5;
  }
</style>
