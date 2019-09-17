<config>
{
  usingComponents: {
    'navigation': '../components/common/navigation',
  }
}
</config>
<template>
  <view class="page-wrap">
    <navigation title="自定义导航栏" binddoubleClick="onNavigationDoubleClick"/>
    <view class="list-item" bindtap="goComponent" data-item="{{item}}" wx:for="{{componets}}" wx:key="item.name">
      <view style="font-family: SourceHanSerifCNMedium;">{{item.name}}</view>
      <image class="arrow-right" src="/assets/images/common/arrow-right.png"/>
    </view>
  </view>
</template>

<script>
Page({
  data: {
    componets: [
      { name: '倒计时组件', to: 'count-down' },
      { name: '省略文本组件', to: 'ellipsis-text' },
      { name: '悬浮按钮组件', to: 'hover-button' },
      { name: '侧滑组件', to: 'sideslipping' },
      { name: '可展开文本组件', to: 'toggle-text' },
      { name: '登录组件', to: 'wxlogin-wrap' },
      { name: '拖拽卡片组件', to: 'drag-card' },
      { name: '左右滑动卡片组件', to: 'move-card' },
      { name: '九宫格图片预览组件', to: 'image-previewer' },
      { name: '九宫格图片选择组件', to: 'image-selector' },
      { name: '范围滑动组件', to: 'range-slider' },
      { name: '图片裁剪组件', to: 'image-cropper' },
      { name: '视频录制组件', to: 'video-recorder' },
      { name: '吸底输入框组件', to: 'fixed-inputer' },
      { name: '原生组件', to: 'native-components' },
    ]
  },
  goComponent(e) {
    wx.navigateTo({ url: `/pages/components/${e.currentTarget.dataset.item.to}` });
  },
  onNavigationDoubleClick() {
    this.$showToast('双击导航栏');
  },
})
</script>

<style>
.list-item {
  padding: 16px;
  font-size: 30rpx;
  flex: 1;
  color: #101010;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2rpx solid #EFEFEF;
  font-family: SourceHanSerifCNMedium;
}
.arrow-right {
  width: 16rpx;
  height: 28rpx;
  margin-left: 22rpx;
}
</style>
