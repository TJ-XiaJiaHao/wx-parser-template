<!-- 图片预览组件，created by xjh -->
<!--
  @images Array 预览图片数组
  @width Number 图片宽度，单位rpx
  @height Number 图片高度，单位rpx
  @gap Number 图片间的间距，单位rpx
-->
<config>
{
  'component': true
}
</config>
<template>
  <view class="image-previewer" wx:if="{{images.length}}">
    <image
      class="image"
      style="width: {{width}}rpx;height: {{height || width}}rpx;margin-right: {{(1+index)%3 ? gap : 0}}rpx;margin-bottom: {{gap}}rpx;"
      wx:for="{{images}}"
      wx:for-item="imagePath"
      wx:key="imagePath"
      src="{{imagePath}}"
      mode="aspectFill"
      catchtap="previewImage"
      data-src="{{imagePath}}">
    </image>
  </view>
</template>

<script>
Component({
  properties: {
    images: {
      type: Array,
      value: []
    },
    width: {
      type: Number,
      value: 0,
    },
    height: {
      type: Number,
      value: 0,
    },
    gap: {
      type: Number,
      value: 0,
    }
  },
  methods: {
    // 预览图片
    previewImage(e){
      wx.previewImage({
        urls:this.data.images,
        current: e.currentTarget.dataset.src
      })
    },
  },
})
</script>

<style>
.image-previewer {
  display: flex;
  flex-wrap: wrap;
}
.image{
  border-radius: 8rpx;
  position: relative;
}
</style>
