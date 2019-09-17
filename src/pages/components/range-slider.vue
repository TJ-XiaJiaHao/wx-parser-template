<config>
{
  usingComponents: {
    'range-slider': '/components/common/range-slider',
    'navigation': '/components/common/navigation',
  }
}
</config>
<template>
  <view class="page-range-slider">
    <navigation title="范围滑动组件"></navigation>
    <view class="desc">年龄范围：{{minAge}}-{{maxAge}}</view>
    <view class="range-slider">
      <range-slider
        min="0" max="100" minValue="0" maxValue="100"
        bindlowValueChange="onlowValueChange"
        bindhighValueChange="onhighValueChange"></range-slider>
    </view>
  </view>
</template>

<script>
Component({
  data: {
    minAge: 0,
    maxAge: 100,
  },
  methods: {
    onlowValueChange(e) {
      this.setData({ minAge: e.detail.lowValue });
    },
    onhighValueChange(e) {
      this.setData({ maxAge: e.detail.highValue });
    }
  }
})
</script>

<style>
.page-range-slider {
  padding: 32rpx;
  font-size: 28rpx;
}
.range-slider {
  padding: 0 64rpx;
}
</style>
