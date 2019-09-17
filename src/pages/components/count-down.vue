<config>
{
  usingComponents: {
    'count-down': '/components/common/count-down',
    'navigation': '/components/common/navigation',
  }
}
</config>
<template>
  <view class="page-count-down">
    <navigation title="倒计时组件"></navigation>

    <!-- 普通倒计时 -->
    <view class="count-down">
      <count-down freeTime="20" bindcountdownEnd="countdownEnd" showDay="{{true}}"></count-down>
    </view>

    <!-- 普通倒计时 -->
    <view class="count-down count-down-normal">
      <count-down freeTime="9999" bindcountdownEnd="countdownEnd"></count-down>
    </view>

    <!-- 分割倒计时 不显示天 -->
    <view class="count-down">
      <count-down
        freeTime="4567"
        split="{{true}}"
        splitStyle="height:40rpx;line-height:40rpx;background:#FF6188;border-radius:8rpx;margin:0rpx 12rpx;color:white;width:50rpx;text-align:center;font-size:28rpx;">
        <view slot="splitAfterHou" class="count-down-split">:</view>
        <view slot="splitAfterMin" class="count-down-split">:</view>
      </count-down>
    </view>

    <!-- 分割倒计时 显示天 -->
    <view class="count-down">
      <count-down
        freeTime="765432"
        split="{{true}}"
        showDay="{{true}}"
        splitStyle="height:40rpx;line-height:40rpx;background:#FF6188;border-radius:8rpx;margin:0rpx 12rpx;color:white;width:50rpx;text-align:center;font-size:28rpx;">
        <view slot="splitAfterDay" class="count-down-split">:</view>
        <view slot="splitAfterHou" class="count-down-split">:</view>
        <view slot="splitAfterMin" class="count-down-split">:</view>
      </count-down>
    </view>
  </view>
</template>

<script>
Page({
  countdownEnd() {
    this.$showToast('倒计时结束');
  },
})
</script>

<style>
.count-down {
  margin: 16rpx 32rpx 0 32rpx;
  font-size: 28rpx;
}
.count-down-normal {
  color:white;
  background:linear-gradient(to left, #FF6188, #FF98C2);
  width: 170rpx;
  height: 40rpx;
  line-height:40rpx;
  border-radius: 30rpx;
  text-align: center;
  font-size: 30rpx;
}
.count-down-split {
  line-height: 40rpx;
  font-size: 24rpx;
}
</style>
