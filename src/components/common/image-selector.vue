<!-- 图片选择组件，created by xjh -->
<!--
  @images Array 图片数组
-->
<config>
{
  'component': true
}
</config>
<template>
  <view class="image-selector">
    <image
      class="image image-col-{{index % 3}}"
      wx:for="{{images}}"
      wx:for-item="imagePath"
      wx:key="imagePath"
      src="{{imagePath}}"
      mode="aspectFill"
      catchtap="previewImage"
      data-src="{{imagePath}}">

      <!-- 删除图片按钮 -->
      <image
        class="btn-del"
        catchtap="onDelete"
        src="/assets/images/common/del.png"
        data-index="{{index}}">
      </image>
    </image>

    <!-- 选择图片按钮 -->
    <view
      class="image-add-wrap"
      bindtap="chooseImage"
      wx:if="{{images.length < max}}">
      <image
        class="image-add"
        src="/assets/images/common/image-add.png"></image>
    </view>
  </view>
</template>

<script>
Component({
  properties: {
    images: {
      type: Array,
      value: []
    },
    max: {
      type: Number,
      value: 6,
    },
  },
  methods: {
    // 选择图片
    chooseImage() {
      this.triggerEvent('chooseImage');
    },
    // 预览图片
    previewImage(e){
      wx.previewImage({
        urls:this.data.images,
        current: e.currentTarget.dataset.src
      })
    },
    // 删除
    onDelete(e) {
      this.triggerEvent('delete', e.currentTarget.dataset.index);
    },
  },
})
</script>

<style>
.image-selector {
  display: flex;
  flex-wrap: wrap;
  margin: 0 32rpx;
}
.image{
  border-radius: 8rpx;
  position: relative;
  width: 218rpx;
  height: 218rpx;
  margin-right: 16rpx;
  margin-bottom: 16rpx;
}
.image-col-2 {
  margin-right: 0;
}
.image-add-wrap {
  width: 218rpx;
  height: 218rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #EDEDED;
  border-radius: 8rpx;
}
.image-add {
  width: 60rpx;
  height: 60rpx;
}
.btn-del{
  position: absolute;
  top: 0;
  right: 0;
  width: 52rpx;
  height: 52rpx;
}
</style>
