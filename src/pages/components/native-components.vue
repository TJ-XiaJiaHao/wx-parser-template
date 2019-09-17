<config>
{
  usingComponents: {
    'v-movable-area': '/components/native/movable-area',
    'v-swiper': '/components/native/swiper',
    'v-cover-view': '/components/native/cover-view',
    'v-scroll-view': '/components/native/scroll-view',
    'v-process': '/components/native/process',
    'v-editor': '/components/native/editor',
    'navigation': '/components/common/navigation',
  }
}
</config>
<template>
  <view class="page-native-components">
    <navigation title="原生组件"></navigation>
    <v-movable-area></v-movable-area>
    <v-swiper></v-swiper>
    <v-cover-view></v-cover-view>
    <v-scroll-view></v-scroll-view>
    <v-process></v-process>
    <v-editor></v-editor>
  </view>
</template>

<script>
Page({

})
</script>

<style>
.page-native-components {
  font-size: 28rpx;
  padding: 32rpx;
}
</style>
