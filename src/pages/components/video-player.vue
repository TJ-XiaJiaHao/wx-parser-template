<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
  }
}
</config>
<template>
  <view>
    <navigation title="视频播放组件"></navigation>
    <video src="{{src}}" style="width: 100vw;height: 400rpx;"></video>
  </view>
</template>

<script>
Page({
  data: {
    src: ''
  },
  onLoad(opt) {
    this.setData({
      src: opt && opt.url || '',
    });
  }
})
</script>
