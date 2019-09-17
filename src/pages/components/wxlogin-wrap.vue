<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'wxlogin-wrap': '/components/common/wxlogin-wrap',
  }
}
</config>
<template>
  <view>
    <navigation title="登录组件组件"></navigation>
      <wxlogin-wrap bindwxLoginSuc="wxLoginSuc">
        <view class="login-button">点击登录</view>
      </wxlogin-wrap>
      <view class="tip">登录组件与业务耦合度较高，需要自行处理接口地址、接口参数、cookie名称等</view>
  </view>
</template>

<script>
Page({
})
</script>

<style>
  .login-button {
    width: 190rpx;
    height: 100rpx;
    border-radius: 4rpx;
    border: 2rpx solid #FF6188;
    font-weight: 300;
    color: #FF6188;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
    font-size: 40rpx;
    margin: 32rpx;
  }
  .tip {
    font-size: 24rpx;
    opacity: 0.6;
    margin: 32rpx;
  }
</style>
