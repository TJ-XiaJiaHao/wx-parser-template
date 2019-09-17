<config>
{
  'component': true
}
</config>

<template>
  <view class="title" style="margin-top: 32rpx;">cover-view</view>
  <video id="myVideo" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" controls="{{false}}" event-model="bubble">
  <cover-view class="controls">
    <cover-view class="tip">覆盖在原生组件上的文字</cover-view>
  </cover-view>
</video>
</template>

<script>
Component({
  methods: {
    onReady() {
      this.videoCtx = wx.createVideoContext('myVideo')
    },
    play() {
      this.videoCtx.play()
    },
    pause() {
      this.videoCtx.pause()
    }
  }
})
</script>

<style>
.tip {
  text-align: center;
  color: white;
  line-height: 56rpx;
}
</style>
