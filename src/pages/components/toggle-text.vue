<config>
{
  usingComponents: {
    'navigation': '/components/common/navigation',
    'toggle-text': '/components/common/toggle-text',
  }
}
</config>
<template>
  <view class="page-toggle-text">
    <navigation title="可展开文本组件"></navigation>

    <view class="toggle-text">
      <toggle-text line="3" text="文本内容较少，自动隐藏展开按钮">
        <view class="toggle-text-more"> ...展开 </view>
      </toggle-text>
    </view>

    <view class="toggle-text">
      <toggle-text line="3" bindchange="toggle"
        text="--- 请点击这段文字 --- 灵异这事儿，我觉得就如同开了脑洞，没开时，常做些人神共愤的事，一但开了，人就会越来越谦卑。又如同向左走、向右走，没方向时自会洞悉那种力量。但愿今日的回忆，不是那扇门的重新开启。第三卷《九门外章》全开，第三卷《九门外章》全开隐秘于历史的真相，脱胎，玉蛊，鬼引，云葬，妖楼，隐尸……为你一一道来，精彩前行。《院上坟》群号391232505《三十四号大院》V群号425300087（需一万粉丝值）">
        <view class="toggle-text-more"> ...展开 </view>
      </toggle-text>
    </view>
  </view>
</template>

<script>
Page({
  toggle(evt) {
    this.$showToast(evt.detail ? '文本展开' : '文本关闭');
  },
})
</script>

<style>
.page-toggle-text {
  padding: 0 32rpx;
}
.toggle-text {
  padding: 32rpx 0;
  border-bottom: 2rpx solid #EFEFEF;
}
.toggle-text-more {
  background: white;
  font-size: 28rpx;
  color: blue;
  padding: 0 8rpx 0 16rpx;
}
</style>
