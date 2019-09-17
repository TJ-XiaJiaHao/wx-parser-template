<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'image-cropper': '/components/common/image-cropper',
  }
}
</config>
<template>
  <view class="page-wrap">
    <navigation title="图片裁剪组件"></navigation>
    <!-- 图片裁剪器 -->
    <image-cropper
      src="https://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg"
      width="750" height="750"
      bindconfirm="onConfirm">
      <view class="btn-confirm">确认裁剪</view>
    </image-cropper>

    <!-- 裁剪后的图片 -->
    <image class="cropper-result" src="{{cropperResult}}"/>
  </view>
</template>

<script>
Page({
  data: {
    cropperResult: '',
  },
  onConfirm(e) {
    this.setData({ cropperResult: e.detail })
  },
})
</script>

<style>
.page-wrap {
  position: fixed;
  top: 0;
  left: 0;
}
.btn-confirm {
  padding: 16rpx 32rpx;
  background: green;
  border-radius: 16rpx;
  color: #ffffff;
  font-size: 30rpx;
  margin: 32rpx;
  text-align: center;
}
.cropper-result {
  width: 160rpx;
  height: 160rpx;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
}
</style>
