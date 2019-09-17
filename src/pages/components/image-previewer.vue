<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'image-previewer': '/components/common/image-previewer',
  }
}
</config>
<template>
  <view class="page-image-previewer">
    <navigation title="九宫格图片预览组件"></navigation>

    <view class="title">1张图片</view>
    <image-previewer images="{{imagesOne}}" width="454" height="256"/>

    <view class="title">4张图片</view>
    <image-previewer images="{{imagesFour}}" width="218" gap="16"></image-previewer>

    <view class="title">9张图片</view>
    <image-previewer images="{{imagesNine}}" width="218" gap="16"></image-previewer>
  </view>
</template>

<script>
Page({
  data: {
    imagesOne: [
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg'
    ],
    imagesFour: [
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
    ],
    imagesNine: [
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
      'http://n.sinaimg.cn/news/transform/700/w1000h500/20190828/dab0-icuacsa4537454.jpg',
    ]
  },
  onLoad(opt) {
    const imgUrl = opt.imgUrl || '';
    if (imgUrl) {
      this.setData({
        imagesOne: [imgUrl],
        imagesFour: [imgUrl, imgUrl, imgUrl, imgUrl],
        imagesNine: [imgUrl, imgUrl, imgUrl, imgUrl, imgUrl, imgUrl, imgUrl, imgUrl, imgUrl],
      })
    }
  },
})
</script>

<style>
.page-image-previewer {
  padding: 32rpx;
}
.title {
  font-size: 30rpx;
  margin: 16rpx 0 8rpx;
  font-family: SourceHanSerifCNMedium;
}
</style>
