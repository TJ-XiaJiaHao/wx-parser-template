<config>
{
  'component': true
}
</config>

<template>
  <view class="title" style="margin-top: 32rpx;">swiper</view>
  <swiper indicator-dots="{{indicatorDots}}"
    autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
    <block wx:for="{{imgUrls}}" wx:key="item">
      <swiper-item>
        <image src="{{item}}" class="slide-image" width="355" height="150"/>
      </swiper-item>
    </block>
  </swiper>
</template>


<script>
Component({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
})
</script>
