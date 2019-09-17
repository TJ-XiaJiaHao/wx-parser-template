<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'image-selector': '/components/common/image-selector',
  }
}
</config>

<template>
  <view>
    <navigation title="九宫格图片选择组件"/>
    <view class="image-selector">
      <image-selector
        delete
        max="9"
        images="{{choosedImagesPaths}}"
        binddelete="deleteImage"
        bindchooseImage="chooseImage"></image-selector>
    </view>
  </view>
</template>

<script>
Page({
  data: {
    choosedImagesPaths: [],
  },

  /*
   * 删除图片
   */
  deleteImage(e){
    const imageIndex = e.detail
    this.data.choosedImagesPaths.splice(imageIndex,1)
    this.setData({
      choosedImagesPaths: this.data.choosedImagesPaths
    })
  },

  /*
   * 选择照片，最多9张
   */
  chooseImage(){
    if(this.data.choosedImagesPaths.length >= 9){
      this.$showError('',"最多只能上传六张图片哦")
      return
    }
    wx.chooseImage({
      count: 9 - this.data.choosedImagesPaths.length,
      success: res => {
        this.setData({
          choosedImagesPaths:  this.data.choosedImagesPaths.concat(res.tempFilePaths)
        })
      }
    })
  },
})
</script>
