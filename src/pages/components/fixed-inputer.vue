<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'fixed-inputer': '/components/common/fixed-inputer',
  }
}
</config>
<template>
  <view class="page-fixed-inputer">
    <navigation title="吸底输入框组件"></navigation>
    <view wx:for="{{text}}" wx:key="item" class="msg">{{item}}</view>
    <view class="btn-at" bindtap="doAt">@晃晃晃</view>
    <fixed-inputer
      placeholder="{{at || placeholder}}"
      isFocus="{{!!at}}"
      bindblur="onInputBlur"
      bindconfirm="onConfirm"></fixed-inputer>
  </view>
</template>

<script>
Page({
  data: {
    placeholder: '说点啥吧',
    text: [],
    at: '',
  },
  doAt() {
    this.setData({ at: '@晃晃晃' });
  },
  onInputBlur(e) {
    if (!e || !e.detail) {
      this.setData({ at: '' });
    }
  },
  onConfirm(e) {
    const text = this.data.text;
    text.push(`${this.data.at} ${e.detail}`);
    this.setData({ text });
    this.onInputBlur();
  },
})
</script>
<style>
.page-fixed-inputer {
  padding-bottom: 200rpx;
}
.btn-at {
  padding: 16rpx 32rpx;
  background: green;
  border-radius: 16rpx;
  color: #ffffff;
  font-size: 30rpx;
  margin: 32rpx;
  text-align: center;
}
.msg {
  margin: 16rpx 32rpx;
}
</style>
